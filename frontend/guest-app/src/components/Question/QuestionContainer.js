import React, {useEffect, useRef} from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import QuestionContainerHeader from "./QuestionContainerHeader.js";
import useTabGroup from "../TabGroup/useTabGroup.js";
import QuestionInputArea from "./QuestionInputArea/QuestionInputArea.js";
import useQuestionCardList from "./useQuestionCardList.js";
import QuestionCardList from "./QuestionCardList.js";
import {socketClient, useSocket} from "../../libs/socket.io-Client-wrapper.js";

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
	const {loading, error, data} = useQuery(EXCHANGE_RATES);
	const {questions, addQuestion, setState} = useQuestionCardList(data);
	const {tabIdx, selectTabIdx} = useTabGroup();
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	useEffect(() => {
		if (data) {
			setState(data.questions);
		}
	}, [data]);

	useSocket("question/create", req => {
		addQuestion(req);
	});

	const onAskQuestion = () => {
		const userName = userNameRef.current.value;
		const question = questionRef.current.value;

		const newQuestion = {
			userName,
			eventId: 2,
			guestId: 148,
			date: new Date(),
			content: question,
			isShowEditButton: true,
			isLike: false,
			likeCount: 0,
		};

		socketClient.emit("question/create", newQuestion);
	};

	if (loading) {
		console.log("loading");
	}
	if (error) {
		console.log("error");
	}

	return (
		<>
			<QuestionContainerHeader
				questionNumber={questions.length}
				tabIdx={tabIdx}
				onSelectTab={selectTabIdx}
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
