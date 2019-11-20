import React from "react";
import styled from "styled-components";
import ModerationQuestionCard from "./ModerationQuestionCard.js";
import LiveQuestionCard from "./LiveQuestionCard";
import CompleteQuestionCard from "./CompleteQuestionCard";

const QuestionDiv = styled.div`
	width: 100%;
`;

function QuestionContainer({datas, type}) {
	return (
		<QuestionDiv>
			{(type === "moderation") && datas.questions.map((question, idx) => (
				<ModerationQuestionCard {...question} key={idx}/>
			))}
			{(type === "popularQuestion") && datas.questions.map((question, idx) => (
				<LiveQuestionCard {...question} key={idx}/>
			))}
			{(type === "newQuestion") && datas.questions.map((question, idx) => (
				<LiveQuestionCard {...question} key={idx}/>
			))}
			{(type === "completeQuestion") && datas.questions.map((question, idx) => (
				<CompleteQuestionCard {...question} key={idx}/>
			))}
		</QuestionDiv>
	);
}

export default QuestionContainer;
