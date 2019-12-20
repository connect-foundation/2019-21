import React from "react";
import {styled} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";

const Container = styled(Box)({
	marginTop: "1rem",
	marginLeft: "0.6rem",
	marginBottom: "1rem",
	display: "flex",
	flexDirection: "row",
	flex: 1,
});

const CustomDivider = styled(Divider)({
	marginLeft: "2rem",
	width: "70%",
	height: "0.2rem",
	marginTop: "0.8rem",
});

function ReplyQuestionDivider(props) {
	const {replies} = props;

	return (
		<Container>
			<Typography variant="subtitle1">{`댓글 ${replies.length}개`}</Typography>
			<CustomDivider/>
		</Container>
	);
}

export default ReplyQuestionDivider;
