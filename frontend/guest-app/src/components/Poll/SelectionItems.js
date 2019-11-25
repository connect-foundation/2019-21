import React from "react";
import styled from "styled-components";
import Item from "./Item";

const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	padding: 0.5rem;
	width: 100%;
`;

function SelectionItem(props) {
	// const {selectionType, nItems, active, totalVoters} = props;
	const {nItems, totalVoters, ...others} = props;

	return (
		<ColumnWrapper>
				<Item/>
			{nItems.map((item, index) =>
				<Item
					{...item}
					totalVoters={totalVoters}
					key={index}
					{...others}
				/>)
			}
		</ColumnWrapper>
	);
}

export default SelectionItem;
