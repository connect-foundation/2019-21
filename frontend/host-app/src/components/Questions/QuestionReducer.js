const QuestionsReducer = (state, action) => {
	const actionTable = {
		addNewQuestion: () => ({questions: [...state.questions, action.data]}),
		toggleStar: () => {
			const newData = state.questions.map(e => (e.id === action.data.id ? action.data : e));

			return {questions: [...newData]};
		},
	};

	if (!(action.type in actionTable)) {
		throw new Error(`unexpected action.type: ${action.type}`);
	}

	return actionTable[action.type]();
};

export default QuestionsReducer;