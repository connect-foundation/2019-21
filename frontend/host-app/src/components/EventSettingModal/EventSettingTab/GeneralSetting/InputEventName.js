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
			label="이벤트 이름"
			color="primary"
			value={props.eventName}
			onChange={props.dispatch}
		/>
	);
}

export default InputEventName;
