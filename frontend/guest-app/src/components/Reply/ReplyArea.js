import React from "react";
import PropTypes from "prop-types";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import ReplyAvatar from "./ReplyAvatar";
import RepliesPaper from "./RepliesPaper";
import useReplies from "./useReplies";

import CurrentRepliesTextField from "./CurrentRepliesTextField";

const MAX_SHOWING_AVATAR = 5;
const PreviewReplyContainer = styled(Paper)({
	display: "flex",
	height: "3rem",
	marginBottom: 5,
	alignItems: "center",
	backgroundColor: "#FFFFF0",
});

function extractUniqueReplier(replies) {
	const uniqueGuestIdMap = new Map();

	replies.forEach(replie => {
		uniqueGuestIdMap.set(replie.GuestId, replie.guestName);
	});
	return [...uniqueGuestIdMap.values()];
}

export default function ReplyArea(props) {
	const {repliesIsOpened, openReplies, closeReplies} = useReplies();
	const {replies} = props;
	const repliers = extractUniqueReplier(replies);
	const repliersNum = repliers.length;
	const showingReplierList = repliers.slice(0, MAX_SHOWING_AVATAR);

	return (
		<PreviewReplyContainer>
			{showingReplierList.map((userName, idx) => {
				if (idx === MAX_SHOWING_AVATAR - 1) {
					return (
						<ReplyAvatar
							userName={userName}
							remainder={repliersNum - MAX_SHOWING_AVATAR + 1}
							key={idx}
						></ReplyAvatar>
					);
				}
				return (
					<ReplyAvatar userName={userName} key={idx}></ReplyAvatar>
				);
			})}
			<CurrentRepliesTextField openReplies={openReplies}>
				{replies.length}
			</CurrentRepliesTextField>
			<Drawer anchor="bottom" open={repliesIsOpened}>
				<RepliesPaper onClose={closeReplies} />
			</Drawer>
		</PreviewReplyContainer>
	);
}

ReplyArea.PropTypes = {
	replies: PropTypes.array,
};
