const compareByDate = (a, b) => a.createdAt.localeCompare(b.createdAt);

const compareByLikeCount = (a, b) => b.likeCount - a.likeCount;

const QuestionReducer = (state, action) => {
	const actionTable = {
		reset: () => [],
		load: () => [...action.data.sort(compareByDate)],
		addNewQuestion: () => [...state, action.data],
		sortByRecent: () => [...state.sort(compareByDate)],
		sortByLikeCount: () => [...state.sort(compareByLikeCount)]
	};

	if (!(action.type in actionTable)){
		throw new Error(`unexpected action.type: ${action.type}`);
	}

	return actionTable[action.type]();
};

export default QuestionReducer;
