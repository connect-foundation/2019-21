import React from "react";
import { styled } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const CustomTextField = styled(TextField)({
	marginTop: 20,
	width: 400,
});

function InputEventName(props) {
	const eventCode = props.eventCode;
	const MAX_EVENT_CODE_LEN = 4;

	const validateEventCode = event => {
		const input = event.target.value;

		if (input.length > MAX_EVENT_CODE_LEN) {
			return;
		}
		props.dispatch(event);
	};

	return (
		<CustomTextField
			id="eventName"
			label="이벤트 코드"
			color="primary"
			value={eventCode}
			onChange={validateEventCode}
		/>
	);
}

export default InputEventName;
