import React from "react";
import PropTypes from "prop-types";
import gray from "@material-ui/core/colors/grey.js";
import QuestionCard from "./QuestionCard.js";

const style = {
	backgroundColor: gray[300],
	marginTop: "0",
	marginBottom: "0",
	paddingTop: "0.25rem",
	paddingBottom: "0.5rem",
};

function getReplisInQuestion(questionId, replies) {
	const repliesInQuestion = replies.filter(
		reply => reply.QuestionId === questionId,
	);

	return repliesInQuestion;
}

const QuestionCardList = React.memo(props => {
	const {questions, replies} = props;

	return (
		<div style={style}>
			{questions.map((question, idx) => (
				<QuestionCard
					{...question}
					key={idx}
					replies={getReplisInQuestion(question.id, replies)}
				/>
			))}
		</div>
	);
});

QuestionCardList.propTypes = {
	questions: PropTypes.array,
	replies: PropTypes.array,
};

QuestionCardList.defualtProps = {
	questions: [],
	replies: [],
};

export default QuestionCardList;
