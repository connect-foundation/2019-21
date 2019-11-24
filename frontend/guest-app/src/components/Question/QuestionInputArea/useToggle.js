import React from "react";

function useToggle(initialState = true) {
	const [state, setState] = React.useState(initialState);
	const toggle = () => {
		setState(!state);
	};
	const setOn = () => {
		setState(true);
	};
	const setOff = () => {
		setState(true);
	};

	return {state, toggle, setOn, setOff};
}

export default useToggle;
