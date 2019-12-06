import React, {useReducer} from "react";
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import TypeTitle from "./TypeTitle";
import TabHeader from "../TabHeader";
import ButtonField from "../ButtonField";
import SettingSwitch from "./SettingSwitch";
import {
	initialAdavanceState,
	advanceSettingReducer,
} from "../../settingReducer/settingReducer";

const LayOutStyle = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
`;

export default function AdvanceSetting({handleClose}) {
	const [advanceSettingState, dispatch] = useReducer(
		advanceSettingReducer,
		initialAdavanceState,
	);

	const {
		allowReply,
		anonymousReply,
		closeQuestion,
		showPollsNum,
		showRate,
	} = advanceSettingState;

	const setAlloReply = event => {
		dispatch({
			type: "setAlloReply",
			allowReply: event.target.checked,
		});
	};

	const setAnonymousReply = event => {
		dispatch({
			type: "setAnonymousReply",
			anonymousReply: event.target.checked,
		});
	};

	const setCloseQuestion = event => {
		dispatch({
			type: "setCloseQuestion",
			closeQuestion: event.target.checked,
		});
	};

	const setShowPollsNum = event => {
		dispatch({
			type: "setShowPollsNum",
			showPollsNum: event.target.checked,
		});
	};

	const setShowRate = event => {
		dispatch({
			type: "setShowRate",
			showRate: event.target.checked,
		});
	};

	const reset = () => {
		handleClose();
		dispatch({
			type: "reset",
		});
	};

	const sendData = () => {
		console.log(advanceSettingState);
		reset();
	};

	return (
		<LayOutStyle>
			<TabHeader type="feature" />
			<TypeTitle type="question">질문</TypeTitle>
			<SettingSwitch state={allowReply} dispatch={setAlloReply}>
				<Typography>참여자 댓글</Typography>
			</SettingSwitch>
			<SettingSwitch state={anonymousReply} dispatch={setAnonymousReply}>
				<Typography>익명댓글 허용</Typography>
			</SettingSwitch>
			<SettingSwitch state={closeQuestion} dispatch={setCloseQuestion}>
				<Typography>질문닫기</Typography>
			</SettingSwitch>
			<TypeTitle type="poll">투표</TypeTitle>
			<SettingSwitch state={showPollsNum} dispatch={setShowPollsNum}>
				<Typography>투표수 보기</Typography>
			</SettingSwitch>
			<SettingSwitch state={showRate} dispatch={setShowRate}>
				<Typography>퍼센트로 표시</Typography>
			</SettingSwitch>
			<ButtonField submit={sendData} onClose={reset} />
		</LayOutStyle>
	);
}
