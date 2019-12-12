import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	marginTop: "1rem",
	width: 400,
});

function InputEventName(props) {
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
