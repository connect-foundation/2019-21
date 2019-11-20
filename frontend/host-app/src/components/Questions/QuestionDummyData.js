function DummyData() {
	return [
		{
			userName: "오랑캐1",
			date: new Date(),
			question: "question",
			isAnonymous: false,
			status: "moderation",
		}, {
			userName: "오랑캐2",
			date: new Date(),
			question: "long question",
			isAnonymous: false,
			status: "moderation",
		}, {
			userName: "오랑캐3",
			date: new Date(),
			question:
				"long question long question long question long question",
			isAnonymous: false,
			status: "newQuestion",
		}, {
			userName: "오랑캐4",
			date: new Date(),
			question: "question",
			isAnonymous: false,
			status: "newQuestion",
		}, {
			userName: "Anonymous",
			date: new Date(),
			question: "question",
			isAnonymous: true,
			status: "popularQuestion",
		}, {
			userName: "Anonymous",
			date: new Date(),
			question: "question",
			isAnonymous: true,
			status: "popularQuestion",
		}, {
			userName: "Anonymous",
			date: new Date(),
			question: "question",
			isAnonymous: true,
			status: "completeQuestion",
		},
	];
}

export default DummyData;
