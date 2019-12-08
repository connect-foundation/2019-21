import _ from "lodash";

const compareByDate = (a, b) => b.createdAt.localeCompare(a.createdAt);

const compareByLikeCount = (a, b) => b.likeCount - a.likeCount;

const onReset = () => [];

const onLoad = (state, data) => [...state, ...data.sort(compareByDate)];

const onAddNewQuestion = (state, data) =>
	(data.status === "active" ? [...state, data] : [...state]);

const onSortByRecent = state => [...state.sort(compareByDate)];

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

const QuestionsReducer = (state, action) => {
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
	};

	if (!(type in actionTable)) {
		console.error(`unexpected action.type: ${type}`);
		return state;
	}

	return actionTable[type](state, data);
};

export default QuestionsReducer;
