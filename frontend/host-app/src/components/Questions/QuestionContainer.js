import React from "react";
import ModerationQuestionCard from "./ModerationQuestionCard.js";
import LiveQuestionCard from "./LiveQuestionCard";
import CompleteQuestionCard from "./CompleteQuestionCard";

function QuestionContainer({datas, type}) {
	return (
		<div>
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
		</div>
	);
}

export default QuestionContainer;
