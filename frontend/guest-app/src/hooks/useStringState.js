import {useState} from "react";

function useStringState(initialState = "") {
	const [state, setState] = useState(initialState);

	return {
		state,
		setState: newState => setState(newState),
		reset: () => setState(initialState),
	};
}

export default useStringState;
