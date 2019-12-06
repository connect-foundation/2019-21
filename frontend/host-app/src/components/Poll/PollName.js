import React from "react";
import styled from "styled-components";
import {TextField} from "@material-ui/core";

const RowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	min-height: 3rem;
	padding: 0 2rem;
	box-sizing: border-box;
`;

const TitleSpan = styled.span`
	margin-right: 0.5rem;
`;

function PollName({value, onChange, error, helperText}) {
	return (
		<RowWrapper left>
			<TitleSpan>투표 제목 :</TitleSpan>
			<TextField
				autoFocus
				error={error}
				helperText={helperText}
				margin="dense"
				variant="outlined"
				placeholder="투표 제목을 입력해주세요"
				value={value}
				onChange={onChange}
			/>
		</RowWrapper>
	);
}

export default PollName;
