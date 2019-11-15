import React from "react";
import styled from "styled-components";
import Column from "./Column";

const ContentStyle = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	overflow: auto;
	justify-content: center;
	align-items: center;
	padding: 4px 8px;
`;

function Content() {
	return (
		<ContentStyle>
			<Column title="검열중" />
			<Column title="최신 질문" />
			<Column title="인기 질문" />
			<Column title="완료 질문" />
			<Column title="투표" />
		</ContentStyle>
	);
}

export default Content;
