import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	width: "25rem",
});

// todo proptype default prop 추가
function InputEventName(props) {
	// todo CustomTextField은 재사용되는 컴포넌트이므로 분리 할수 있음
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
