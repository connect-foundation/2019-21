import React, {useContext} from "react";
import {TitleStyle, TitleBox, RightSide} from "../ComponentsStyle";
import CompleteAllQuestionButton from "../Buttons/CompleteAllQuestionButton";
import TitleBadge from "./TitleBadge";
import {HostContext} from "../../../libs/hostContext";
import titleNameMap from "./titleNameMap";
import ModerationButton from "../Buttons/ModerationButton";

const isActive = type => (type === "newQuestion" || type === "popularQuestion");
const isModeration = type => (type === "moderation");

function Title({data, type, state}) {
	const {events} = useContext(HostContext);
	const eventId = events[0].id;

	return (
		<>
			<TitleBox>
				<TitleBadge dataLength={data.questions.length} type={type}/>
				<TitleStyle>{titleNameMap[type]}</TitleStyle>
				<RightSide>
					{ isModeration(type) && <ModerationButton state={state} eventId={eventId}/>}
					{ isActive(type) && <CompleteAllQuestionButton data={data}/>}
				</RightSide>
			</TitleBox>
		</>
	);
}

export default Title;
