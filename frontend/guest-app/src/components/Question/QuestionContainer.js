import React, {useRef} from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import QuestionContainerHeader from "./QuestionContainerHeader.js";
import useTabGroup from "../TabGroup/useTabGroup.js";
import QuestionInputArea from "./QuestionInputArea/QuestionInputArea.js";
import useQuestionCardList from "./useQuestionCardList.js";
import QuestionCardList from "./QuestionCardList.js";
import {socketClient, useSocket} from "../../libs/socket.io-Client-wrapper.js";

const dummyEventCode = "u0xn";
const dummyGuestId = 148;
const dummyEventId = 2;
const EXCHANGE_RATES = gql`
    {
        questions(eventCode: ${dummyEventCode}, guestId: ${dummyGuestId}) {
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

function QuestionContainerInner(props) {
	const {data = undefined} = props;
	const {questions, addQuestion} = useQuestionCardList(data);
	const {tabIdx, selectTabIdx} = useTabGroup();
	const userNameRef = useRef(null);
	const questionRef = useRef(null);

	useSocket("question/create", req => {
		addQuestion(req);
	});

	const onAskQuestion = () => {
		const userName = userNameRef.current.value;
		const question = questionRef.current.value;

		const newQuestion = {
			userName,
			eventId: dummyEventId,
			guestId: dummyGuestId,
			date: new Date(),
			content: question,
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
				onOpen={() => {
				}}
				questionRef={questionRef}
				userNameRef={userNameRef}
			/>
			<QuestionCardList questions={questions}/>
		</>
	);
}

function QuestionContainer() {
	const {loading, error, data} = useQuery(EXCHANGE_RATES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<QuestionContainerInner data={data.questions}/>
		</>
	);
}

export default QuestionContainer;
