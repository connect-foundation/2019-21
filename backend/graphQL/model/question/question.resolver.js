import query from "../../../DB/queries/event";

async function DBquery(eventCode, guestId) {
	const dbQueryValue = await query.getQuestionsInEvent(eventCode, guestId);
	return dbQueryValue;
}

async function questionResolver(eventCode, guestId) {
	return DBquery(eventCode, guestId);
}

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		questions: (_, {eventCode}, {guestId}) => questionResolver(eventCode, guestId),
	},
};
