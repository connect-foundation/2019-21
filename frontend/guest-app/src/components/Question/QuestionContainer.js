import React, {useRef} from "react";
import QuestionContainerHeader from "./QuestionContainerHeader.js";
import useTabGroup from "../TabGroup/useTabGroup.js";
import QuestionInputArea from "./QuestionInputArea/QuestionInputArea.js";
import useQuestionCardList from "./useQuestionCardList.js";
import QuestionCardList from "./QuestionCardList.js";
import {socketClient, useSocket} from "../../libs/socket.io-Client-wrapper.js";

function QuestionContainer() {
	const {questions, addQuestion} = useQuestionCardList();
	const {tabIdx, selectTabIdx} = useTabGroup();
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	useSocket("question/create", req => {
		console.log(req);
		addQuestion(req);
	});

	const onAskQuestion = () => {
		const userName = userNameRef.current.value;
		const question = questionRef.current.value;

		const newQuestion = {
			eventId: 2,
			guestid: 148,
			userName,
			date: new Date(),
			question,
			isShowEditButton: true,
			isLike: false,
			likeCount: 0,
		};
		socketClient.emit("question/create", newQuestion);
	};
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
