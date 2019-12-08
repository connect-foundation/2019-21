import React from "react";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	marginTop: "1.3rem",
	width: "25rem",
});

function EndDateField(props) {
	return (
		<CustomTextField
			id="eventName"
			label="종료날짜"
			color="primary"
			value={props.endDate}
			readOnly={true}
		/>
	);
}

export default EndDateField;
