import React, {useState, useContext, useReducer} from "react";
import styled from "styled-components";
import Column from "./Column";
import {socketClient, useSocket} from "../libs/socket.io-Client-wrapper";
import useQueryQuestions from "../libs/useQueryQuestions";
import {HostContext} from "../libs/hostContext";
import {makeNewData} from "../libs/utils";
import QuestionsReducer from "./Questions/QuestionReducer";

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

function Inner({data, event, option}) {
	const SELECTED = true;
	const UNSELECTED = false;

	const [radioState, setRadioState] = useState([SELECTED, UNSELECTED, UNSELECTED, UNSELECTED]);
	const [moderationState, setModeration] = useState(option.moderationOption);
	//const [questions, setQuestions] = useState({questions: data});
	const [questions, dispatch] = useReducer(QuestionsReducer, {questions: data});
	const [pollNumberStatus] = useState(0);

	const handleRadioState = buttonIndex => {
		const newState = [UNSELECTED, UNSELECTED, UNSELECTED, UNSELECTED]
			.map((_, idx) => (idx === buttonIndex ? SELECTED : UNSELECTED));

		setRadioState(newState);
	};

	const typeMap = {
		moderation: {state: moderationState, stateHandler: setModeration},
		newQuestion: {state: radioState, stateHandler: handleRadioState},
		popularQuestion: {state: radioState, stateHandler: handleRadioState},
		completeQuestion: {state: radioState, stateHandler: handleRadioState},
		deleted: {data: {questions: []}, handler: e => typeMap.deleted.data.questions.push(e)},
	};

	useSocket("question/create", req => {
		const newData = makeNewData(req);

		dispatch({type: "addNewQuestion", data: newData});
	});

	useSocket("question/toggleStar", req => {
		const targetColumn = typeMap[req.state];
		const newData = targetColumn.data.questions.map(e =>
			(e.id === req.id ? req : e),
		);

		targetColumn.handler({questions: [...newData]});
	});

	useSocket("question/move", req => {
		const fromObject = typeMap[req.from];
		const toObject = typeMap[req.to];

		if (req.id === "all") {
			const newCompleteData = [...toObject.data.questions, ...fromObject.data.questions];

			fromObject.handler({questions: []});
			toObject.handler({questions: newCompleteData});
			return 0;
		}

		fromObject.handler({
			questions: fromObject.data.questions.filter(e => e.id !== req.id),
		});
		toObject.handler({
			questions: [...toObject.data.questions, fromObject.data.questions.find(e => e.id === req.id)],
		});
		return 0;
	});

	const handleQuestionDatas = (id, from, to) =>
		socketClient.emit("question/move", {id, from, to});

	const handleStar = (id, type) => {
		const targetObject = typeMap[type];

		targetObject.data.questions.some(e => {
			if (e.id === id) {
				e.isStared = !e.isStared;
				socketClient.emit("question/toggleStar", e);
				return true;
			}
			return false;
		});
	};

	return (
		<ContentStyle>
			{Object.keys(typeMap)
				.splice(0, Object.keys(typeMap).length - 2)
				.map(e => (
					<Column
						type={e}
						state={typeMap[e].state}
						stateHandler={typeMap[e].stateHandler}
						data={questions}
						dataHandler={dispatch}
						handleStar={handleStar}
					/>
				))}
			<Column
				type="poll"
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={pollNumberStatus}
				data={{questions: []}}
			/>
		</ContentStyle>
	);
}

function Content({event}) {
	const {events} = useContext(HostContext);
	const {loading, error, data} = useQueryQuestions({
		variables: {EventId: events[0].id},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<Inner data={data.newData.splice(0,10)} event={event} option={data.newOption} />
		</>
	);
}

export default Content;
