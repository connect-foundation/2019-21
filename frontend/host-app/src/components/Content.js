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
			<Column type="moderation" />
			<Column type="newQuestion" />
			<Column type="popularQuestion" />
			<Column type="completeQuestion" />
			<Column type="poll" />
		</ContentStyle>
	) : (
		<ContentStyle>
			<EmptyContent/>
		</ContentStyle>
	);
}

export default Content;
