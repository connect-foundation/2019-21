// Q1. 현재 questions 배열에서 isStared 라는 속성을 toggle 해야 하는 상황입니다.
// isStared 라는 속성은 전체 리스트에서 최대 하나만 true 여야 하고, 만일 리스트의 다른
// element의 isStared 속성을 true 로 바꾸면 원래 true였던 element의 isStared 를
// false 로 변경해주어야 합니다.
// 이는 DB 에도 동일하게 적용되어, DB에 isStarded 가 true 였던 컬럼을 false 로 업데이트
// 하고 새로운 컬럼의 isStared 를 true 로 업데이트 해야 합니다.

//아래는 리스트에 존재하는 하나의 element의 명세입니다.
{
	Emojis: [],
	GuestId,
	content,
	createdAt,
	guestName,
	id,
	likeCount,
	state,
	QuestionId,
	isStared
} // element 의 명세

// handleStar 함수는 isStared 상태를 바꾸어야 할 element 의 id를 인자로 받습니다.
// 이를 수행하기 위해 리스트를 reduce 함수로 순회하며
// element 의 isStared가 true 일 경우 해당 element 의 id와 바뀌어야할 isStared
// 상태를 from 배열에 push 하고, 인자로 받은 id 와 element의 id 가 같다면
// to 배열에 id와 isStared 를 넣어 sockei.io 서버로 emit 합니다.

// in frontend/host-app/src/components/Content.js
const handleStar = id => {
	const toggleMsg = questions.questions.reduce((acc, e) => {
		if (e.isStared) { acc.from.push({id: e.id, isStared: !e.isStared}); }
		if (e.id === id) { acc.to.push({id: e.id, isStared: !e.isStared}); }
		return acc;
	}, {from: [], to: []});

	socketClient.emit("question/toggleStar", toggleMsg);
};


// socket.io 서버는 아래와 같은 쿼리를 불러 순차적으로 DB 를 업데이트합니다.

// in backend/DB/queries/question.js
export async function updateIsStared(from, to) {
	const transaction = await sequelize.transaction();

	try {
		if (from) {
			await Question.update({isStared: from.isStared},
				{where: {id: from.id}},
				{transaction},
			);
		}
		await Question.update({isStared: to.isStared},
			{where: {id: to.id}},
			{transaction},
		);
		await transaction.commit();
	} catch (err) {
		if (transaction) await transaction.rollback();
		console.log("Transaction rollback", err);
	}
}

// 현재 전체 리스트에서 단 하나의 element 만 true 인 상태를 유지하기 위해 다소 무식한 방법을
// 사용한 것 같습니다. 리뷰어님의 경우 이와 같은 상황일 때 어떤 방식을 사용하시는지 궁금합니다.
// 감사합니다!