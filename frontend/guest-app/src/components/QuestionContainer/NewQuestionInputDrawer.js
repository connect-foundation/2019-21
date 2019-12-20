import React from "react";
import {socketClient} from "../../socket.io";
import QuestionInputDrawer from "./QuestionInputDrawer.js";
import useGlobalData from "../../contexts/GlobalData/useGlobalData.js";

function getNewQuestion({EventId, GuestId, guestName, content}) {
	return {
		guestName,
		EventId,
		GuestId,
		content,
		isAnonymous: guestName.length === 0,
	};
}

function NewQuestionInputDrawer({userNameRef, questionRef, toggleReducer}) {
	const {event, guest} = useGlobalData();

	const onConfirmNewQuestion = () => {
		socketClient.emit(
			"question/create",
			getNewQuestion({
				guestName: userNameRef.current.value,
				EventId: event.id,
				GuestId: guest.id,
				content: questionRef.current.value,
			}),
		);
	};

	const newQuestionInputDrawerProps = {
		title: "질문 하기",
		isOpen: toggleReducer.state,
		onClose: () => toggleReducer.setOff(),
		onConfirm: onConfirmNewQuestion,
		userNameRef,
		questionRef,
		initialUserName: guest.name,
	};

	return <QuestionInputDrawer {...newQuestionInputDrawerProps} />;
}

export default NewQuestionInputDrawer;
