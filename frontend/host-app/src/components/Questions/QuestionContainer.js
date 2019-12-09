import React from "react";
import styled from "styled-components";
import ModerationQuestionCard from "./ModerationQuestionCard.js";
import LiveQuestionCard from "./LiveQuestionCard";
import CompleteQuestionCard from "./CompleteQuestionCard";
import PollApollo from "../Poll/PollApollo.js";
import {filterQuestion} from "../../libs/utils";

const QuestionDiv = styled.div`
	width: 100%;
`;

const compareByCreateAt = (a, b) =>
	a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0;
const compareByLikeCount = (a, b) =>
	a.likeCount < b.likeCount ? 1 : a.likeCount > b.likeCount ? -1 : 0;

function QuestionContainer({datas, type, dataHandler, handleStar}) {
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
					/>
				))}
			{type === "poll" && <PollApollo />}
		</QuestionDiv>
	);
}

export default QuestionContainer;
