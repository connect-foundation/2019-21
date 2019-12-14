import {useState} from "react";

const SELECTED = true;
const UNSELECTED = false;
const radioStateInitialValue = [SELECTED, UNSELECTED, UNSELECTED, UNSELECTED];
const emptyRadioState = [UNSELECTED, UNSELECTED, UNSELECTED, UNSELECTED];

function useRadioState() {
	const [radioState, setRadioState] = useState(radioStateInitialValue);

	const updateRadioState = buttonIndex => {
		setRadioState(
			emptyRadioState.map((_, idx) =>
				(idx === buttonIndex ? SELECTED : UNSELECTED),
			),
		);
	};

	return {radioState, handleRadioState: updateRadioState};
}

export default useRadioState;
