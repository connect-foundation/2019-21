import React from "react";
import moment from "moment";
import {styled} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

const CustomTextField = styled(TextField)({
	marginTop: "2rem",
	width: 250,
});

function formattingDate(date) {
	return moment(date).format("YYYY년 MM월 DD일 HH시 mm분");
}

function EndDateField(props) {
	const {endDate} = props;

	return (
		<CustomTextField
			id="endDateField"
			label="종료날짜"
			color="primary"
			value={formattingDate(endDate)}
			readOnly={true}
		/>
	);
}

export default EndDateField;
