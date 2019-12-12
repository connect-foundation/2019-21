import React from "react";
import styled, {css} from "styled-components";
import {MdPerson} from "react-icons/md";
import SelectionItems from "./SelectionItems";
import RatingItem from "./RatingItem";

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	border: 1px solid #adb5bd; /* Gray5 */
	// box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.25);
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

function PollCard(props) {
	const {
		pollName,
		allowDuplication,
		pollDate,
		pollType,
		totalVoters,
		state,
		...others
	} = props;

	// socket.io, sequelize, graphQL 을 거치면서 format이 변경되어서 그때그때 처리하기 위함
	let localePollDate = pollDate;
	if (localePollDate.includes("-")) {
		localePollDate = new Date(localePollDate);
	} else {
		localePollDate = new Date(parseInt(localePollDate));
	}
	localePollDate = `
		${localePollDate.getMonth() + 1}월 
		${localePollDate.getDate()}일 
		${localePollDate.getHours()}시 
		${localePollDate.getMinutes()}분`;

	return (
		<ColumnWrapper>
			<RowWrapper left bold>
				{pollName}
				<div>{state === "running" && "(투표중)"}</div>
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
		</ColumnWrapper>
	);
}

export default PollCard;
