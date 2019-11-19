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
	const [radioState, setRadioState] = useState([1, 0, 0, 0]);
	const handleRadioState = buttonIndex => {
		const newState = [0, 0, 0, 0].map((e, idx) => (idx === buttonIndex ? 1 : 0));

		setRadioState(newState);
	};

	return event ? (
		<ContentStyle>
			<Column type="moderation" />
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
