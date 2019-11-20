import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0.6rem 40px;
	background-color: #212529;
	color: white;
`;

const LeftStyle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	font-size: 1.2rem;
	font-weight: bold;
`;

const CenterStyle = styled.div`
	font-size: 1.1rem;
	text-align: center;
`;

const RightStyle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
`;

function Header() {
	return (
		<HeaderStyle>
			<LeftStyle>바글바글</LeftStyle>
			<CenterStyle>부캠-2019-마스터클래스-4차</CenterStyle>
			<RightStyle>email | logout</RightStyle>
		</HeaderStyle>
	);
}

export default Header;
