import React from "react";
import Badge from "@material-ui/core/Badge/Badge.js";
import {PollIcon, QuestionIcon} from "../FontAwesomeIcons.js";

export function QnATabIcon({showBadge}) {
	if (showBadge) {
		return (
			<Badge color="error" variant="dot">
				<QuestionIcon>&nbsp;Q&A</QuestionIcon>
			</Badge>
		);
	} else {
		return <QuestionIcon>&nbsp;Q&A</QuestionIcon>;
	}
}

export function PollTabIcon({showBadge}) {
	if (showBadge) {
		return (
			<Badge color="error" variant="dot">
				<PollIcon>&nbsp;Poll</PollIcon>
			</Badge>
		);
	} else {
		return <PollIcon>&nbsp;Poll</PollIcon>;
	}
}
