import React from "react";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import gray from "@material-ui/core/colors/grey.js";
import ReplyPreviewAvatar from "./ReplyPreviewAvatar.js";
import ReplyNumber from "./ReplyNumber.js";

const MAX_SHOWING_AVATAR = 5;
const ReplyPreviewStyle = styled(Paper)({
	display: "flex",
	height: "3rem",
	marginBottom: 15,
	alignItems: "center",
	backgroundColor: gray[300],
});

function extractUniqueReplier(replies) {
	const uniqueGuestIdMap = new Map();

	replies.forEach(reply => {
		uniqueGuestIdMap.set(reply.GuestId, reply.guestName);
	});

	return [...uniqueGuestIdMap.values()];
}

function ReplyPreview(props) {
	const {replies, onClick} = props;
	const repliers = extractUniqueReplier(replies);
	const repliersNum = repliers.length;
	const showingReplierList = repliers.slice(0, MAX_SHOWING_AVATAR);

	return (
		<ReplyPreviewStyle>
			{showingReplierList.map((userName, idx) => {
				if (idx === MAX_SHOWING_AVATAR - 1) {
					return (
						<ReplyPreviewAvatar
							userName={userName}
							remainder={repliersNum - MAX_SHOWING_AVATAR + 1}
							key={idx}
						/>
					);
				}

				return <ReplyPreviewAvatar userName={userName} key={idx} />;
			})}
			<ReplyNumber openReplies={onClick} replyCount={replies.length} />
		</ReplyPreviewStyle>
	);
}

export default ReplyPreview;
