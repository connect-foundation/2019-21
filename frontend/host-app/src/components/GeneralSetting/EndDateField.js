import React from "react";
import moment from "moment";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	marginTop: "1.3rem",
	width: "25rem",
});

function formattingDate(date) {
	return moment(date).format("YYYY년 MM월 DD일 HH시 mm분");
}

// todo propTypes, defaultprop 추가
function EndDateField(props) {
	return (
		<CustomTextField
			id="eventName"
			label="종료날짜"
			color="primary"
			value={formattingDate(props.endDate)}
			readOnly={true}
		/>
	);
}

export default EndDateField;
