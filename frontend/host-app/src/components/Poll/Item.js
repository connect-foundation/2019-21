import React from "react";
import styled from "styled-components";
import {MdDone, MdPerson} from "react-icons/md";

const RowWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	height: 3rem;
	box-sizing: border-box;
	background-color: #f1f3f5; /* Gray1 */
	& + & {
		margin-top: 0.5rem;
	}
	.selection-name {
		margin-left: 1rem;
		overflow: hidden;
	}
	padding-left: 1rem;
`;

const RightEnd = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex: 1;
	height: 100%;
	padding-right: 1rem;
`;

const GraphWrapper = styled.div`
	opacity: 0.5;
	position: absolute;
	top: 0;
	left: 0;
	background-color: ${props =>
		(props.firstPlace ? "yellow" : "#adb5bd")}; /* Gray5 */
	height: 100%;
	width: ${props => props.ratio};
	box-sizing: border-box;
`;

function Item({
	content,
	voters,
	voted,
	totalVoters,
	firstPlace,
}) {
	return (
		<RowWrapper left >
			<div>{voted && <MdDone />}</div>
			<div className="selection-name">{content}</div>
			<RightEnd>
				<MdPerson />
				{voters}
			</RightEnd>
			<GraphWrapper
				firstPlace={firstPlace}
				ratio={`${(voters / totalVoters) * 100}%`}
			/>
		</RowWrapper>
	);
}

export default Item;
