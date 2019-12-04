import {getEventsByHostId, updateEventById} from "../../../DB/queries/event.js";

const moderationResolver = async (eventId, moderationOption) => {
	const updatedEvent = await updateEventById(eventId, {moderationOption});
	return updatedEvent[0];
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
	},
	Mutation: {
		moderation: (_, {eventId, moderationOption}) => moderationResolver(eventId, moderationOption),
	},
};
