function DBquery(eventCode, guestId) {

	// some DB job like.... dbQueryValue = selectQuestionData(eventCode, guestId)
	// data from sequelize should be as below

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
			isLike: true,
			likeCount: Number,
			emojis: [
				{
					id: 0,
					emojiName: "point_up",
					count: 2,
					questionId: 1,
					guestId: 0,
					didIPicked: false,
				},
			],
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
			isLike: true,
			emojis: [
				{
					id: 0,
					emojiName: "point_up",
					count: 2,
					questionId: 1,
					guestId: 0,
					didIPicked: false,
				},
			],
			replies: null,
		},
	];

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
