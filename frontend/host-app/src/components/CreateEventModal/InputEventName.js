import React, {useState} from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import {validEventName} from "../../libs/eventValidation";

const CustomTextField = styled(TextField)({
	marginTop: "1rem",
	width: 400,
});

function InputEventName(props) {
	const {dispatch, errorState, eventName} = props;

	return (
		<CustomTextField
			id="eventName"
			label="이벤트 이름을 입력해주세요"
			color="primary"
			error={errorState.eventName}
			value={eventName}
			onChange={event => {
				dispatch({
					type: "SET_ERROR_STATE",
					property: "eventName",
					value: !validEventName(event.target.value),
				});
				dispatch({
					type: "SET_PROPERTY",
					property: "eventName",
					value: event.target.value,
				});
			}}
			autoFocus
		/>
	);
}

export default InputEventName;
