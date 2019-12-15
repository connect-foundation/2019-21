import React from "react";
import QuestionCardInnerDivider from "../QuestionContainer/QuestionCardInnerDivider.js";
import Reply from "./Reply.js";

// todo proptype 추가
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
