import _ from "lodash";

const actionTable = {
	toggle: (state, data) => {
		const newState = _.cloneDeep(state);

		newState.data = _.cloneDeep(data);
		newState.state = !newState.state;

		return newState;
	},
	on: (state, data) => {
		const newState = _.cloneDeep(state);

		newState.data = _.cloneDeep(data);
		newState.state = true;

		return newState;
	},
	off: (state, data) => {
		const newState = _.cloneDeep(state);

		newState.data = _.cloneDeep(data);
		newState.state = false;

		return newState;
	},
};

const ToggleReducer = (state, action) => {
	const {type, data} = action;

	if (!(type in actionTable)) {
		// eslint-disable-next-line no-console
		console.error(`unexpected action.type: ${type}`);
		return state;
	}

	try {
		return actionTable[type](state, data);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
		return state;
	}
};

export default ToggleReducer;
