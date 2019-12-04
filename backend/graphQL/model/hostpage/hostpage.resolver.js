import {getEventsByHostId} from "../../../DB/queries/event.js";

const moderationResolver = eventCode => {
	const updatedEvent = {}; // query that update moderation Option

	return {updatedEvent};
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
		moderation: (_, {eventCode}) => moderationResolver(eventCode),
	},
};
