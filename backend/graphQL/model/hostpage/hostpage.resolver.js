import {getEventsByHostId, updateEventById, getEventOptionByEventId} from "../../../DB/queries/event.js";

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
		init: async (_, {}, authority) => {
			if (authority.sub === "host") {
				const host = authority.info;
				const events = await getEventsByHostId(host.id);

				return {events, host};
			}

			throw new Error("AuthenticationError");
		},
		getEventOption: async (_, {eventId}) => getEventOptionResolver(eventId),
	},
	Mutation: {
		moderation: (_, {eventId, moderationOption}) => moderationResolver(eventId, moderationOption),
	},
};
