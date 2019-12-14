import React, {useContext, useReducer, useState} from "react";
import Column from "./Column.js";
import {socketClient} from "../../libs/socket.io-Client-wrapper.js";
import useQueryQuestions from "../../libs/useQueryQuestions.js";
import {HostContext} from "../../libs/hostContext.js";
import {ContentStyle} from "../StyledComponent/ComponentsStyle.js";
import QuestionsReducer from "../Questions/QuestionReducer.js";
import SkeletonContent from "../Skeleton/SkeletonContent.js";
import useQuestionSocketEventHandler from "../../customhook/useQuestionSocketEventHandler.js";
import PollColumn from "./PollColumn/PollColumn.js";
import useRadioState from "./useRadioState.js";

function Inner({data, event, option}) {
	const {radioState, handleRadioState} = useRadioState();
	const [moderationState, setModeration] = useState(option.moderationOption);
	const [questions, dispatch] = useReducer(QuestionsReducer, {
		questions: data,
	});
	const [pollNumberStatus] = useState(0);

	const typeMap = {
		moderation: {state: moderationState, stateHandler: setModeration},
		newQuestion: {state: radioState, stateHandler: handleRadioState},
		popularQuestion: {state: radioState, stateHandler: handleRadioState},
		completeQuestion: {state: radioState, stateHandler: handleRadioState},
	};

	useQuestionSocketEventHandler(dispatch);

	const handleQuestionDatas = (id, from, to) => {
		const questionData = questions.questions.find(e => e.id === id);

		socketClient.emit("question/move", {id, from, to, data: questionData});
	};

	const handleStar = id => {
		const toggleMsg = questions.questions.reduce(
			(acc, e) => {
				if (e.isStared) {
					acc.from.push({id: e.id, isStared: !e.isStared});
				}
				if (e.id === id) {
					acc.to.push({id: e.id, isStared: !e.isStared});
				}
				return acc;
			},
			{from: [], to: []},
		);

		socketClient.emit("question/toggleStar", toggleMsg);
	};

	return (
		<ContentStyle>
			{Object.keys(typeMap).map(e => (
				<Column
					type={e}
					state={typeMap[e].state}
					stateHandler={typeMap[e].stateHandler}
					data={questions}
					dataHandler={handleQuestionDatas}
					handleStar={handleStar}
				/>
			))}
			<PollColumn
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={pollNumberStatus}
				data={{questions: []}}
			/>
		</ContentStyle>
	);
}

function EventMonitor({event}) {
	const {events} = useContext(HostContext);
	const {loading, error, data} = useQueryQuestions({
		variables: {EventId: events[0].id},
	});

	if (loading) return <SkeletonContent />;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<Inner data={data.newData} event={event} option={data.newOption} />
		</>
	);
}

export default EventMonitor;
