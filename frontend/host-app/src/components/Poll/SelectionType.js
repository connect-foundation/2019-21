import React from "react";
import styled from "styled-components";
import {Radio} from "@material-ui/core";

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	min-height: 50px;
	padding: 0 0 0 1rem;
    box-sizing: border-box;
`;

function SelectionType({selectionType, onChange}) {
	return (
		<RowWrapper left>
			<Radio
				checked={selectionType === "text"}
				onChange={onChange}
				value="text"
				id="text"
			/>
			<label for="text">텍스트</label>
			<Radio
				checked={selectionType === "date"}
				onChange={onChange}
				value="date"
				id="date"
			/>
			<label for="date">날짜</label>
		</RowWrapper>
	);
}

export default SelectionType;
