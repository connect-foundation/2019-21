import React from "react";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ReplyAvatar from "./ReplyAvatar";

import CurrentRepliesTextField from "./CurrentRepliesTextField";

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
	const {replies} = props;
	const repliers = extractUniqueReplier(replies);
	const MAX_SHOWING_AVATAR = 5;
	const repliesLength = repliers.length;
	const showingReplierList = repliers.slice(0, MAX_SHOWING_AVATAR);

	return (
		<PreviewReplyContainer>
			{showingReplierList.map((userName, idx) => {
				if (idx === MAX_SHOWING_AVATAR - 1) {
					return (
						<ReplyAvatar
							userName={userName}
							remainReplies={
								repliesLength - MAX_SHOWING_AVATAR + 1
							}
							key={idx}
						></ReplyAvatar>
					);
				}
				return (
					<ReplyAvatar userName={userName} key={idx}></ReplyAvatar>
				);
			})}
			<CurrentRepliesTextField>{replies.length}</CurrentRepliesTextField>
		</PreviewReplyContainer>
	);
}
