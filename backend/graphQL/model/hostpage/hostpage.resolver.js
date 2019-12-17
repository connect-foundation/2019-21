import faker from "faker";
import {
	getEventsByHostId,
	createEvent,
	getAllEvents,
	updateEventById,
	getEventOptionByEventId,
	getEventById,
} from "../../../DB/queries/event.js";
import {
	createHashtag,
	getHashtagByEventIds,
} from "../../../DB/queries/hashtag.js";
import {compareCurrentDateToTarget} from "../../../libs/utils";

function verifySubjectHostJwt(jwtSub) {
	if (jwtSub !== "host") {
		throw new Error("AuthenticationError");
	}
}

function mappingHashTagsToEvents(hashTags, events, eventMap) {
	hashTags.forEach(hashTag => {
		const hashTagObject = hashTag.get({plain: true});

		eventMap.get(hashTagObject.EventId).push(hashTagObject);
	});
	events.forEach(event => {
		Object.assign(event, {HashTags: eventMap.get(event.id)});
	});

	return events;
}

const getEventOptionResolver = async eventId => {
	const evnetOption = await getEventOptionByEventId(eventId);

	return evnetOption;
};

export default {
	Query: {
		init: async (_, {param}, authority) => {
			verifySubjectHostJwt(authority.sub);
			const host = authority.info;
			let events = await getEventsByHostId(host.id);

			events = events.filter(event => {
				const eventPlainObject = event.get({plain: true});
				const diff = compareCurrentDateToTarget(eventPlainObject.endAt);
				if (diff > 0) {
					return eventPlainObject;
				}
			});

			const eventMap = new Map();
			const eventIdList = events.map(event => {
				eventMap.set(event.id, []);
				return event.id;
			});

			const hashTags = await getHashtagByEventIds(eventIdList);
			events = mappingHashTagsToEvents(hashTags, events, eventMap);

			return {events, host};
		},
		getEventOption: async (_, {EventId}) => getEventOptionResolver(EventId),
	},
	Mutation: {
		createHashTags: async (_, {hashTags}, authority) => {
			if (authority.sub !== "host") {
				throw new Error("AuthenticationError");
			}
			for (const hashTag of hashTags) {
				await createHashtag({
					name: hashTag.name,
					EventId: hashTag.EventId,
				});
			}
		},
		createEvent: async (_, {info}, authority) => {
			if (authority.sub !== "host") {
				throw new Error("AuthenticationError");
			}
			let eventCode = faker.random.alphaNumeric(4);
			const events = await getAllEvents();
			const existCode = events.map(event => event.eventCode);

			while (true) {
				const exist = existCode.some(
					someCode => eventCode === someCode
				);

				if (!exist) {
					break;
				}

				eventCode = faker.random.alphaNumeric(4);
			}
			let event = await createEvent({
				eventName: info.eventName,
				eventCode,
				HostId: authority.info.id,
				startAt: info.startAt,
				endAt: info.endAt,
			});

			event = event[0].dataValues;
			return {...event};
		},
		updateEvent: async (_, {event}, authority) => {
			if (authority.sub !== "host") {
				throw new Error("AuthenticationError");
			}
			await updateEventById({
				id: event.EventId,
				eventName: event.eventName,
				startAt: event.startAt,
				endAt: event.endAt,
			});

			const updatedEvent = await getEventById(event.EventId);

			return updatedEvent.get({plain: true});
		},
	},
};
