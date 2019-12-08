const QuestionsReducer = (state, action) => {
	const actionTable = {
		addNewQuestion: () => ({questions: [...state.questions, action.data]}),
	};

	if (!(action.type in actionTable)) {
		throw new Error(`unexpected action.type: ${action.type}`);
	}

	return actionTable[action.type]();
};

export default QuestionsReducer;
