import styled from "styled-components";
import React from "react";

const CreateModalHeaderStyle = styled.div`
	margin: 1rem 0 0.5rem 0;
	font-size: 2rem;
	color: #139ffb;
	text-align: center;
`;

function CreateModalHeader() {
	return (
		<CreateModalHeaderStyle id="createEvent-modal-title">
			이벤트만들기
		</CreateModalHeaderStyle>
	);
}

export default CreateModalHeader;
