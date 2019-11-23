import {useState} from "react";

function useUserAvatar(initialState = {isAnonymous: false, userName: "dummy"}) {
	const [state, setState] = useState(initialState);

	return {
		state,
		isAnonymous: state.isAnonymous,
		userName: state.userName,
		setState: newState => setState(newState),
		reset: () => setState(initialState),
	};
}

export default useUserAvatar;
