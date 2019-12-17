import React, {useContext} from "react";
import Switch from "@material-ui/core/Switch";
import {TitleStyle, TitleBox, RightSide} from "../ComponentsStyle";
import CompleteAllQuestionButton from "../Buttons/CompleteAllQuestionButton";
import TitleBadge from "./TitleBadge";
import {HostContext} from "../../../libs/hostContext";
import {socketClient} from "../../../libs/socket.io-Client-wrapper";
import titleNameMap from "./titleNameMap";


function Title({data, dataHandler, type, state}) {

	const {events} = useContext(HostContext);
	const eventId = events[0].id;

	const moderationEventEmit = () =>
		socketClient.emit("moderation/toggle", {eventId, state: !state});

	return (
		<>
			<TitleBox>
				<TitleBadge data={data}/>
				<TitleStyle>{titleNameMap[type]}</TitleStyle>
				<RightSide>
					{type === "moderation" &&
					<Switch checked={state} onClick={() => moderationEventEmit()}/>}
					{(type === "newQuestion" || type === "popularQuestion") &&
					<CompleteAllQuestionButton dataHandler={dataHandler}/>}
				</RightSide>
			</TitleBox>
		</>
	);
}

export default Title;
