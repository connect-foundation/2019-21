import React from "react";
import ModerationQuestionCard from "./QuestionCard/ModerationQuestionCard.js";
import LiveQuestionCard from "./QuestionCard/LiveQuestionCard";
import CompleteQuestionCard from "./QuestionCard/CompleteQuestionCard";
import PollApollo from "../Poll/PollApollo.js";
import {filterQuestion, filterReplies} from "../../libs/utils";
import {FocusedDiv, UnFocusedDiv} from "./QuestionStyle";

const compareByCreateAt = (a, b) => b.createdAt.localeCompare(a.createdAt);
const compareByLikeCount = (a, b) => b.likeCount - a.likeCount;

function QuestionContainer({datas, type, containerType}) {
	const QuestionDiv = containerType === "focus" ? FocusedDiv : UnFocusedDiv;

	return (
		<QuestionDiv>
			{type === "moderation" &&
				filterQuestion("moderation", datas).questions.map(question => (
					<ModerationQuestionCard
						{...question}
						type={type}
						data={datas}
						key={question.id}
					/>
				))}
			{type === "popularQuestion" &&
				filterQuestion("active", datas).questions
					.sort(compareByLikeCount)
					.map(question => (
						<LiveQuestionCard
							{...question}
							type={type}
							replies={filterReplies(question.id, datas).questions}
							data={datas}
							key={question.id}
						/>
					))}
			{type === "newQuestion" &&
				filterQuestion("active", datas).questions
					.sort(compareByCreateAt)
					.map(question => (
						<LiveQuestionCard
							{...question}
							type={type}
							replies={filterReplies(question.id, datas).questions}
							data={datas}
							key={question.id}
						/>
					))}
			{type === "completeQuestion" &&
				filterQuestion("completeQuestion", datas).questions.map(question => (
					<CompleteQuestionCard
						{...question}
						type={type}
						replies={filterReplies(question.id, datas).questions}
						data={datas}
						key={question.id}
					/>
				))}
			{(type === "poll" && containerType !== "focus") && <PollApollo />}
		</QuestionDiv>
	);
}

export default QuestionContainer;
