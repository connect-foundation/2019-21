import React from "react";
import styled, {css} from "styled-components";
import {Button} from "@material-ui/core";
import {MdPerson} from "react-icons/md";
import SelectionItems from "./SelectionItems";
import RatingItem from "./RatingItem";
import {socketClient} from "../../libs/socket.io-Client-wrapper";

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	border: 1px solid #dee2e6; /* Gray3 */
	width: 100%;
	margin-top: 1rem;
	button {
		margin-bottom: 1rem;
	}
	background-color: white;
`;

const RowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	height: 3rem;
	font-weight: ${props => (props.bold ? "bold" : "normal")};
	padding: 0.5rem;
	box-sizing: border-box;
	${props =>
		props.small &&
		css`
			font-size: 0.8rem;
			font-weight: normal;
			height: 1.5rem;
			padding: 0.25rem 0.5rem;
		`}
`;

const onOpenPoll = id => {
	const req = {pollId: id};

	socketClient.emit("poll/open", req);
};

const onClosePoll = id => {
	const req = {pollId: id};

	socketClient.emit("poll/close", req);
};

function PollCard(props) {
	const {
		id,
		pollName,
		allowDuplication,
		pollDate,
		pollType,
		totalVoters,
		state,
		...others
	} = props;

	let localePollDate;
	// socket.io, sequelize, graphQL 을 거치면서 format이 변경되어서 그때그때 처리하기 위함
	// pollDate는 poll 생성시 null 임. poll/open에 의해 값이 정해지는데 그 전까지는 일단 이렇게 처리함

	if (pollDate) {
		localePollDate = pollDate;
		if (localePollDate.includes("-")) {
			localePollDate = new Date(localePollDate);
		} else {
			localePollDate = new Date(parseInt(localePollDate, 10));
		}
		localePollDate = `
			${localePollDate.getMonth() + 1}월 
			${localePollDate.getDate()}일 
			${localePollDate.getHours()}시 
			${localePollDate.getMinutes()}분`;
	} else {
		localePollDate = new Date();
	}

	return (
		<ColumnWrapper>
			<RowWrapper left bold>
				{pollName}
				<div>{state === "running" && "(투표중)"}</div>
				<div>{state === "standby" && "(대기중)"}</div>
				<div>{state === "closed" && "(종료됨)"}</div>
			</RowWrapper>
			<RowWrapper left small>
				{allowDuplication ?
					`복수선택 | ${localePollDate}` :
					`${localePollDate}`}
			</RowWrapper>
			{pollType === "nItems" && (
				<SelectionItems
					totalVoters={totalVoters}
					state={state}
					{...others}
				/>
			)}
			{pollType === "rating" && <RatingItem state={state} {...others} />}
			<RowWrapper left>
				<MdPerson />
				{`${parseInt(totalVoters, 10).toLocaleString()} 명 참여`}
			</RowWrapper>
			{state === "standby" && (
				<>
					<Button
						variant="contained"
						color="primary"
						onClick={() => onOpenPoll(id)}
					>
						개시하기
					</Button>
				</>
			)}
			{state === "running" && (
				<>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => onClosePoll(id)}
					>
						종료하기
					</Button>
				</>
			)}
		</ColumnWrapper>
	);
}

export default PollCard;
