import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";

const EmptyContentBox = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: auto;
	align-items: center;
	border-radius: 8px;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	height: 100%;
	box-sizing: border-box;
`;

const EmptyContentDiv = styled.div`
    display: flex;
	flex-direction: column;
	font-size:2rem;
	margin: auto 0;
`;

function EmptyContent() {
	return (
		<EmptyContentBox>
			<EmptyContentDiv>
                현재 진행중인 이벤트가 없습니다
				<Button
					size="medium"
					variant="contained"
					color="primary"
				>
                    이벤트 만들기
				</Button>
			</EmptyContentDiv>
		</EmptyContentBox>
	);
}

export default EmptyContent;
