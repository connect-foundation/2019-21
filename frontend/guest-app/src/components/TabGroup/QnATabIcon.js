import React from "react";
import Badge from "@material-ui/core/Badge/Badge.js";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer.js";

const style = {marginRight: "8px"};

function QnATabIcon({showBadge}) {
	const props = showBadge ? {color: "error", variant: "dot"} : {};

	return (
		<Badge {...props}>
			<QuestionAnswerIcon style={style} />
			Q&A
		</Badge>
	);
}

export default QnATabIcon;
