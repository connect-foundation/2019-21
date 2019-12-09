import React from "react";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ReplyAvatar from "./ReplyAvatar";

const PreviewReplyContainer = styled(Paper)({
	display: "flex",
	height: "3rem",
	marginBottom: 5,
	alignItems: "center",
	backgroundColor: "#FFFFF0",
});

export default function ReplyArea() {
	const MAX_SHOWING_AVATAR = 5;
	const dummy = [
		"David",
		"Sara",
		"James",
		"Crong",
		"David",
		"Sara",
		"James",
		"Crong",
	];
	const repliesLength = dummy.length;
	let showingReplierList = dummy.slice(0, MAX_SHOWING_AVATAR);

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
		</PreviewReplyContainer>
	);
}
