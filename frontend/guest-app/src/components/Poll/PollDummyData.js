// todo 사용하지 않으면 제거
export default function PollDummyData() {
	return [
		{
			pollName: "2019년 송년회 일자 투표",
			pollType: "nItems",
			selectionType: "date",
			allowDuplication: true,
			nItems: [
				{
					id: 0,
					name: "12월 19일(목)",
					voters: 55,
					voted: true,
					firstPlace: false,
				}, {
					id: 1,
					name: "12월 20일(금)",
					voters: 77,
					voted: true,
					firstPlace: true,
				}, {
					id: 2,
					name: "12월 21일(토)",
					voters: 33,
					voted: false,
					firstPlace: false,
				}, {
					id: 3,
					name: "12월 22일(일)",
					voters: 22,
					voted: false,
					firstPlace: false,
				},
			],
			pollDate: new Date(),
			active: true,
			totalVoters: 99,
		}, {
			pollName: "대한민국 수도는 어디인가요?",
			pollType: "nItems",
			selectionType: "text",
			allowDuplication: false,
			nItems: [
				{
					id: 0,
					name: "부산",
					voters: 11,
					voted: false,
					firstPlace: false,
				}, {
					id: 1,
					name: "제주",
					voters: 22,
					voted: false,
					firstPlace: false,
				}, {
					id: 2,
					name: "서울",
					voters: 999,
					voted: true,
					firstPlace: true,
				},
			],
			pollDate: new Date(),
			active: false,
			totalVoters: 1032,
		}, {
			pollName: "마스터 강의 평가",
			pollType: "rating",
			allowDuplication: false,
			nItems: [
				{
					id: 0,
					voters: 80,
					voted: false,
					maxStars: 10,
					value: 0,
				},
			],
			pollDate: new Date(),
			active: false,
			totalVoters: 80,
		},
	];
}
