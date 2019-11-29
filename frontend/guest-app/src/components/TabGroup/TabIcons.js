import React from "react";
import Badge from "@material-ui/core/Badge/Badge.js";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import PollIcon from "@material-ui/icons/Poll";

export function QnATabIcon({showBadge}) {
	if (showBadge) {
		return (
			<Badge color="error" variant="dot">
				<QuestionAnswerIcon />
				Q&A
			</Badge>
		);
	} else {
		return (
			<span>
				<QuestionAnswerIcon />
				Q&A
			</span>
		);
	}
}

export function PollTabIcon({showBadge}) {
	if (showBadge) {
		return (
			<Badge color="error" variant="dot">
				<PollIcon />
				Poll
			</Badge>
		);
	} else {
		return (
			<span>
				<PollIcon />
				Poll
			</span>
		);
	}
}
