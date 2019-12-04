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

function PollCard(props) {
	const {
		pollName,
		allowDuplication,
		pollDate,
		pollType,
		totalVoters,
		active,
		...others
	} = props;

	// const localePollDate = pollDate.toLocaleString();
	const localePollDate = pollDate;

	// console.log(pollName, pollDate, totalVoters);

	return (
		<ColumnWrapper>
			<RowWrapper left bold>
				{pollName}
				<div>{!active && "(종료됨)"}</div>
			</RowWrapper>
			<RowWrapper left small>
				{allowDuplication
					? `복수선택 | ${localePollDate}`
					: `${localePollDate}`}
			</RowWrapper>
			{pollType === "nItems" && (
				<SelectionItems
					totalVoters={totalVoters}
					active={active}
					{...others}
				/>
			)}
			{pollType === "rating" && (
				<RatingItem active={active} {...others} />
			)}
			<RowWrapper left>
				<MdPerson />
				{`${parseInt(totalVoters).toLocaleString()} 명 참여`}
			</RowWrapper>
		</ColumnWrapper>
	);
}

export default PollCard;
