import React from "react";
import PropTypes from "prop-types";
import QuestionCard from "./QuestionCard/QuestionCard.js";

function QuestionCardList(props) {
	const {questions} = props;

	return (
		<>
			{questions.map((question, idx) => {
				return <QuestionCard {...question} key={idx} />;
			})}
		</>
	);
}

QuestionCardList.propTypes = {
	questions: PropTypes.any,
};

export default QuestionCardList;
