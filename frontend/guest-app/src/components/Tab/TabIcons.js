import Badge from "@material-ui/core/Badge/Badge.js";
import React from "react";

export function QnATabIcon({showBadge}) {
	if (showBadge) {
		return (
			<Badge color="error" variant="dot">
				<i className="fas fa-comment-dots">&nbsp;Q&A</i>
			</Badge>
		);
	} else {
		return <i className="fas fa-comment-dots">&nbsp;Q&A</i>;
	}
}

export function PollTabIcon({showBadge}) {
	if (showBadge) {
		return (
			<Badge color="error" variant="dot">
				<i className="fas fa-poll">&nbsp;Poll</i>
			</Badge>
		);
	} else {
		return <i className="fas fa-poll">&nbsp;Poll</i>;
	}
}
