import _ from "lodash";

const ToggleReducer = (state, action) => {
	const {type, data} = action;

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

	if (!(type in actionTable)) {
		console.error(`unexpected action.type: ${type}`);
		return state;
	}

	return actionTable[type](state, data);
};

export default ToggleReducer;
