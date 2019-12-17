import React, {useState, useContext, useReducer} from "react";
import Column from "./Column";
import {socketClient} from "../../libs/socket.io-Client-wrapper";
import useQueryQuestions from "../../libs/useQueryQuestions";
import {HostContext} from "../../libs/hostContext";
import {ContentStyle} from "./ComponentsStyle";
import QuestionsReducer from "../Questions/QuestionReducer";
import SkeletonContent from "../Skeleton/SkeletonContent";
import useSocketHandler from "./useQuestionSocketEventHandler";


function Inner({data, event, option}) {
	const [moderationState, setModeration] = useState(option.moderationOption);
	const [questions, dispatch] = useReducer(QuestionsReducer, {questions: data});
	const [pollNumberStatus] = useState(0);

	const typeMap = {
		moderation: {state: moderationState, stateHandler: setModeration},
		newQuestion: {},
		popularQuestion: {},
		completeQuestion: {},
	};

	useSocketHandler(dispatch);

	const handleQuestionDatas = (id, from, to) => {
		const questionData = questions.questions.find(e => e.id === id);

		socketClient.emit("question/move", {id, from, to, data: questionData});
	};

	const handleStar = id => {
		const toggleMsg = questions.questions.reduce((acc, e) => {
			if (e.isStared) { acc.from.push({id: e.id, isStared: !e.isStared}); }
			if (e.id === id) { acc.to.push({id: e.id, isStared: !e.isStared}); }
			return acc;
		}, {from: [], to: []});

		socketClient.emit("question/toggleStar", toggleMsg);
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
				badgeState={pollNumberStatus}
				data={{questions: []}}
			/>
		</ContentStyle>
	);
}

function EventDashboard({event}) {
	const {events} = useContext(HostContext);
	const {loading, error, data} = useQueryQuestions({
		variables: {EventId: events[0].id},
	});

	if (loading) return <SkeletonContent/>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<Inner data={data.newData} event={event} option={data.newOption} />
		</>
	);
}

export default EventDashboard;
