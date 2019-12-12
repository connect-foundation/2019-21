import React from "react";
import Button from "@material-ui/core/Button";
import ChatBubble from "@material-ui/icons/ChatBubble";
import {styled} from "@material-ui/core/styles";

const StyledButton = styled(Button)({
	height: "2rem",
	marginBottom: "1rem",
});

function AddReplyRow(props) {
	const {openReplies} = props;

	return (
		<StyledButton onClick={openReplies}>
			<ChatBubble style={{marginRight: "0.5rem"}} />
			<strong>댓글달기</strong>
		</StyledButton>
	);
}

export default AddReplyRow;
