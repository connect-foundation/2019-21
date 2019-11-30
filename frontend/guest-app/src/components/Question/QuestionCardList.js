import React from "react";
import PropTypes from "prop-types";
import gray from "@material-ui/core/colors/grey.js";
import QuestionCard from "./QuestionCard/QuestionCard.js";

const style = {
	backgroundColor: gray[300],
	marginTop: "0",
	marginBottom: "0",
	paddingTop: "0.25rem",
	paddingBottom: "0.5rem",
};

function QuestionCardList(props) {
	const {questions} = props;

	return (
		<div style={style}>
			{questions.map((question, idx) => (
				<QuestionCard {...question} key={idx} />
			))}
		</div>
	);
}

QuestionCardList.propTypes = {
	questions: PropTypes.any,
};

export default QuestionCardList;
