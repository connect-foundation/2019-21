import React, {useReducer, useContext} from "react";
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
import {eventModalReducer, initialEventInfo} from "./eventModalReducer";
import {createEvent} from "../../libs/gql";
import {HostContext} from "../../libs/hostContext";

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

function formattingDate(date) {
	return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function CreateEventModal({open, handleClose}) {
	const {hostInfo, events, setEvents} = useContext(HostContext);
	const [eventInfo, dispatchEventInfo] = useReducer(
		eventModalReducer,
		initialEventInfo,
	);
	const [sendToServer, {data}] = useMutation(createEvent(), {
		variables: {
			info: {
				HostId: hostInfo.id,
				startAt: formattingDate(eventInfo.startDate),
				endAt: formattingDate(eventInfo.endDate),
			},
		},
	});

	const setEventName = event => {
		dispatchEventInfo({
			type: "setEventName",
			eventName: event.target.value,
		});
	};

	const setStartDate = event => {
		dispatchEventInfo({
			type: "setStartDate",
			startDate: event,
		});
	};

	const setEndDate = event => {
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
		handleClose();
		dispatchEventInfo({
			type: "reset",
		});
	};

	const sendData = () => {
		sendToServer().then(res => {
			setEvents([...events, res.data.createEvent]);
		});
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
			</PopUpLayOutStyle>
		</Modal>
	);
}

export default CreateEventModal;
