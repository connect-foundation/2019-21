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

	const [modeartionDatas, setModerationDatas] = useState({questions: DummyData()
		.filter(e => e.status === "moderation")});
	const [newQuestionDatas, setNewQuestionDatas] = useState({questions: DummyData()
		.filter(e => e.status === "newQuestion")});
	const [popQuestionDatas, setPopQuestionDatas] = useState({questions: DummyData()
		.filter(e => e.status === "popularQuestion")});
	const [completeQuestionDatas, setCompleteQuestionDatas] = useState({questions: DummyData()
		.filter(e => e.status === "completeQuestion")});

	const handleRadioState = buttonIndex => {
		const newState = [0, 0, 0, 0].map((e, idx) => (idx === buttonIndex ? SELECTED : UNSELECTED));

		setRadioState(newState);
	};

	const handleModerationState = () => {
		moderationState === MODERATION_ON ? setModeration(MODERATION_OFF) : setModeration(MODERATION_ON);
	};


	const handleQuestionDatas = (id, from, to) => {
		const typeMap = {
			moderation: {
				data: modeartionDatas,
				handler: setModerationDatas,
			},
			newQuestion: {
				data: newQuestionDatas,
				handler: setNewQuestionDatas,
			},
			popularQuestion: {
				data: popQuestionDatas,
				handler: setPopQuestionDatas,
			},
			completeQuestion: {
				data: completeQuestionDatas,
				handler: setCompleteQuestionDatas,
			},
			deleted: {
				data: {
					questions: [],
				},
				handler: e => typeMap.deleted.data.questions.push(e),
			},
		};

		const fromObject = typeMap[from];
		const toObject = typeMap[to];

		if (id === "all") {
			fromObject.handler({questions: []});
			return toObject.handler({questions: [...toObject.data.questions, ...fromObject.data.questions]});
		}

		fromObject.handler({questions: fromObject.data.questions.filter(e => e.id !== id)});
		return toObject.handler({questions: [
			...toObject.data.questions, fromObject.data.questions
				.find(e => e.id === id),
		]});
	};

	return event ? (
		<ContentStyle>
			<Column
				type="moderation"
				state={moderationState}
				stateHandler={handleModerationState}
				badgeState={questionNumberStatus}
				data={modeartionDatas}
				dataHandler={handleQuestionDatas}
			/>
			<Column
				type="newQuestion"
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={questionNumberStatus}
				data={newQuestionDatas}
				dataHandler={handleQuestionDatas}
			/>
			<Column
				type="popularQuestion"
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={questionNumberStatus}
				data={popQuestionDatas}
				dataHandler={handleQuestionDatas}
			/>
			<Column
				type="completeQuestion"
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={questionNumberStatus}
				data={completeQuestionDatas}
				dataHandler={handleQuestionDatas}
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
