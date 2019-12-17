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

const moderationResolver = async (eventId, moderationOption) => {
	const updatedEvent = await updateEventById(eventId, {moderationOption});

	return updatedEvent[0];
};

const getEventOptionResolver = async eventId => {
	const evnetOption = await getEventOptionByEventId(eventId);

	return evnetOption;
};

export default {
	Query: {
		init: async (_, {param}, authority) => {
			if (authority.sub === "host") {
				const host = authority.info;
				let events = await getEventsByHostId(host.id);
				events = events.filter(event => {
					const eventObject = event.get({plain: true});
					// const diff = compareCurrentDateToTarget(eventObject.endAt);
					// if (diff > 0) {
					return eventObject;
					// }
				});
				const eventMap = new Map();
				const eventIdList = events.map(event => {
					eventMap.set(event.id, []);
					return event.id;
				});

				let hashTags = await getHashtagByEventIds(eventIdList);
				hashTags.forEach(hashTag => {
					const hashTagObject = hashTag.get({plain: true});
					eventMap.get(hashTagObject.EventId).push(hashTagObject);
				});
				events.forEach(event => {
					Object.assign(event, {HashTags: eventMap.get(event.id)});
				});

				return {events, host};
			}

			throw new Error("AuthenticationError");
		},
		getEventOption: async (_, {EventId}) => getEventOptionResolver(EventId),
	},
	Mutation: {
		createHashTags: async (_, {hashTags}, authority) => {
			for (let hashTag of hashTags) {
				await createHashtag({
					name: hashTag.name,
					EventId: hashTag.EventId,
				});
			}
		},
		createEvent: async (_, {info}, authority) => {
			if (authority.sub === "host") {
				let eventCode = faker.random.alphaNumeric(4);
				const events = await getAllEvents();
				const existCode = events.map(event => event.eventCode);

				while (true) {
					const exist = existCode.some(
						someCode => eventCode === someCode
					);

					if (!exist) break;
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
			}
			throw new Error("AuthenticationError");
		},
		updateEvent: async (_, {event}, authority) => {
			let updatedEvent = await updateEventById(event.EventId, {
				eventName: event.eventName,
				startAt: event.startAt,
				endAt: event.endAt,
			});
			updatedEvent = await getEventById(event.EventId);

			return updatedEvent.get({plain: true});
		},
		moderation: (_, {eventId, moderationOption}) =>
			moderationResolver(eventId, moderationOption),
	},
};
