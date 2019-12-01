import query from "../../../DB/queries/event";

async function DBquery(hostId) {
	const dbQueryValue = await query.getEventsByHost(hostId);
	return dbQueryValue;
}

async function questionResolver(hostId) {
	return DBquery(hostId);
}

export default {
	Query: {
		events: (_, { hostId }) => questionResolver(hostId),
	},
};
