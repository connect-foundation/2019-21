import React from "react";
import Fab from "@material-ui/core/Fab";
import ChatBubble from "@material-ui/icons/ChatBubble";
import {styled} from "@material-ui/core/styles";

const StyledFab = styled(Fab)({
	height: "2rem",
	marginBottom: "1rem",
});

function AddReplyRow(props) {
	const {openReplies} = props;
	return (
		<StyledFab color="primary" variant="extended" onClick={openReplies}>
			<ChatBubble style={{marginRight: "0.5rem"}} />
			<strong>댓글달기</strong>
		</StyledFab>
	);
}

export default AddReplyRow;
