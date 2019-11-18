import React from "react";
import styled from "styled-components";
import Column from "./Column";
import EmptyContent from "./EmptyContent";

const ContentStyle = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	overflow: auto;
	justify-content: center;
	align-items: center;
	padding: 4px 8px;
`;

function Content({event}) {
	return event ? (
		<ContentStyle>
			<Column title="검열중" />
			<Column title="최신 질문" />
			<Column title="인기 질문" />
			<Column title="완료 질문" />
			<Column title="투표" />
		</ContentStyle>
	) : (
		<ContentStyle>
			<EmptyContent/>
		</ContentStyle>
	);
}

export default Content;
