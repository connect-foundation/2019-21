import React, {useState, useContext, useReducer} from "react";
import styled from "styled-components";
import Column from "./Column";
import {socketClient, useSocket} from "../libs/socket.io-Client-wrapper";
import useQueryQuestions from "../libs/useQueryQuestions";
import {HostContext} from "../libs/hostContext";
import {makeNewData} from "../libs/utils";
import {ContentStyle} from "./ComponentsStyle"
import QuestionsReducer from "./Questions/QuestionReducer";

function Inner({data, event, option}) {
	const SELECTED = true;
	const UNSELECTED = false;

	const [radioState, setRadioState] = useState([SELECTED, UNSELECTED, UNSELECTED, UNSELECTED]);
	const [moderationState, setModeration] = useState(option.moderationOption);
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
	};

	useSocket("question/create", req => dispatch({type: "addNewQuestion", data: makeNewData(req)}));
	useSocket("question/toggleStar", req => dispatch({type: "toggleStar", data: req}));
	useSocket("question/move", req => dispatch({type: "moveQuestion", data: req}));

	const handleQuestionDatas = (id, from, to) => socketClient.emit("question/move", {id, from, to});

	const handleStar = id => {
		questions.questions.some(e => {
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
				.map(e => (
					<Column
						type={e}
						state={typeMap[e].state}
						stateHandler={typeMap[e].stateHandler}
						data={questions}
						dataHandler={handleQuestionDatas}
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
