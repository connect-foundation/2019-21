import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";

const Container = styled.div`
	// margin-top: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: flex-end;
	// margin-left: 10rem;
	height: 3rem;
`;

// const CancelTextButton = styled.div`
// 	font-size: 1.25rem;
// 	color: balck;
// 	:hover {
// 		font-weight: bold;
// 	}
// 	width: auto;
// 	cursor: pointer;
// 	margin: 1rem;
// `;

// const CreateTextButton = styled.div`
// 	font-size: 1.25rem;
// 	color: green;
// 	:hover {
// 		font-weight: bold;
// 	}
// 	width: auto;
// 	cursor: pointer;
// 	margin: 1rem;
// `;

function ButtonField({createEvent, onClose}) {
	return (
		<Container>
			{/* <CancelTextButton onClick={onClose}>취소</CancelTextButton>
			<CreateTextButton onClick={createEvent}>확인</CreateTextButton> */}
			<Button
				size="large"
				variant="contained"
				color="secondary"
				onClick={onClose}
			>
				취소
			</Button>
			<Button
				size="large"
				variant="contained"
				color="primary"
				onClick={createEvent}
			>
				확인
			</Button>
		</Container>
	);
}

export default ButtonField;
