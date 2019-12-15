import {useState} from "react";

const SELECTED = true;
const UNSELECTED = false;
const radioStateInitialValue = [SELECTED, UNSELECTED, UNSELECTED, UNSELECTED];
const emptyRadioState = [UNSELECTED, UNSELECTED, UNSELECTED, UNSELECTED];

// todo: 이기능과 연동되는 guest-app의 경우 기능이 없음, 기능 제거에 대한 토의가 필요
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
