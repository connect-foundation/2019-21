import React from "react";
import gray from "@material-ui/core/colors/grey.js";
import QuestionCard from "./QuestionCard.js";
import {useQuestions} from "../QuestionsContext.js";

const style = {
	backgroundColor: gray[300],
	marginTop: "0",
	marginBottom: "0",
	paddingTop: "0.25rem",
	paddingBottom: "0.5rem",
};

function getReplisInQuestion(questionId, replies) {
	const repliesInQuestion = replies.filter(reply => reply.QuestionId === questionId);

	return repliesInQuestion;
}

function QuestionCardList() {
	const {questions, replies} = useQuestions();

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
}

QuestionCardList.propTypes = {};

export default QuestionCardList;
