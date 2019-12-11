import React, {useReducer, useContext, useState} from "react";
import {Modal} from "@material-ui/core";
import styled from "styled-components";
import moment from "moment";
import InputEventName from "./InputEventName";
import InputStartDate from "./InputStartDate";
import {useMutation} from "@apollo/react-hooks";
import InputHashTag from "./InputHashTag";
import EndDateField from "./EndDateField";
import HashTagsField from "./HashTagsField";
import ButtonField from "./ButtonField";
import AlertSnackbar from "./AlertSnackbar";
import {eventModalReducer} from "./eventModalReducer";
import {createEvent, createHashTags} from "../../libs/gql";
import {HostContext} from "../../libs/hostContext";
import {validEventName, validDate} from "../../libs/eventValidation";

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

function verifyInputData(errorState) {
	const isInValid = Object.values(errorState).some(inputValue => {
		return inputValue;
	});
	return isInValid;
}

function formattingDate(date) {
	return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function CreateEventModal({open, handleClose}) {
	const initErrorState = {
		eventName: true,
		startDate: true,
	};
	const initialEventInfo = {
		eventName: "",
		startDate: new Date(),
		endDate: new Date(),
		hashTags: [],
	};
	const {hostInfo, events, setEvents} = useContext(HostContext);
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [errorState, setErrorState] = useState(initErrorState);
	const [eventInfo, dispatchEventInfo] = useReducer(
		eventModalReducer,
		initialEventInfo,
	);
	const [mutaionEvent, {event}] = useMutation(createEvent(), {
		variables: {
			info: {
				HostId: hostInfo.id,
				startAt: formattingDate(eventInfo.startDate),
				endAt: formattingDate(eventInfo.endDate),
				eventName: eventInfo.eventName,
			},
		},
	});
	const [mutationHashTags, {hashTags}] = useMutation(createHashTags());

	const snackBarHandleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackBarOpen(false);
	};

	const setEventName = event => {
		const isError = validEventName(event.target.value) ? false : true;
		setErrorState({...errorState, eventName: isError});
		dispatchEventInfo({
			type: "setEventName",
			eventName: event.target.value,
		});
	};

	const setStartDate = event => {
		const isError = validDate(event, eventInfo.endDate) ? false : true;
		setErrorState({...errorState, startDate: isError});
		dispatchEventInfo({
			type: "setStartDate",
			startDate: event,
		});
	};

	const setEndDate = event => {
		const isError = validDate(eventInfo.startDate, event) ? false : true;
		setErrorState({...errorState, startDate: isError});
		dispatchEventInfo({
			type: "setEndDate",
			endDate: event,
		});
	};

	const updateHashTag = hashTagList => {
		dispatchEventInfo({
			type: "updateHashTags",
			hashTags: hashTagList,
		});
	};

	const reset = () => {
		dispatchEventInfo({
			type: "reset",
		});
		handleClose();
	};

	const sendData = () => {
		const isInValid = verifyInputData(errorState);
		if (isInValid) {
			setSnackBarOpen(true);
			return;
		}

		mutaionEvent()
			.then(res => {
				setEvents([...events, res.data.createEvent]);
				const hashTagList = eventInfo.hashTags.map(hashTag => {
					return {
						name: hashTag.label,
						EventId: res.data.createEvent.id,
					};
				});
				mutationHashTags({variables: {hashTags: hashTagList}}).catch(
					e => {
						console.log("해쉬태그 생성 실패");
					},
				);
			})
			.catch(e => {
				console.error("이벤트 생성 실패");
			});
		reset();
	};
	console.log(eventInfo.hashTags);
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
					<InputEventName
						errorState={errorState.eventName}
						dispatch={setEventName}
					/>
					<InputStartDate
						errorState={errorState.startDate}
						endDate={eventInfo.endDate}
						startDate={eventInfo.startDate}
						dispatch={{setStartDate, setEndDate}}
					/>
					<EndDateField endDate={eventInfo.endDate} />
					<InputHashTag
						hashTags={eventInfo.hashTags}
						dispatch={updateHashTag}
					/>
					<HashTagsField
						hashTags={eventInfo.hashTags}
						dispatch={updateHashTag}
					/>
					<ButtonField createEvent={sendData} onClose={reset} />
				</StyledForm>
				<AlertSnackbar
					errorState={errorState}
					handleClose={snackBarHandleClose}
					open={snackBarOpen}
				/>
			</PopUpLayOutStyle>
		</Modal>
	);
}

export default CreateEventModal;
