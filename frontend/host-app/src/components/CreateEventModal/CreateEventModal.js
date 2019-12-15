import React, {useContext, useReducer, useState} from "react";
import styled from "styled-components";
import moment from "moment";
import {useMutation} from "@apollo/react-hooks";
import InputEventName from "./InputEventName";
import InputStartDate from "./InputStartDate";
import InputHashTag from "./InputHashTag";
import EndDateField from "./EndDateField";
import HashTagsField from "./HashTagsField";
import CreateModalButtonField from "./ButtonField";
import AlertSnackbar from "./AlertSnackbar";
import eventModalReducer from "../../reducers/eventModalReducer.js";
import {
	createEventMutationScheme,
	createHashTagsMutationScheme,
} from "../../libs/gql";
import {HostContext} from "../../libs/hostContext";
import {validDate, validEventName} from "../../libs/eventValidation";
import CreateEventModalStyle from "./CreateEventModalStyle.js";
import CreateEventModalContent from "./CreateEventModalContent.js";
import CreateModalHeader from "./CreateModalHeaderStyle.js";

const CreateModalBody = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 75%;
`;

function verifyInputData(errorState) {
	return Object.values(errorState).some(inputValue => inputValue);
}

function formattingDate(date) {
	return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

const initErrorState = {
	eventName: true,
	startDate: true,
};

function CreateEventModal({open, handleClose}) {
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
	const [mutationEvent, {event}] = useMutation(createEventMutationScheme, {
		variables: {
			info: {
				HostId: hostInfo.id,
				startAt: formattingDate(eventInfo.startDate),
				endAt: formattingDate(eventInfo.endDate),
				eventName: eventInfo.eventName,
			},
		},
	});
	const [mutationHashTags, {hashTags}] = useMutation(
		createHashTagsMutationScheme,
	);

	const snackBarHandleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackBarOpen(false);
	};

	const setEventName = event => {
		const isError = !validEventName(event.target.value);

		setErrorState({...errorState, eventName: isError});
		dispatchEventInfo({
			type: "setEventName",
			eventName: event.target.value,
		});
	};

	const setStartDate = event => {
		const isError = !validDate(event, eventInfo.endDate);

		setErrorState({...errorState, startDate: isError});
		dispatchEventInfo({
			type: "setStartDate",
			startDate: event,
		});
	};

	const setEndDate = event => {
		const isError = !validDate(eventInfo.startDate, event);

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

		mutationEvent()
			.then(res => {
				const hashTagList = eventInfo.hashTags.map(hashTag => ({
					name: hashTag.label,
					EventId: res.data.createEvent.id,
				}));

				mutationHashTags({variables: {hashTags: hashTagList}}).catch(
					e => {
						console.log("해쉬태그 생성 실패");
					},
				);
				Object.assign(res.data.createEvent, {HashTags: hashTagList});
				setEvents([...events, res.data.createEvent]);
			})
			.catch(e => {
				console.error("이벤트 생성 실패");
			});
		reset();
	};

	return (
		<CreateEventModalStyle open={open} onClose={reset}>
			<CreateEventModalContent>
				<CreateModalHeader />
				<CreateModalBody>
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
				</CreateModalBody>
				<CreateModalButtonField onConfirm={sendData} onClose={reset} />
				<AlertSnackbar
					errorState={errorState}
					handleClose={snackBarHandleClose}
					open={snackBarOpen}
				/>
			</CreateEventModalContent>
		</CreateEventModalStyle>
	);
}

export default CreateEventModal;
