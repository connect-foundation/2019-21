import React, {useReducer} from "react";
import styled from "styled-components";
import TabHeader from "../TabHeader";
import InputEventName from "./InputEventName";
import InputStartDate from "./InputStartDate";
import EndDateField from "./EndDateField";
import InputEventCode from "./InputEventCode";
import {
	initialGeneralState,
	generalSettingReducer,
} from "../../settingReducer/settingReducer";

const PopUpLayOutStyle = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
`;

export default function GeneralSetting() {
	console.log("general");
	const [generalSettingState, dispatch] = useReducer(
		generalSettingReducer,
		initialGeneralState,
	);

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

	console.log(generalSettingState);
	// const updateHashTag = hashTagList => {
	// 	dispatch({
	// 		type: "updateHashTags",
	// 		hashTags: hashTagList,
	// 	});
	// };
	return (
		<PopUpLayOutStyle>
			<TabHeader type="general" />
			<InputEventName
				eventName={generalSettingState.eventName}
				dispatch={setEventName}
			/>
			<InputStartDate
				endDate={generalSettingState.endDate}
				startDate={generalSettingState.startDate}
				dispatch={{setStartDate, setEndDate}}
			/>
			<EndDateField endDate={generalSettingState.endDate} />
			<InputEventCode
				eventCode={generalSettingState.eventCode}
				dispatch={setEventCode}
			/>
		</PopUpLayOutStyle>
	);
}
