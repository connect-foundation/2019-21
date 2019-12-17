import React, {useState, useContext, useReducer} from "react";
import Column from "./Column";
import useQueryQuestions from "../../libs/useQueryQuestions";
import {HostContext} from "../../libs/hostContext";
import {ContentStyle} from "./ComponentsStyle";
import QuestionsReducer from "../Questions/QuestionReducer";
import SkeletonContent from "../Skeleton/SkeletonContent";
import useQuestionSocketEventHandler from "../EventHandler/useQuestionSocketEventHandler";
import useModerationEventHandler from "../EventHandler/useModerationEventHandler";


function Inner({data, option}) {
	const [moderationState, setModeration] = useState(option.moderationOption);
	const [questions, dispatch] = useReducer(QuestionsReducer, {questions: data});
	const [pollNumberStatus] = useState(0);
	const columnTypes = ["moderation", "newQuestion", "popularQuestion", "completeQuestion"];

	useQuestionSocketEventHandler(dispatch);
	useModerationEventHandler(setModeration);

	return (
		<ContentStyle>
			{columnTypes.map(e => (
				<Column
					type={e}
					state={moderationState}
					data={questions}
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
