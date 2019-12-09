import React, {useContext} from "react";
import gray from "@material-ui/core/colors/grey.js";
import QuestionCard from "./QuestionCard.js";
import {QuestionsContext} from "../QuestionsContext.js";

const style = {
	backgroundColor: gray[300],
	marginTop: "0",
	marginBottom: "0",
	paddingTop: "0.25rem",
	paddingBottom: "0.5rem",
};

function QuestionCardList() {
	const {questions} = useContext(QuestionsContext);

	return (
		<div style={style}>
			{questions.map((question, idx) => (
				<QuestionCard {...question} key={idx} />
			))}
		</div>
	);
}

QuestionCardList.propTypes = {};

export default QuestionCardList;
