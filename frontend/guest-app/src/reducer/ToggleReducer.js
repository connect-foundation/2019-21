import _ from "lodash";

const ToggleReducer = (state, action) => {
	const actionTable = {
		toggle: (oldState, data) => {
			const newState = _.cloneDeep(oldState);

			newState.data = _.cloneDeep(data);
			newState.state = !newState.state;

			return newState;
		},
		on: (oldState, data) => {
			const newState = _.cloneDeep(oldState);

			newState.data = _.cloneDeep(data);
			newState.state = true;

			return newState;
		},
		off: (oldState, data) => {
			const newState = _.cloneDeep(oldState);

			newState.data = _.cloneDeep(data);
			newState.state = false;

			return newState;
		},
	};

	const {type, data} = action;

	if (!(type in actionTable)) {
		console.error(`unexpected action.type: ${type}`);
		return state;
	}

	try {
		return actionTable[type](state, data);
	} catch (e) {
		console.error(e);
		return state;
	}
};

export default ToggleReducer;
