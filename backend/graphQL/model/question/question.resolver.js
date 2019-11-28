function DBquery(eventCode) {

	// some DB job like.... dbQueryValue = selectQuestionData(eventCode)

	const dbQueryValue = [
		{
			id: 0,
			eventId: 2,
			guestName: "name1",
			guestId: 0,
			date: "2015-02-02",
			content: "안녕하세요",
			isAnonymous: false,
			state: "alive",
			isStared: true,
			likeCount: Number,
			Emojis: null,
			replies: null,
		}, {
			id: 1,
			eventId: 2,
			guestName: "name2",
			guestId: 0,
			date: "2015-02-02",
			content: "안녕하세요2",
			isAnonymous: false,
			state: "alive",
			isStared: true,
			likeCount: Number,
			Emojis: null,
			replies: null,
		},
	];

	return dbQueryValue;
}

async function questionResolver(eventCode) {
	return DBquery(eventCode);
}

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		questions: (_, {eventCode}) => questionResolver(eventCode),
	},
};
