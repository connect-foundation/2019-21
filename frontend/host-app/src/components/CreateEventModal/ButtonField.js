import React from "react";
import styled from "styled-components";

const Container = styled.div`
	margin-top: auto;
	display: flex;
	margin-left: 10rem;
`;

const CancelTextButton = styled.div`
	font-size: 1.25rem;
	color: balck;
	:hover {
		font-weight: bold;
	}
	width: auto;
	cursor: pointer;
	margin: 1rem;
`;

const CreateTextButton = styled.div`
	font-size: 1.25rem;
	color: green;
	:hover {
		font-weight: bold;
	}
	width: auto;
	cursor: pointer;
	margin: 1rem;
`;

function ButtonField({createEvent, onClose}) {
	return (
		<Container>
			<CancelTextButton onClick={onClose}>CANCEL</CancelTextButton>
			<CreateTextButton onClick={createEvent}>
				CREATE EVENT
			</CreateTextButton>
		</Container>
	);
}

export default ButtonField;
