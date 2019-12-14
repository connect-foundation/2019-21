import React from "react";
import styled from "styled-components";

const FooterBox = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-around;
	height: 1rem;
`;

const ColumnFooterStyle = styled.div`
	width: 90%;
	margin-top: auto;
`;

function ColumnFooterStyledComponent(props) {
	return (
		<ColumnFooterStyle>
			<FooterBox>{props.children}</FooterBox>
		</ColumnFooterStyle>
	);
}

export default ColumnFooterStyledComponent;
