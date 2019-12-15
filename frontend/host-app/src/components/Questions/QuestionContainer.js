import React from "react";
import ModerationQuestionCard from "./QuestionCard/ModerationQuestionCard.js";
import LiveQuestionCard from "./QuestionCard/LiveQuestionCard.js";
import CompleteQuestionCard from "./QuestionCard/CompleteQuestionCard.js";
import {filterQuestion, filterReplies} from "../../libs/utils";
import {FocusedDiv, UnFocusedDiv} from "./QuestionStyle";

const compareByCreateAt = (a, b) => b.createdAt.localeCompare(a.createdAt);
const compareByLikeCount = (a, b) => b.likeCount - a.likeCount;

// todo: proptype
function QuestionContainer({datas, type, dataHandler, handleStar, containerType}) {
	const QuestionDiv = containerType === "focus" ? FocusedDiv : UnFocusedDiv;

	// todo: 구조 개선
	return (
		<QuestionDiv>
			{type === "moderation" &&
				filterQuestion("moderation", datas).questions.map(question => (
					<ModerationQuestionCard
						{...question}
						id={question.id}
						dataHandler={dataHandler}
						type={type}
						handleStar={handleStar}
					/>
				))}
			{type === "popularQuestion" &&
				filterQuestion("active", datas).questions
					.sort(compareByLikeCount)
					.map(question => (
						<LiveQuestionCard
							{...question}
							id={question.id}
							dataHandler={dataHandler}
							type={type}
							handleStar={handleStar}
							replies={filterReplies(question.id, datas).questions}
						/>
					))}
			{type === "newQuestion" &&
				filterQuestion("active", datas).questions
					.sort(compareByCreateAt)
					.map(question => (
						<LiveQuestionCard
							{...question}
							id={question.id}
							dataHandler={dataHandler}
							type={type}
							handleStar={handleStar}
							replies={filterReplies(question.id, datas).questions}
						/>
					))}
			{type === "completeQuestion" &&
				filterQuestion("completeQuestion", datas).questions.map(question => (
					<CompleteQuestionCard
						{...question}
						id={question.id}
						dataHandler={dataHandler}
						type={type}
						handleStar={handleStar}
						replies={filterReplies(question.id, datas).questions}
					/>
				))}
		</QuestionDiv>
	);
}

export default QuestionContainer;
