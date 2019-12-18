import React from "react";
import Button from "@material-ui/core/Button";
import {ChatBubbleOutlineOutlined} from "@material-ui/icons";
import {styled} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const StyledButton = styled(Button)({
	height: "2rem",
	marginBottom: "1rem",
});

function ReplyAddButton(props) {
	const {onClick} = props;

	return (
		<StyledButton onClick={onClick}>
			<ChatBubbleOutlineOutlined style={{marginRight: "0.5rem"}} />
			<Typography variant="subtitle1">댓글달기</Typography>
		</StyledButton>
	);
}

export default ReplyAddButton;
