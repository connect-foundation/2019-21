import React, {useReducer} from "react";
import styled from "styled-components";
import TypeTitle from "./TypeTitle";
import TabHeader from "../TabHeader";
import {
	initialAdavanceState,
	advanceSettingReducer,
} from "../../settingReducer/settingReducer";

const LayOutStyle = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
`;

export default function AdvanceSetting() {
	const [advanceSettingState, dispatch] = useReducer(
		advanceSettingReducer,
		initialAdavanceState,
	);

	console.log(advanceSettingState, dispatch);

	// const {
	// 	allowReply,
	// 	anonymousReply,
	// 	closeQuestion,
	// 	showPollsNum,
	// 	showRate,
	// } = generalSettingState;

	// const setAlloReply = event => {
	// 	dispatch({
	// 		type: "setAlloReply",
	// 		eventName: event.target.value,
	// 	});
	// };

	// const setAnonymousReply = event => {
	// 	dispatch({
	// 		type: "setAnonymousReply",
	// 		startDate: event,
	// 	});
	// };

	// const setCloseQuestion = event => {
	// 	dispatch({
	// 		type: "setCloseQuestion",
	// 		endDate: event,
	// 	});
	// };

	// const setShowPollsNum = event => {
	// 	dispatch({
	// 		type: "setShowPollsNum",
	// 		eventCode: event.target.value,
	// 	});
	// };

	// const setShowRate = event => {
	// 	dispatch({
	// 		type: "setShowRate",
	// 		eventCode: event.target.value,
	// 	});
	// };

	// const reset = () => {
	// 	handleClose();
	// 	dispatch({
	// 		type: "reset",
	// 	});
	// };

	return (
		<LayOutStyle>
			<TabHeader type="feature" />
			<TypeTitle>질문</TypeTitle>
		</LayOutStyle>
	);
}
