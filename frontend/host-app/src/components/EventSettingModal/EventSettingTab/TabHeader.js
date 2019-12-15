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

// todo material typography로 변경
// todo proptype defualt prop 추가
// todo 기본 설정, 상세설정 두개의 컴포넌트로 분리 가능
function TabHeader(props) {
	const TITLE = {general: "기본설정", feature: "상세설정"};
	const type = props.type;

	return <Title id="createEvent-modal-title">{TITLE[type]}</Title>;
}

export default TabHeader;
