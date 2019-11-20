import React, {useState} from "react";
import styled from "styled-components";
import Column from "./Column";
import EmptyContent from "./EmptyContent";
import DummyData from "./Questions/QuestionDummyData";

const ContentStyle = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	overflow: auto;
	justify-content: left;
	align-items: center;
	padding: 4px 8px;
	overflow-x: auto;
	flex-wrap: nowrap;
`;

function Content({event}) {
	const SELECTED = 1;
	const UNSELECTED = 0;
	const MODERATION_ON = true;
	const MODERATION_OFF = false;
	const [radioState, setRadioState] = useState([SELECTED, UNSELECTED, UNSELECTED, UNSELECTED]);
	const [moderationState, setModeration] = useState(MODERATION_OFF);
	const [questionNumberStatus] = useState([4, 3, 2, 1]);
	const [pollNumberStatus] = useState(5);

	const [modeartionDatas] = useState({questions: DummyData()
		.filter(e => e.status === "moderation")});
	const [newQuestionDatas] = useState({questions: DummyData()
		.filter(e => e.status === "newQuestion")});
	const [popQuestionDatas] = useState({questions: DummyData()
		.filter(e => e.status === "popularQuestion")});
	const [completeQuestionDatas] = useState({questions: DummyData()
		.filter(e => e.status === "completeQuestion")});

	const handleRadioState = buttonIndex => {
		const newState = [0, 0, 0, 0].map((e, idx) => (idx === buttonIndex ? SELECTED : UNSELECTED));

		setRadioState(newState);
	};

	const handleModerationState = () => {
		moderationState === MODERATION_ON ? setModeration(MODERATION_OFF) : setModeration(MODERATION_ON);
	};

	return event ? (
		<ContentStyle>
			<Column
				type="moderation"
				state={moderationState}
				stateHandler={handleModerationState}
				badgeState={questionNumberStatus}
				data={modeartionDatas}
			/>
			<Column
				type="newQuestion"
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={questionNumberStatus}
				data={newQuestionDatas}
			/>
			<Column
				type="popularQuestion"
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={questionNumberStatus}
				data={popQuestionDatas}
			/>
			<Column
				type="completeQuestion"
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={questionNumberStatus}
				data={completeQuestionDatas}
			/>
			<Column
				type="poll"
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={pollNumberStatus}
			/>
		</ContentStyle>
	) : (
		<ContentStyle>
			<EmptyContent/>
		</ContentStyle>
	);
}

export default Content;
