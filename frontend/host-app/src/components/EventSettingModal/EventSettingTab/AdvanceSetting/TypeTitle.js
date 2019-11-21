import React from "react";
import {styled} from "@material-ui/core/styles";
import {Typography, Box} from "@material-ui/core";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import PollIcon from "@material-ui/icons/Poll";

const TypographyWithIcon = styled(Box)({
	marginTop: 20,
	display: "flex",
});

const CustomQuestionAnswerIcon = styled(QuestionAnswerIcon)({
	marginRight: 20,
});

const CustomPollIcon = styled(PollIcon)({
	marginRight: 20,
});

export default function TypeTitle(props) {
	const {children, type} = props;

	return (
		<TypographyWithIcon>
			{type === "question" && (
				<CustomQuestionAnswerIcon color="primary" />
			)}
			{type === "poll" && <CustomPollIcon color="primary" />}
			<Typography color="textPrimary">{children}</Typography>
		</TypographyWithIcon>
	);
}
