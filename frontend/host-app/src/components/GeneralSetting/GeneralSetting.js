import React, {useContext, useReducer} from "react";
import styled from "styled-components";
import uuidv1 from "uuid/v1";
import {useMutation} from "@apollo/react-hooks";
import TabHeader from "../EventSettingTab/TabHeader.js";
import InputEventName from "./InputEventName.js";
import InputStartDate from "./InputStartDate.js";
import EndDateField from "./EndDateField.js";
import InputEventCode from "./InputEventCode.js";
import InputEventLink from "./InputEventLink.js";
import InputHashTag from "./InputHashTag.js";
import HashTagsField from "./HashTagsField.js";
import {generalSettingReducer} from "../../reducers/settingReducer.js";
import ButtonField from "../EventSettingTab/ButtonField.js";
import {HostContext} from "../../libs/hostContext.js";
import config from "../../config";
import {updateEventMutationScheme} from "../../libs/gql.js";

const PopUpLayOutStyle = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
`;

function convertDataToView(eventInfo) {
	let eventHashTags = [];

	if (eventInfo.HashTags) {
		eventHashTags = eventInfo.HashTags.map(hashtag => ({key: uuidv1(), label: hashtag.name}));
	}
	return {
		eventName: eventInfo.eventName,
		startDate: new Date(parseInt(eventInfo.startAt, 10)),
		endDate: new Date(parseInt(eventInfo.endAt, 10)),
		eventCode: eventInfo.eventCode,
		hashTags: eventHashTags,
		eventLink: `${config.url}/${window.btoa(eventInfo.eventCode)}`,
	};
}

// todo propTypes, defaultprop 추가
export default function GeneralSetting({handleClose}) {
	// todo 오타
	const [mutaionUpdateEvent] = useMutation(updateEventMutationScheme);
	const {events, setEvents} = useContext(HostContext);
	// todo 하드 코딩되어있음
	const initialGeneralState = convertDataToView(events[0]);
	// todo useGeneralSettingReducer로  함수 분리 가능
	const [generalSettingState, dispatch] = useReducer(
		generalSettingReducer,
		initialGeneralState,
	);

	const {
		eventName,
		startDate,
		endDate,
		hashTags,
		eventLink,
		eventCode,
	} = generalSettingState;

	const setEventName = event => {
		dispatch({
			type: "updateEventName",
			eventName: event.target.value,
		});
	};

	const setStartDate = event => {
		dispatch({
			type: "updateStartDate",
			startDate: event,
		});
	};

	const setEndDate = event => {
		dispatch({
			type: "updateEndDate",
			endDate: event,
		});
	};

	const setEventCode = event => {
		dispatch({
			type: "updateEventCode",
			eventCode: event.target.value,
		});
	};

	const reset = () => {
		handleClose();
		dispatch({
			type: "reset",
		});
	};

	const sendData = () => {
		mutaionUpdateEvent({
			variables: {
				event: {
					eventName: generalSettingState.eventName,
					startAt: generalSettingState.startDate,
					endAt: generalSettingState.endDate,
					EventId: events[0].id,
				},
			},
		}).then(res => {
			Object.assign(events[0], res.data.updateEvent);
			setEvents([...events]);
		});

		handleClose();
	};

	const updateHashTag = hashTagList => {
		dispatch({
			type: "updateHashTags",
			hashTags: hashTagList,
		});
	};

	return (
		<PopUpLayOutStyle>
			<TabHeader type="general"/>
			<InputEventName eventName={eventName} dispatch={setEventName}/>
			<InputStartDate
				endDate={endDate}
				startDate={startDate}
				dispatch={{setStartDate, setEndDate}}
			/>
			<EndDateField endDate={endDate}/>
			<InputEventCode eventCode={eventCode} dispatch={setEventCode}/>
			<InputEventLink eventLink={eventLink}/>
			<InputHashTag hashTags={hashTags} dispatch={updateHashTag}/>
			<HashTagsField hashTags={hashTags} dispatch={updateHashTag}/>
			<ButtonField submit={sendData} onClose={reset}/>
		</PopUpLayOutStyle>
	);
}
