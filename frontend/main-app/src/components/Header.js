import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 1rem 40px;
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

const RightStyle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
`;

function Header() {
	return (
		<HeaderStyle>
			<LeftStyle>바글바글</LeftStyle>
			<RightStyle />
		</HeaderStyle>
	);
}

export default Header;
