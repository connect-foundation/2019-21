import React from "react";
import styled from "styled-components";
import ModerationQuestionCard from "./ModerationQuestionCard.js";
import LiveQuestionCard from "./LiveQuestionCard";
import CompleteQuestionCard from "./CompleteQuestionCard";

const QuestionDiv = styled.div`
	width: 100%;
`;

function QuestionContainer({datas, type, dataHandler, handleStar}) {
	return (
		<QuestionDiv>
			{(type === "moderation") && datas.questions.map(question => (
				<ModerationQuestionCard
					{...question}
					id={question.id}
					dataHandler={dataHandler}
					type={type}
					handleStar={handleStar}
				/>
			))}
			{(type === "popularQuestion") && datas.questions.map(question => (
				<LiveQuestionCard
					{...question}
					id={question.id}
					dataHandler={dataHandler}
					type={type}
					handleStar={handleStar}
				/>
			))}
			{(type === "newQuestion") && datas.questions.map(question => (
				<LiveQuestionCard
					{...question}
					id={question.id}
					dataHandler={dataHandler}
					type={type}
					handleStar={handleStar}
				/>
			))}
			{(type === "completeQuestion") && datas.questions.map(question => (
				<CompleteQuestionCard
					{...question}
					id={question.id}
					dataHandler={dataHandler}
					type={type}
					handleStar={handleStar}
				/>
			))}
		</QuestionDiv>
	);
}

export default QuestionContainer;
