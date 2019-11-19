import React, {useReducer} from "react";
import {Modal} from "@material-ui/core";
import styled from "styled-components";
import InputEventName from "./InputEventName";
import InputStartDate from "./InputStartDate";
import InputHashTag from "./InputHashTag";
import EndDateField from "./EndDateField";
import HashTagsField from "./HashTagsField";
import ButtonField from "./ButtonField";
import {eventModalReducer, initialModalState} from "./eventModalReducer";

const modalHeight = 600;
const modalWidth = 450;
const PopUpLayOutStyle = styled.div`
	position: relative;
	top: calc(50% - ${modalHeight / 2}px);
	left: calc(50% - ${modalWidth / 2}px);
	display: flex;
	flex-direction: column;
	width: ${modalWidth}px;
	height: ${modalHeight}px;
	background-color: white;
	padding-left: 20px;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 85%;
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

	const setStartDate = event => {
		dispatchModalState({
			type: "setStartDate",
			startDate: event,
		});
	};

	const setEndDate = event => {
		dispatchModalState({
			type: "setEndDate",
			endDate: event,
		});
	};

	const updateHashTag = hashTagList => {
		dispatchModalState({
			type: "updateHashTags",
			hashTags: hashTagList,
		});
	};

	const reset = () => {
		handleClose();
		dispatchModalState({
			type: "reset",
		});
	};

	const sendData = () => {
		console.log(modalState);
	};

	return (
		<Modal
			aria-labelledby="createEvent-modal-title"
			aria-describedby="createEvent-modal-description"
			open={open}
			onClose={reset}
		>
			<PopUpLayOutStyle>
				<h1 id="createEvent-modal-title">이벤트만들기</h1>
				<StyledForm>
					<InputEventName dispatch={setEventName} />
					<InputStartDate
						endDate={modalState.endDate}
						startDate={modalState.startDate}
						dispatch={{setStartDate, setEndDate}}
					/>
					<EndDateField endDate={modalState.endDate} />
					<InputHashTag
						hashTags={modalState.hashTags}
						dispatch={updateHashTag}
					/>
					<HashTagsField
						hashTags={modalState.hashTags}
						dispatch={updateHashTag}
					/>
					<ButtonField callBack={sendData} onClose={reset} />
				</StyledForm>
			</PopUpLayOutStyle>
		</Modal>
	);
}

export default CreateEventModal;
