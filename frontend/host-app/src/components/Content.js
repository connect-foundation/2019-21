import React, {useState} from "react";
import styled from "styled-components";
import Column from "./Column";
import EmptyContent from "./EmptyContent";

const ContentStyle = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	overflow: auto;
	justify-content: center;
	align-items: center;
	padding: 4px 8px;
`;

function Content({event}) {
	const SELECTED = 1;
	const UNSELECTED = 0;
	const MODERATION_ON = true;
	const MODERATION_OFF = false;
	const [radioState, setRadioState] = useState([SELECTED, UNSELECTED, UNSELECTED, UNSELECTED]);
	const [moderationState, setModeration] = useState(MODERATION_OFF);

	const handleRadioState = buttonIndex => {
		const newState = [0, 0, 0, 0].map((e, idx) => (idx === buttonIndex ? SELECTED : UNSELECTED));

		setRadioState(newState);
	};

	const handleModerationState = () => {
		moderationState === MODERATION_ON ? setModeration(MODERATION_OFF) : setModeration(MODERATION_ON);
	};

	return event ? (
		<ContentStyle>
			<Column type="moderation" state={moderationState} stateHandler={handleModerationState}/>
			<Column type="newQuestion" state={radioState} stateHandler={handleRadioState}/>
			<Column type="popularQuestion" state={radioState} stateHandler={handleRadioState}/>
			<Column type="completeQuestion" state={radioState} stateHandler={handleRadioState}/>
			<Column type="poll" state={radioState} stateHandler={handleRadioState}/>
		</ContentStyle>
	) : (
		<ContentStyle>
			<EmptyContent/>
		</ContentStyle>
	);
}

export default Content;
