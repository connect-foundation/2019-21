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

const modalHeight = 37;
const modalWidth = 28.125;
const PopUpLayOutStyle = styled.div`
	position: relative;
	top: calc(50% - ${modalHeight / 2}rem);
	left: calc(50% - ${modalWidth / 2}rem);
	display: flex;
	flex-direction: column;
	width: ${modalWidth}rem;
	height: ${modalHeight}rem;
	background-color: white;
	padding-left: 1.25rem;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 85%;
`;

const Header = styled.div`
	margin-left: 0;
	margin-top: 2rem;
	font-size: 2rem;
	color: #139ffb;
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
		reset();
	};

	return (
		<Modal
			aria-labelledby="createEvent-modal-title"
			aria-describedby="createEvent-modal-description"
			open={open}
			onClose={reset}
		>
			<PopUpLayOutStyle>
				<Header id="createEvent-modal-title">이벤트만들기</Header>
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
					<ButtonField createEvent={sendData} onClose={reset} />
				</StyledForm>
			</PopUpLayOutStyle>
		</Modal>
	);
}

export default CreateEventModal;
