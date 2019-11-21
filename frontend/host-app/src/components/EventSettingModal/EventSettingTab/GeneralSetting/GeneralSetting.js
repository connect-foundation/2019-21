import React, {useReducer} from "react";
import styled from "styled-components";
import TabHeader from "../TabHeader";
import InputEventName from "./InputEventName";
import InputStartDate from "./InputStartDate";
import EndDateField from "./EndDateField";
import InputEventCode from "./InputEventCode";
import InputEventLink from "./InputEventLink";
import InputHashTag from "./InputHashTag";
import HashTagsField from "./HashTagsField";
import {
	initialGeneralState,
	generalSettingReducer,
} from "../../settingReducer/settingReducer";
import ButtonField from "../ButtonField";

const PopUpLayOutStyle = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
`;

export default function GeneralSetting({handleClose}) {
	console.log("general");
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
		reset();
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
