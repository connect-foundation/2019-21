import React from "react";
import {Modal, Button} from "@material-ui/core";
import styled from "styled-components";

const modalHeight = 5;
const modalWidth = 20;
const PopUpLayOutStyle = styled.div`
	position: relative;
	top: calc(50% - ${modalHeight / 2}rem);
	left: calc(50% - ${modalWidth / 2}rem);
	width: ${modalWidth}rem;
	height: ${modalHeight}rem;
	background-color: white;
`;

function EventSettingModal(props) {
	return (
		<Modal
			aria-labelledby="confirm-modal-title"
			aria-describedby="confirm-modal-description"
			open={props.open}
			onClose={props.handleClose}
		>
			<PopUpLayOutStyle>
				<Button
					variant="contained"
					color="primary"
					onClick={props.handleClose}
				>
					정말취소
				</Button>
			</PopUpLayOutStyle>
		</Modal>
	);
}

export default EventSettingModal;
