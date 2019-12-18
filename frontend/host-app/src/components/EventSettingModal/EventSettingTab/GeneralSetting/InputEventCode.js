import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	marginTop: "0.6rem",
	width: "25rem",
});

function InputEventCode(props) {
	const eventCode = props.eventCode;

	return (
		<CustomTextField
			id="eventCode"
			label="이벤트 코드"
			color="primary"
			readOnly={true}
			value={eventCode}
		/>
	);
}

export default InputEventCode;
