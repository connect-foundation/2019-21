import React from "react";
import {styled} from "@material-ui/core/styles";
import {Typography, Box} from "@material-ui/core";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

const TypographyWithIcon = styled(Box)({
	marginTop: 20,
	display: "flex",
});

const CustomIcon = styled(QuestionAnswerIcon)({
	marginRight: 20,
});

export default function TypeTitle() {
	const {children} = props;

	return (
		<TypographyWithIcon>
			<CustomIcon color="primary" />
			<Typography color="textPrimary">{children}</Typography>
		</TypographyWithIcon>
	);
}
