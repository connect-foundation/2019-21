import faker from "faker";
import {
	createEvent,
	getAllEvents,
	getEventById,
	getEventOptionByEventId,
	getEventsByHostId,
	updateEventById,
} from "../../../DB/queries/event.js";
import {
	createHashtag,
	getHashtagByEventIds,
} from "../../../DB/queries/hashtag.js";

function verifySubjectHostJwt(jwtSub) {
	if (jwtSub !== "host") {
		throw new Error("AuthenticationError");
	}
}

function mappingHashTagsToEvents(hashTags, events, eventMap) {
	hashTags.forEach(hashTag => {
		eventMap.get(hashTag.EventId).push(hashTag);
	});
	events.forEach(event => {
		Object.assign(event, {HashTags: eventMap.get(event.id)});
	});

	return events;
}

async function generateEventCode() {
	let generatedEventCode = faker.random.alphaNumeric(4);
	const events = await getAllEvents();
	const alreadyExistEventCode = events.map(event => event.eventCode);

	while (true) {
		const isExist = alreadyExistEventCode.some(
			someCode => generateEventCode === someCode,
		);

		if (!isExist) {
			break;
		}
		generatedEventCode = faker.random.alphaNumeric(4);
	}
	return generatedEventCode;
}

const getEventOptionResolver = async eventId =>
	getEventOptionByEventId(eventId);

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		init: async (_, {param}, authority) => {
			verifySubjectHostJwt(authority.sub);
			const host = authority.info;
			let events = await getEventsByHostId(host.id);

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
			verifySubjectHostJwt(authority.sub);
			// todo fix to bulk insert
			for (const hashTag of hashTags) {
				// eslint-disable-next-line no-await-in-loop
				await createHashtag({
					name: hashTag.name,
					EventId: hashTag.EventId,
				});
			}
		},

		createEvent: async (_, {info}, authority) => {
			verifySubjectHostJwt(authority.sub);
			const eventCode = await generateEventCode();
			const event = await createEvent({
				eventName: info.eventName,
				eventCode,
				HostId: authority.info.id,
				startAt: info.startAt,
				endAt: info.endAt,
			});

			return {...event};
		},

		updateEvent: async (_, {event}, authority) => {
			verifySubjectHostJwt(authority.sub);
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
