import React, {useReducer, useContext} from "react";
import styled from "styled-components";
import uuidv1 from "uuid/v1";
import {useMutation} from "@apollo/react-hooks";
import TabHeader from "../TabHeader";
import InputEventName from "./InputEventName";
import InputStartDate from "./InputStartDate";
import EndDateField from "./EndDateField";
import InputEventCode from "./InputEventCode";
import InputEventLink from "./InputEventLink";
import HashTagsField from "./HashTagsField";
import {generalSettingReducer} from "../../settingReducer/settingReducer";
import ButtonField from "../ButtonField";
import {HostContext} from "../../../../libs/hostContext";
import config from "../../../../config";
import {updateEvent} from "../../../../libs/gql";

const PopUpLayOutStyle = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
`;

function convertDataToView(eventInfo) {
	let eventHashTags = [];

	if (eventInfo.HashTags) {
		eventHashTags = eventInfo.HashTags.map(hashtag => ({
			key: uuidv1(),
			label: hashtag.name,
		}));
	}
	return {
		eventName: eventInfo.eventName,
		startDate: new Date(parseInt(eventInfo.startAt)),
		endDate: new Date(parseInt(eventInfo.endAt)),
		eventCode: eventInfo.eventCode,
		hashTags: eventHashTags,
		eventLink: `${config.url}/${window.btoa(eventInfo.eventCode)}`,
	};
}

export default function GeneralSetting({handleClose}) {
	const [mutaionUpdateEvent, {updatedEvent}] = useMutation(updateEvent());
	const {hostInfo, events, setEvents, allEvents} = useContext(HostContext);
	const initialGeneralState = convertDataToView(events[0]);
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
			setEvents([...allEvents]);
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
			<TabHeader type="general" />
			<InputEventName eventName={eventName} dispatch={setEventName} />
			<InputStartDate
				endDate={endDate}
				startDate={startDate}
				dispatch={{setStartDate, setEndDate}}
			/>
			<EndDateField endDate={endDate} />
			<InputEventCode eventCode={eventCode} dispatch={setEventCode} />
			<InputEventLink eventLink={eventLink} />
			<HashTagsField hashTags={hashTags} dispatch={updateHashTag} />
			<ButtonField submit={sendData} onClose={reset} />
		</PopUpLayOutStyle>
	);
}
