import {useReducer} from "react";
import ToggleReducer from "./ToggleReducer.js";

function useToggleReducer() {
	const [state, dispatch] = useReducer(ToggleReducer, {
		state: false,
		data: {},
	});

	return {
		state: state.state,
		dispatch,
		data: state.data,
		toggle: data => dispatch({type: "toggle", data}),
		setOn: data => dispatch({type: "on", data}),
		setOff: data => dispatch({type: "off", data}),
	};
}

export default useToggleReducer;
