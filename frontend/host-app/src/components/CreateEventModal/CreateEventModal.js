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
import AlertSnackbar from "./AlertSnackbar";
import {eventModalReducer} from "./eventModalReducer";
import {createEvent, createHashTags} from "../../libs/gql";
import {HostContext} from "../../libs/hostContext";
import useSnackBar from "../../customhook/useSnackBar";

const modalHeight = 38; // 37;
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
	// padding-left: 1.25rem;
	padding: 0 1.5rem;
	box-sizing: border-box;
	border-radius: 15px;
	outline: none;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 75%;
`;

const Header = styled.div`
	margin: 1rem 0 0.5rem 0;
	font-size: 2rem;
	color: #139ffb;
	text-align: center;
`;

const initEndDate = (startTime, lastTime) => {
	const hour = moment(lastTime).format("HH");
	const minuate = moment(lastTime).format("mm");
	let addedTime = moment(startTime)
		.add(hour, "h")
		.toDate();

	addedTime = moment(addedTime)
		.add(minuate, "m")
		.toDate();
	return addedTime;
};

function verifyInputData(errorState) {
	const isInValid = Object.values(errorState).some(inputValue => inputValue);

	return isInValid;
}

function formattingDate(date) {
	return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

function CreateEventModal({open, handleClose}) {
	const {hostInfo, events, setEvents, allEvents} = useContext(HostContext);
	const initialEventInfo = {
		eventName: `${hostInfo.name}님의 이벤트`,
		startDate: new Date(),
		endDate: initEndDate(new Date(), new Date().setHours(1, 0)),
		hashTags: [],
		errorState: {eventName: false, date: false},
	};
	const {snackBarOpen, snackBarHandleClose, setSnackBarOpen} = useSnackBar();
	const [eventInfo, dispatchEventInfo] = useReducer(
		eventModalReducer,
		initialEventInfo,
	);
	const [mutaionEvent, {event}] = useMutation(createEvent());
	const [mutationHashTags, {hashTags}] = useMutation(createHashTags());

	const dispatchHandler = ({type, property, value}) => {
		dispatchEventInfo({
			type,
			property,
			value,
		});
	};

	const sendData = () => {
		const isInValid = verifyInputData(eventInfo.errorState);

		if (isInValid) {
			setSnackBarOpen(true);
			return;
		}

		mutaionEvent({
			variables: {
				info: {
					HostId: hostInfo.id,
					startAt: formattingDate(eventInfo.startDate),
					endAt: formattingDate(eventInfo.endDate),
					eventName: eventInfo.eventName,
				},
			},
		})
			.then(res => {
				const hashTagList = eventInfo.hashTags.map(hashTag => ({
					name: hashTag.label,
					EventId: res.data.createEvent.id,
				}));

				mutationHashTags({variables: {hashTags: hashTagList}}).catch(
					e => {
						console.error(`해쉬태그 생성 Error${e}`);
						alert("해쉬태그 생성 실패");
					},
				);
				Object.assign(res.data.createEvent, {HashTags: hashTagList});
				setEvents([...allEvents, res.data.createEvent]);
				handleClose();
			})
			.catch(e => {
				console.error(`이벤트 생성 Error${e}`);
				alert("이벤트 생성 실패");
			});
	};

	return (
		<Modal
			aria-labelledby="createEvent-modal-title"
			aria-describedby="createEvent-modal-description"
			open={open}
			onClose={handleClose}
		>
			<PopUpLayOutStyle>
				<Header id="createEvent-modal-title">이벤트만들기</Header>
				<StyledForm>
					<InputEventName
						errorState={eventInfo.errorState}
						dispatch={dispatchHandler}
						eventName={eventInfo.eventName}
					/>
					<InputStartDate
						errorState={eventInfo.errorState}
						startDate={eventInfo.startDate}
						endDate={eventInfo.endDate}
						dispatch={dispatchHandler}
					/>
					<EndDateField endDate={eventInfo.endDate} />
					<InputHashTag
						hashTags={eventInfo.hashTags}
						dispatch={dispatchHandler}
					/>
					<HashTagsField
						hashTags={eventInfo.hashTags}
						dispatch={dispatchHandler}
					/>
				</StyledForm>
				<ButtonField createEvent={sendData} onClose={handleClose} />
				<AlertSnackbar
					errorState={eventInfo.errorState}
					handleClose={snackBarHandleClose}
					open={snackBarOpen}
				/>
			</PopUpLayOutStyle>
		</Modal>
	);
}

export default CreateEventModal;
