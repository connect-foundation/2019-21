import React from "react";
import ModerationQuestionCard from "./ModerationQuestionCard.js";
import LiveQuestionCard from "./LiveQuestionCard";
import CompleteQuestionCard from "./CompleteQuestionCard";
import PollApollo from "../Poll/PollApollo.js";
import {filterQuestion, filterReplies} from "../../libs/utils";
import {FocusedDiv, UnFocusedDiv} from "./QuestionStyle";

const compareByCreateAt = (a, b) => b.createdAt.localeCompare(a.createdAt);
const compareByLikeCount = (a, b) => b.likeCount - a.likeCount;

function QuestionContainer({datas, type, dataHandler, handleStar, containerType}) {
	const QuestionDiv = containerType === "focus" ? FocusedDiv : UnFocusedDiv;

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
			{(type === "poll" && containerType !== "focus") && <PollApollo />}
		</QuestionDiv>
	);
}

export default QuestionContainer;
