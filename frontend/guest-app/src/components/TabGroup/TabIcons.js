import React from "react";
import Badge from "@material-ui/core/Badge/Badge.js";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import PollIcon from "@material-ui/icons/Poll";

const style = {marginRight: "8px"};


// todo 각 파일 분리하기
export function QnATabIcon({showBadge}) {
	const props = showBadge ? {color: "error", variant: "dot"} : {};

	return (
		<Badge {...props}>
			<QuestionAnswerIcon style={style} />
			Q&A
		</Badge>
	);
}

export function PollTabIcon({showBadge}) {
	const props = showBadge ? {color: "error", variant: "dot"} : {};

	return (
		<Badge {...props}>
			<PollIcon style={style} />
			투표
		</Badge>
	);
}
