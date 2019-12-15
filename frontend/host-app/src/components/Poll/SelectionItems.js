import React from "react";
import styled from "styled-components";
import Item from "./Item";

// todo : 명확한 이름
const ColumnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	padding: 0.5rem;
	width: 100%;
`;

// todo : 명확한 이름
// todo: proptype 추가
function SelectionItem(props) {
	const {nItems, totalVoters, ...others} = props;

	return (
		<ColumnWrapper>
			{nItems.map((item, index) => (
				<Item
					{...item}
					totalVoters={totalVoters}
					key={index}
					{...others}
				/>
			))}
		</ColumnWrapper>
	);
}

export default SelectionItem;
