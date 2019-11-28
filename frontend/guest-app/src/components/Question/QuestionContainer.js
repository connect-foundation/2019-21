import React, {useRef} from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import QuestionContainerHeader from "./QuestionContainerHeader.js";
import useTabGroup from "../TabGroup/useTabGroup.js";
import QuestionInputArea from "./QuestionInputArea/QuestionInputArea.js";
import useQuestionCardList from "./useQuestionCardList.js";
import QuestionCardList from "./QuestionCardList.js";
import {socketClient, useSocket} from "../../libs/socket.io-Client-wrapper.js";

const EXCHANGE_RATES = gql`
  { questions(eventCode:"u0xn", guestId:148) {
	content
	id
	Emojis {
      EmojiName
	}
}
  }
`;

function QuestionContainer() {
	const { loading, error, data } = useQuery(EXCHANGE_RATES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const {questions, addQuestion} = useQuestionCardList(data);
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
			userName,
			date: new Date(),
			question,
			isShowEditButton: true,
			isLike: false,
			likeCount: 0,
		};

		addQuestion(newQuestion);
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
