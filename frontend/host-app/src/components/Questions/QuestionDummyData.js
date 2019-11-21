function DummyData() {
	return [
		{
			id: 0,
			userName: "오랑캐1",
			date: new Date(),
			question: "오늘 마스터 클래스 좋네요",
			isAnonymous: false,
			status: "moderation",
			isStared: false,
		}, {
			id: 1,
			userName: "오랑캐2",
			date: new Date(),
			question: "회의실이 부족해요",
			isAnonymous: false,
			status: "moderation",
			isStared: false,
		}, {
			id: 2,
			userName: "오랑캐3",
			date: new Date(),
			question:
				"이 질문은 정말 길어서 끝까지 읽을 수도 없는 정도로 어마어마 무지무지하게 긴 질문입니다 저보다 더 긴 질문을 하시(중략...)",
			isAnonymous: false,
			status: "newQuestion",
			isStared: false,
		}, {
			id: 3,
			userName: "오랑캐4",
			date: new Date(),
			question: "짧은 질문입니다",
			isAnonymous: false,
			status: "newQuestion",
			isStared: false,
		}, {
			id: 4,
			userName: "Anonymous",
			date: new Date(),
			question: "점심 뭐먹나요",
			isAnonymous: true,
			status: "popularQuestion",
			isStared: false,
		}, {
			id: 5,
			userName: "Anonymous",
			date: new Date(),
			question: "해장국이요",
			isAnonymous: true,
			status: "popularQuestion",
			isStared: false,
		}, {
			id: 6,
			userName: "Anonymous",
			date: new Date(),
			question: "오늘의 질문을 종료합니다",
			isAnonymous: true,
			status: "completeQuestion",
			isStared: false,
		},
	];
}

export default DummyData;
