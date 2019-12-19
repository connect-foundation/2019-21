import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import {validEventName} from "../../../../libs/eventValidation";

const CustomTextField = styled(TextField)({
	width: "25rem",
});

function InputEventName(props) {
	const errorState = !validEventName(props.eventName);
	return (
		<CustomTextField
			error={errorState}
			id="eventName"
			label="이벤트 이름"
			color="primary"
			value={props.eventName}
			onChange={props.dispatch}
		/>
	);
}

export default InputEventName;
