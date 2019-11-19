import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	width: 400,
});

function InputEventName() {
	return (
		<CustomTextField id="eventName" label="이벤트 이름" color="primary" />
	);
}

export default InputEventName;
