const QuestionsReducer = (state, action) => {
	const actionTable = {
		addNewQuestion: () => ({questions: [...state.questions, action.data]}),
		toggleStar: () => {
			const newData = state.questions.map(e => {
				e.id !== action.data.id ?
					(e.isStared = false) :
					(e.isStared = action.data.isStared);
				return e;
			});

			return {questions: [...newData]};
		},
		moveQuestion: () => {
			let newData = [];

			if (action.data.id === "all") {
				newData = state.questions.map(e => {
					if (e.state === action.data.from) {
						e.state = action.data.to;
					}

					return e;
				});
			} else {
				newData = state.questions.map(e => {
					if (e.id === action.data.id) {
						e.state = action.data.to;
					}

					return e;
				});
			}

			return {questions: [...newData]};
		},
		createLike: () => {
			const targetId = action.data.QuestionId;
			const newData = state.questions.map(e => {
				if (e.id === targetId) {
					e.likeCount++;
				}

				return e;
			});

			return {questions: [...newData]};
		},
		removeLike: () => {
			const targetId = action.data.QuestionId;
			const newData = state.questions.map(e => {
				if (e.id === targetId) {
					e.likeCount--;
				}

				return e;
			});

			return {questions: [...newData]};
		},
	};

	if (!(action.type in actionTable)) {
		throw new Error(`unexpected action.type: ${action.type}`);
	}

	return actionTable[action.type]();
};

export default QuestionsReducer;
