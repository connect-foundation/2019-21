import React, {useContext} from "react";
import {Modal} from "@material-ui/core";
import styled from "styled-components";
import TabNavigation from "./EventSettingTab/TabNavigation";
import {HostContext} from "../../libs/hostContext";

const modalHeight = 41;
const modalWidth = 45;
const alertHeight = 2;
const alertWidth = 12;
const PopUpLayOutStyle = styled.div`
	position: relative;
	top: calc(50% - ${modalHeight / 2}rem);
	left: calc(50% - ${modalWidth / 2}rem);
	width: ${modalWidth}rem;
	height: ${modalHeight}rem;
	background-color: white;
	border-radius: 15px;
	outline: none;
`;
const AlertLayOut = styled.div`
	position: relative;
	top: calc(50% - ${alertHeight / 2}rem);
	left: calc(50% - ${alertWidth / 2}rem);
	width: ${alertWidth}rem;
	height: ${alertHeight}rem;
	background-color: white;
	text-align: center;
	border-radius: 15px;
	outline: none;
`;

function EventSettingModal(props) {
	const {events} = useContext(HostContext);
	const eventNum = events.length;

	return (
		<Modal
			aria-labelledby="createEvent-modal-title"
			aria-describedby="createEvent-modal-description"
			open={props.open}
			onClose={props.handleClose}
		>
			{eventNum ? (
				<PopUpLayOutStyle>
					<TabNavigation handleClose={props.handleClose} />
				</PopUpLayOutStyle>
			) : (
				<AlertLayOut>
					<p>이벤트가 없습니다.</p>
				</AlertLayOut>
			)}
		</Modal>
	);
}

export default EventSettingModal;
