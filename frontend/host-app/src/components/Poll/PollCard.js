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
	& + & {
		margin-top: 1rem;
	}
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

	const localePollDate = pollDate || new Date();

	return (
		<ColumnWrapper>
			<RowWrapper left bold>
				{pollName}
				<div>{state === "running" && "(투표중)"}</div>
				<div>{state === "standby" && "(대기중)"}</div>
				<div>{state === "closed" && "(종료됨)"}</div>
			</RowWrapper>
			<RowWrapper left small>
				{allowDuplication
					? `복수선택 | ${localePollDate}`
					: `${localePollDate}`}
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
				{`${parseInt(totalVoters).toLocaleString()} 명 참여`}
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
						color="primary"
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
