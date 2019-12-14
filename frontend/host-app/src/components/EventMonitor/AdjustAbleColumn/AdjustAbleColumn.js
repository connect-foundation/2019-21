import styled from "styled-components";
import React, {useState} from "react";
import ColumnFooter from "../ColumnFooter.js";

const AdjustAbleColumnStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	border-radius: 8px;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	min-width: 20rem;
	height: ${props => props.height || "100%"};
	box-sizing: border-box;
	margin-left: 8px;
`;

function AdjustAbleColumn(props) {
	const [heightWeight, setHeightWeight] = useState(0);

	return (
		<AdjustAbleColumnStyle height={`${100 + heightWeight * 50}%`}>
			{props.children}
			<ColumnFooter data={heightWeight} handler={setHeightWeight} />
		</AdjustAbleColumnStyle>
	);
}

export default AdjustAbleColumn;
