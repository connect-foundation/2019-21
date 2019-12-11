const QuestionsReducer = (state, action) => {
	const actionTable = {
		addNewQuestion: () => {
			console.log([...state.questions, action.data]);
			return ({questions: [...state.questions, action.data]});
		},
		toggleStar: () => {
			const newData = state.questions.map(e => (e.id === action.data.id ? action.data : e));

			return {questions: [...newData]};
		},
		moveQuestion: () => {
			let newData = [];

			if (action.data.id === "all") {
				newData = state.questions.map(e => {
					if (e.state === action.data.from) { e.state = action.data.to; }
					return e;
				});
			} else {
				newData = state.questions.map(e => {
					if (e.id === action.data.id) { e.state = action.data.to; }
					return e;
				});
			}

			return {questions: [...newData]};
		},
	};

	if (!(action.type in actionTable)) {
		throw new Error(`unexpected action.type: ${action.type}`);
	}

	return actionTable[action.type]();
};

export default QuestionsReducer;
