import React from "react";
import styled from "styled-components";
import {Radio} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
		<RowWrapper>
			<FormControlLabel
				value="text"
				control={
					<Radio
						checked={selectionType === "text"}
						onChange={onChange}
					/>
				}
				label="텍스트"
			/>
			<FormControlLabel
				value="date"
				control={
					<Radio
						checked={selectionType === "date"}
						onChange={onChange}
					/>
				}
				label="날짜"
			/>
		</RowWrapper>
	);
}

export default SelectionType;
