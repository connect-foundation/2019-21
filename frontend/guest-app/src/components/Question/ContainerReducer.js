import _ from "lodash";

const onOpenQuestionInputDrawer = (state, data) => {
	const newState = _.cloneDeep(state);

	newState.QuestionInputDrawer.isOpen = true;
	return newState;
};

const onCloseQuestionDrawer = (state, data) => {
	const newState = _.cloneDeep(state);

	newState.QuestionInputDrawer.isOpen = false;
	return newState;
};

const containerReducer = (state, action) => {
	const {type, data} = action;

	const actionTable = {
		openQuestionInputDrawer: onOpenQuestionInputDrawer,
		closeQuestionInputDrawer: onCloseQuestionDrawer,
	};

	if (!(type in actionTable)) {
		console.error(`unexpected action.type: ${type}`);
		return state;
	}

	return actionTable[type](state, data);
};

export default containerReducer;
