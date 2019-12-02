import query from "../../../DB/queries/event";

export default {
	Query: {
		init: async (_, {}, authority) => {
			if (authority.sub === "host") {
				const host = authority.info;
				const events = await query.getEventsByHostId(host.id);
				return { events, host };
			}
			throw new Error("AuthenticationError");
		},
	},
};
