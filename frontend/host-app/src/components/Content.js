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

const filterQuestion = option => DummyData().filter(e => e.status === option);

function Content({event}) {
	const SELECTED = true;
	const UNSELECTED = false;
	const MODERATION_ON = true;
	const MODERATION_OFF = false;
	const [radioState, setRadioState] = useState([SELECTED, UNSELECTED, UNSELECTED, UNSELECTED]);
	const [moderationState, setModeration] = useState(MODERATION_OFF);
	const [questionNumberStatus] = useState([4, 3, 2, 1]);
	const [pollNumberStatus] = useState(5);

	const [modeartionDatas, setModerationDatas] = useState({questions: filterQuestion("moderation")});
	const [newQuestionDatas, setNewQuestionDatas] = useState({questions: filterQuestion("newQuestion")});
	const [popQuestionDatas, setPopQuestionDatas] = useState({questions: filterQuestion("popularQuestion")});
	const [completeQuestionDatas, setCompleteQuestionDatas] = useState({questions: filterQuestion("completeQuestion")});

	const handleRadioState = buttonIndex => {
		const newState = [UNSELECTED, UNSELECTED, UNSELECTED, UNSELECTED]
			.map((_, idx) => (idx === buttonIndex ? SELECTED : UNSELECTED));

		setRadioState(newState);
	};

	const handleModerationState = () => {
		moderationState === MODERATION_ON ? setModeration(MODERATION_OFF) : setModeration(MODERATION_ON);
	};

	const typeMap = {
		moderation: {
			state: moderationState,
			stateHandler: handleModerationState,
			data: modeartionDatas,
			handler: setModerationDatas,
		},
		newQuestion: {
			state: radioState,
			stateHandler: handleRadioState,
			data: newQuestionDatas,
			handler: setNewQuestionDatas,
		},
		popularQuestion: {
			state: radioState,
			stateHandler: handleRadioState,
			data: popQuestionDatas,
			handler: setPopQuestionDatas,
		},
		completeQuestion: {
			state: radioState,
			stateHandler: handleRadioState,
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

	const handleQuestionDatas = (id, from, to) => {
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

	const handleStar = (id, type) => {
		const targetObject = typeMap[type];

		targetObject.handler({
			questions: targetObject.data.questions
				.map(e => {
					if (e.id === id) { e.isStared = !e.isStared; }
					return e;
				}),
		});
	};

	return event ? (
		<ContentStyle>
			{Object.keys(typeMap).splice(0, Object.keys(typeMap).length - 1)
				.map(e => (<Column
					type={e}
					state={typeMap[e].state}
					stateHandler={typeMap[e].stateHandler}
					data={typeMap[e].data}
					badgeState={questionNumberStatus}
					dataHandler={handleQuestionDatas}
					handleStar={handleStar}
				/>))}
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
