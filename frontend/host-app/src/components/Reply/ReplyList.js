import React from "react";
import QuestionCardInnerDivider from "../Questions/QuestionCardInnerDivider.js";
import Reply from "./Reply.js";

function ReplyList(props) {
	return (
		<>
			<QuestionCardInnerDivider/>
			{props.replies.map(reply => (
				<Reply {...reply} />
			))}
		</>
	);
}

export default ReplyList;
