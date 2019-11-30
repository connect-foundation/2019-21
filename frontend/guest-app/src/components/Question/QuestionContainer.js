import React, {useEffect, useReducer, useRef} from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import QuestionContainerHeader from "./QuestionContainerHeader.js";
import useTabGroup from "../TabGroup/useTabGroup.js";
import QuestionInputArea from "./QuestionInputArea/QuestionInputArea.js";
import QuestionCardList from "./QuestionCardList.js";
import {socketClient, useSocket} from "../../libs/socket.io-Client-wrapper.js";
import QuestionReducer from "./QuestionReducer.js";

const EXCHANGE_RATES = gql`
	{
		questions(eventCode: "u0xn", guestId: 148) {
			content
			id
			likeCount
			isLike
			GuestId
			createdAt
			guestName
			Emojis {
				EmojiName
			}
		}
	}
`;

function QuestionContainer() {
	const {data} = useQuery(EXCHANGE_RATES);
	const [questions, dispatch] = useReducer(QuestionReducer, []);
	const {tabIdx, selectTabIdx} = useTabGroup();
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	useEffect(() => {
		if (data) {
			dispatch({type: "load", data: data.questions});
		}
	}, [data]);

	useSocket("question/create", req => {
		dispatch({type: "addNewQuestion", data: req});
	});

	const onAskQuestion = () => {
		const newQuestion = {
			userName: userNameRef.current.value,
			eventId: 2,
			guestId: 148,
			createdAt: new Date(),
			content: questionRef.current.value,
			isShowEditButton: true,
			isLike: false,
			likeCount: 0,
		};

		socketClient.emit("question/create", newQuestion);
	};

	const onContainerSelectTab = (event, newValue) => {
		if (newValue === 0) {
			dispatch({type: "sortByRecent"});
		}
		if (newValue === 1) {
			dispatch({type: "sortByLikeCount"});
		}

		selectTabIdx(event, newValue);
	};

	return (
		<>
			<QuestionContainerHeader
				questionNumber={questions.length}
				tabIdx={tabIdx}
				onSelectTab={onContainerSelectTab}
			/>
			<QuestionInputArea
				onAskQuestion={onAskQuestion}
				onOpen={() => {}}
				questionRef={questionRef}
				userNameRef={userNameRef}
			/>
			<QuestionCardList questions={questions} />
		</>
	);
}

export default QuestionContainer;
