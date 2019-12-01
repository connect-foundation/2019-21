import query from "../../../DB/queries/event";

export default {
	Query: {
		events: async (_, { hostId }) => {
			return await query.getEventsByHost(hostId);
		},
	},
};
