import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import ModerationQuestionCard from "./ModerationQuestionCard.js";
import LiveQuestionCard from "./LiveQuestionCard";
import CompleteQuestionCard from "./CompleteQuestionCard";
import useModal from "../../customhook/useModal";
import NewPollModal from "../Poll/NewPollModal";

const QuestionDiv = styled.div`
	width: 100%;
`;

function QuestionContainer({datas, type, dataHandler, handleStar}) {
	const [createPollModalOpen, handleOpen, handleClose] = useModal();

	return (
		<QuestionDiv>
			{type === "moderation" &&
				datas.questions.map(question => (
					<ModerationQuestionCard
						{...question}
						id={question.id}
						dataHandler={dataHandler}
						type={type}
						handleStar={handleStar}
					/>
				))}
			{type === "popularQuestion" &&
				datas.questions.map(question => (
					<LiveQuestionCard
						{...question}
						id={question.id}
						dataHandler={dataHandler}
						type={type}
						handleStar={handleStar}
					/>
				))}
			{type === "newQuestion" &&
				datas.questions.map(question => (
					<LiveQuestionCard
						{...question}
						id={question.id}
						dataHandler={dataHandler}
						type={type}
						handleStar={handleStar}
					/>
				))}
			{type === "completeQuestion" &&
				datas.questions.map(question => (
					<CompleteQuestionCard
						{...question}
						id={question.id}
						dataHandler={dataHandler}
						type={type}
						handleStar={handleStar}
					/>
				))}
			{type === "poll" && (
				<Button color="primary" onClick={handleOpen}>
					투표만들기
				</Button>
			)}
			{type === "poll" && createPollModalOpen && (
				<NewPollModal
					open={createPollModalOpen}
					handleClose={handleClose}
				/>
			)}
		</QuestionDiv>
	);
}

export default QuestionContainer;