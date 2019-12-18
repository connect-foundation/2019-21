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

function ButtonField({createEvent, onClose}) {
	return (
		<Container>
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
