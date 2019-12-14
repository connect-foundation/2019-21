import React from "react";
import styled from "styled-components";

const ColumnFooterInner = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-around;
	height: 1rem;
`;

const ColumnFooterWrapper = styled.div`
	width: 90%;
	margin-top: auto;
`;

function ColumnFooterStyle(props) {
	return (
		<ColumnFooterWrapper>
			<ColumnFooterInner>{props.children}</ColumnFooterInner>
		</ColumnFooterWrapper>
	);
}

export default ColumnFooterStyle;
