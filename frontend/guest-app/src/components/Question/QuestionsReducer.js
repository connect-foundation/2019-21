const compareByDate = (a, b) => b.createdAt.localeCompare(a.createdAt);

const compareByLikeCount = (a, b) => b.likeCount - a.likeCount;

const onReset = (state, data) => [];

const onLoad = (state, data) => [...data.sort(compareByDate)];

const onAddNewQuestion = (state, data) =>
	(data.status === "active" ? [...state, data] : [...state]);

const onSortByRecent = (state, data) => [...state.sort(compareByDate)];

const onSortByLikeCount = state => [...state.sort(compareByLikeCount)];

const onQuestionLike = (state, data) => {
	const guestGlobal = data.guestGlobal;
	const newState = state.map(x => {
		const {QuestionId, GuestId} = data;

		if (x.id !== QuestionId) {
			return x;
		}

		const newX = Object.assign({}, x);

		newX.likeCount += 1;

		if (GuestId === guestGlobal.id) {
			newX.didILike = true;
		}

		return newX;
	});

	return newState;
};

const onUndoQuestionLike = (state, data) => {
	const guestGlobal = data.guestGlobal;
	const newState = state.map(x => {
		const {QuestionId, GuestId} = data;

		if (x.id !== QuestionId) {
			return x;
		}

		const newX = Object.assign({}, x);

		newX.likeCount -= 1;

		if (GuestId === guestGlobal.id) {
			newX.didILike = false;
		}

		return newX;
	});

	return newState;
};

const QuestionsReducer = (state, action) => {
	const {type, data} = action;

	const actionTable = {
		reset: onReset,
		load: onLoad,
		addNewQuestion: onAddNewQuestion,
		sortByRecent: onSortByRecent,
		sortByLikeCount: onSortByLikeCount,
		questionLike: onQuestionLike,
		undoQuestionLike: onUndoQuestionLike,
	};

	if (!(type in actionTable)) {
		console.error(`unexpected action.type: ${type}`);
		return state;
	}

	return actionTable[type](state, data);
};

export default QuestionsReducer;
