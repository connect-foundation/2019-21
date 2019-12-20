import React from "react";
import styled from "styled-components";

const Title = styled.div`
	display: flex;
	flex-grow: 1;
	margin-left: 0;
	margin-top: 2rem;
	font-size: 2rem;
	color: #139ffb;
`;

function TabHeader(props) {
	const TITLE = {general: "기본설정"};
	const type = props.type;

	return <Title id="createEvent-modal-title">{TITLE[type]}</Title>;
}

export default TabHeader;
