import React, {useContext} from "react";
import {TitleStyle, TitleBox, RightSide} from "../ComponentsStyle";
import CompleteAllQuestionButton from "../Buttons/CompleteAllQuestionButton";
import TitleBadge from "./TitleBadge";
import {HostContext} from "../../../libs/hostContext";
import titleNameMap from "./titleNameMap";
import ModerationButton from "../Buttons/ModerationButton";

function Title({data, type, state}) {
	const {events} = useContext(HostContext);
	const eventId = events[0].id;

	return (
		<>
			<TitleBox>
				<TitleBadge dataLength={data.questions.length}/>
				<TitleStyle>{titleNameMap[type]}</TitleStyle>
				<RightSide>
					{type === "moderation" && <ModerationButton state={state} eventId={eventId}/>}
					{(type === "newQuestion" || type === "popularQuestion") &&
					<CompleteAllQuestionButton data={data}/>}
				</RightSide>
			</TitleBox>
		</>
	);
}

export default Title;
