import React, {useReducer, useContext} from "react";
import styled from "styled-components";
import moment from "moment";
import TabHeader from "../TabHeader";
import InputEventName from "./InputEventName";
import InputStartDate from "./InputStartDate";
import EndDateField from "./EndDateField";
import InputEventCode from "./InputEventCode";
import InputEventLink from "./InputEventLink";
import InputHashTag from "./InputHashTag";
import HashTagsField from "./HashTagsField";
import {generalSettingReducer} from "../../settingReducer/settingReducer";
import ButtonField from "../ButtonField";
import {HostContext} from "../../../../libs/hostContext";
import configLoader from "../../../../config/configLoader";

const config = configLoader();

const PopUpLayOutStyle = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
`;

function convertDataToView(eventInfo) {
	return {
		eventName: eventInfo.eventName,
		startDate: new Date(parseInt(eventInfo.startAt)),
		endDate: moment(new Date(parseInt(eventInfo.endAt))).format(
			"YYYY년 MM월 DD일 HH시 mm분",
		),
		eventCode: eventInfo.eventCode,
		hashTags: [
			{key: "sadfsadf", label: "부스트캠프"},
			{key: "asdfuuu", label: "자바스크립트"},
		],
		eventLink: `${config.url}/${window.btoa(eventInfo.eventCode)}`,
	};
}

export default function GeneralSetting({handleClose}) {
	const {hostInfo, events, setEvents} = useContext(HostContext);
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
		console.log(generalSettingState);
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
			<InputHashTag hashTags={hashTags} dispatch={updateHashTag} />
			<HashTagsField hashTags={hashTags} dispatch={updateHashTag} />
			<ButtonField submit={sendData} onClose={reset} />
		</PopUpLayOutStyle>
	);
}
