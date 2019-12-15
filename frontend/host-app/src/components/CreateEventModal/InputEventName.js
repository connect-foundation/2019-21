import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	marginTop: "1rem",
	width: 400,
});

// todo: propType, defalut prop 추가
function InputEventName(props) {
	// todo: eventName 제거
	const {eventName, dispatch, errorState} = props;

	return (
		<CustomTextField
			id="eventName"
			label="이벤트 이름을 입력해주세요"
			color="primary"
			error={errorState}
			onChange={dispatch}
			autoFocus
		/>
	);
}

export default InputEventName;
