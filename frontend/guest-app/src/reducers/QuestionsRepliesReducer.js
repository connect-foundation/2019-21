import _ from "lodash";

const compareByDate = (a, b) => a.createdAt.localeCompare(b.createdAt);

const compareByLikeCount = (a, b) => b.likeCount - a.likeCount;

const onReset = () => [];

const onLoad = (state, data) => [...state, ...data];

const onAddNewQuestion = (state, data) => [...state, data];

const onSortByRecent = state => [...state.sort(compareByDate)];

const onSortByLikeCount = state => [...state.sort(compareByLikeCount)];

const onQuestionLike = (state, data) => {
	const guestGlobal = data.guestGlobal;

	return state.map(x => {
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

const onAddQuestionEmoji = (state, data) => {
	const {QuestionId, GuestId, name} = data;
	const guestGlobal = data.guestGlobal;
	const newState = _.cloneDeep(state);

	newState.forEach(question => {
		if (question.id !== QuestionId) {
			return question;
		}

		let isFound = false;

		question.emojis.forEach(emoji => {
			if (emoji.name !== name) {
				return;
			}

			isFound = true;

			emoji.count += 1;
			if (GuestId === guestGlobal.id) {
				emoji.didIPick = true;
			}
		});

		if (!isFound) {
			data.count = 1;
			if (GuestId === guestGlobal.id) {
				data.didIPick = true;
			}

			question.emojis.push(data);
		}
	});

	return newState;
};

const onRemoveQuestionEmoji = (state, data) => {
	const {QuestionId, GuestId, name} = data;
	const guestGlobal = data.guestGlobal;
	let newState = _.cloneDeep(state);

	newState.map(question => {
		if (question.id !== QuestionId) {
			return question;
		}

		question.emojis.forEach(emoji => {
			if (emoji.name !== name) {
				return;
			}

			emoji.count -= 1;

			if (GuestId === guestGlobal.id) {
				emoji.didIPick = false;
			}
		});

		return question;
	});

	newState = newState.map(question => {
		question.emojis = question.emojis.filter(emoji => emoji.count > 0);

		return question;
	});

	return newState;
};

const onRemoveQuestion = (state, data) =>
	_.cloneDeep(state).filter(x => x.id !== data.id);

const onUpdateQuestion = (state, data) => {
	const newState = _.cloneDeep(state);

	newState.map(x => {
		if (x.id !== data.id) {
			return x;
		}

		x.content = data.content;
		x.isAnonymous = data.isAnonymous;
		x.guestName = data.guestName;

		return x;
	});

	return newState;
};

const onMoveQuestion = (state, data) => {
	const newState = _.cloneDeep(state);

	if (data.id === "all") {
		return newState.map(e => {
			if (e.state === data.from) {
				e.state = data.to;
			}
			return e;
		});
	}

	return newState.map(e => {
		if (e.id === data.id) {
			e.state = data.to;
		}
		return e;
	});
};

const onToggleStarQuestion = (state, data) => {
	const newState = _.cloneDeep(state);

	newState.map(e => {
		if (e.id === data.id) {
			e.isStared = data.isStared;
		} else {
			e.isStared = false;
		}
		return e;
	});

	return newState;
};

const QuestionsRepliesReducer = (state, action) => {
	const {type, data} = action;

	const actionTable = {
		reset: onReset,
		load: onLoad,
		addNewQuestion: onAddNewQuestion,
		sortByRecent: onSortByRecent,
		sortByLikeCount: onSortByLikeCount,
		LikeQuestion: onQuestionLike,
		undoLikeQuestion: onUndoQuestionLike,
		addQuestionEmoji: onAddQuestionEmoji,
		removeQuestionEmoji: onRemoveQuestionEmoji,
		removeQuestion: onRemoveQuestion,
		updateQuestion: onUpdateQuestion,
		moveQuestion: onMoveQuestion,
		toggleStarQuestion: onToggleStarQuestion,
	};

	if (!(type in actionTable)) {
		// eslint-disable-next-line no-console
		console.error(`unexpected action.type: ${type}`);
		return state;
	}

	return actionTable[type](state, data);
};

export default QuestionsRepliesReducer;
