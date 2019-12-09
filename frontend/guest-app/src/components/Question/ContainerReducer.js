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
const onOpenQuestionEditMenuDrawer = (state, data) => {
	const newState = _.cloneDeep(state);

	newState.QuestionEditMenuDrawer.isOpen = true;
	newState.QuestionEditMenuDrawer.target = _.cloneDeep(data);

	return newState;
};

const onCloseQuestionEditMenuDrawer = (state, data) => {
	const newState = _.cloneDeep(state);

	newState.QuestionEditMenuDrawer.isOpen = false;
	newState.QuestionEditMenuDrawer.target = null;

	return newState;
};

const containerReducer = (state, action) => {
	const {type, data} = action;

	const actionTable = {
		openQuestionInputDrawer: onOpenQuestionInputDrawer,
		closeQuestionInputDrawer: onCloseQuestionDrawer,
		openQuestionEditMenuDrawer: onOpenQuestionEditMenuDrawer,
		closeQuestionEditMenuDrawer: onCloseQuestionEditMenuDrawer,
	};

	if (!(type in actionTable)) {
		console.error(`unexpected action.type: ${type}`);
		return state;
	}

	return actionTable[type](state, data);
};

export default containerReducer;
