import React from "react";
import PropTypes from "prop-types";
import AddReplyButton from "./ReplyAddButton.js";
import useReplies from "../../hooks/useReplies.js";
import AppDrawer from "../AppDrawer/AppDrawer.js";
import RepliesContainer from "../ReplyContainer/RepliesContainer.js";
import ReplyPreview from "./ReplyPreview.js";

export default function ReplyPreviewArea(props) {
	const {repliesIsOpened, openReplies, closeReplies} = useReplies();
	const {replies} = props;

	return (
		<>
			{replies.length !== 0 ? (
				<ReplyPreview onClick={openReplies} replies={replies}/>
			) : (
				<AddReplyButton onClick={openReplies}/>
			)}
			<AppDrawer
				anchor="bottom"
				isOpen={repliesIsOpened}
				onClose={closeReplies}
				title={"댓글"}
			>
				<RepliesContainer {...props} />
			</AppDrawer>
		</>
	);
}

ReplyPreviewArea.propTypes = {
	replies: PropTypes.array,
};
