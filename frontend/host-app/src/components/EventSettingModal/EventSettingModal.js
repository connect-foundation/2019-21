import React from "react";
import {Modal} from "@material-ui/core";
import styled from "styled-components";
import TabNavigation from "./EventSettingTab/TabNavigation";

const modalHeight = 45;
const modalWidth = 60;
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
			aria-labelledby="createEvent-modal-title"
			aria-describedby="createEvent-modal-description"
			open={props.open}
			onClose={props.handleClose}
		>
			<PopUpLayOutStyle>
				<TabNavigation handleClose={props.handleClose} />
			</PopUpLayOutStyle>
		</Modal>
	);
}

export default EventSettingModal;
