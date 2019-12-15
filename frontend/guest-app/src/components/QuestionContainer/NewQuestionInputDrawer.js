import React, {useContext} from "react";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import {socketClient} from "../../libs/socketIoClientProvider.js";
import QuestionInputDrawer from "../QuestionInputArea/QuestionInputDrawer.js";

function getNewQuestion({EventId, GuestId, guestName, content}) {
	return {
		guestName,
		EventId,
		GuestId,
		content,
		isAnonymous: guestName.length === 0,
	};
}

// todo proptype
function NewQuestionInputDrawer({userNameRef, questionRef, toggleReducer}) {
	const {event, guest} = useContext(GuestGlobalContext);

	const onConfirmNewQuestion = () => {
		// todo 생성부분 함수로 분리
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
	};

	return <QuestionInputDrawer {...newQuestionInputDrawerProps} />;
}

export default NewQuestionInputDrawer;
