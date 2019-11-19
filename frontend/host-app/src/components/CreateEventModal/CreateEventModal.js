import React, {useReducer} from "react";
import {Modal} from "@material-ui/core";
import styled from "styled-components";
import InputEventName from "./InputEventName";
import InputStartDate from "./InputStartDate";
import {eventModalReducer, initialModalState} from "./eventModalReducer";

const modalSize = 450;
const PopUpLayOutStyle = styled.div`
	position: relative;
	top: calc(50% - ${modalSize / 2}px);
	left: calc(50% - ${modalSize / 2}px);
	display: flex;
	flex-direction: column;
	width: ${modalSize}px;
	height: ${modalSize}px;
	background-color: white;
	padding-left: 20px;
`;

function CreateEventModal({open, handleClose}) {
	const [modalState, dispatchModalState] = useReducer(
		eventModalReducer,
		initialModalState,
	);

	const setEventName = event => {
		dispatchModalState({
			type: "setEventName",
			eventName: event.target.value,
		});
	};

	console.log(modalState.eventName);
	return (
		<Modal
			aria-labelledby="createEvent-modal-title"
			aria-describedby="createEvent-modal-description"
			open={open}
			onClose={handleClose}
		>
			<PopUpLayOutStyle>
				<h1 id="createEvent-modal-title">이벤트만들기</h1>
				<form>
					<InputEventName dispatch={setEventName} />
					<InputStartDate />
				</form>
			</PopUpLayOutStyle>
		</Modal>
	);
}

export default CreateEventModal;
