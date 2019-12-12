import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	width: 400,
});

function InputEventName(props) {
	return (
		<CustomTextField
			id="eventName"
			label="이벤트 이름을 입력해주세요"
			color="primary"
			autoFocus
			onChange={props.dispatch}
		/>
	);
}

export default InputEventName;
