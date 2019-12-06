const compareByDate = (a, b) => a.createdAt.localeCompare(b.createdAt);

const compareByLikeCount = (a, b) => b.likeCount - a.likeCount;

const QuestionsReducer = (state, action) => {
	const actionTable = {
		reset: () => [],
		load: () => [...action.data.sort(compareByDate)],
		addNewQuestion: () => (action.data.status === "active" ? [...state, action.data] : [...state]),
		sortByRecent: () => [...state.sort(compareByDate)],
		sortByLikeCount: () => [...state.sort(compareByLikeCount)],
	};

	if (!(action.type in actionTable)) {
		throw new Error(`unexpected action.type: ${action.type}`);
	}

	return actionTable[action.type]();
};

export default QuestionsReducer;
