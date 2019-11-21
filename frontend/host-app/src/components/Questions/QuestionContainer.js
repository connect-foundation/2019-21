import React from "react";
import styled from "styled-components";
import ModerationQuestionCard from "./ModerationQuestionCard.js";
import LiveQuestionCard from "./LiveQuestionCard";
import CompleteQuestionCard from "./CompleteQuestionCard";

const QuestionDiv = styled.div`
	width: 100%;
`;

function QuestionContainer({datas, type, dataHandler}) {
	return (
		<QuestionDiv>
			{(type === "moderation") && datas.questions.map(question => (
				<ModerationQuestionCard {...question} id={question.id} dataHandler={dataHandler} type={type}/>
			))}
			{(type === "popularQuestion") && datas.questions.map(question => (
				<LiveQuestionCard {...question} id={question.id} dataHandler={dataHandler} type={type}/>
			))}
			{(type === "newQuestion") && datas.questions.map(question => (
				<LiveQuestionCard {...question} id={question.id} dataHandler={dataHandler} type={type}/>
			))}
			{(type === "completeQuestion") && datas.questions.map(question => (
				<CompleteQuestionCard {...question} id={question.id} dataHandler={dataHandler} type={type}/>
			))}
		</QuestionDiv>
	);
}

export default QuestionContainer;
