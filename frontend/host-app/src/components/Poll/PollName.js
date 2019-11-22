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

function PollName({value, onChange}) {
	return (<RowWrapper left>
		<span>투표 제목 :</span><span>&nbsp;&nbsp;&nbsp;</span>
		<TextField
			margin="dense"
			variant="outlined"
			placeholder="투표 제목을 입력해주세요"
			value={value}
			onChange={onChange}
		/>
	</RowWrapper>);
}

export default PollName;
