import React from "react";
import styled from "styled-components";

const EmptyContentOuter = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	box-sizing: border-box;
	margin-top: -1rem;
`;

const EmptyContentInner = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 1.5rem;
	margin: auto 0;
	button {
		margin-top: 1rem;
	}
`;

function EmptyContentStyle(props) {
	return (
		<EmptyContentOuter>
			<EmptyContentInner>{props.children}</EmptyContentInner>
		</EmptyContentOuter>
	);
}

export default EmptyContentStyle;
