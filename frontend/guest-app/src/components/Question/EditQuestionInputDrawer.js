import React, {useContext} from "react";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import {socketClient} from "../../libs/socket.io-Client-wrapper.js";
import QuestionInputDrawer from "./QuestionInputArea/QuestionInputDrawer.js";

function EditQuestionInputDrawer({userNameRef, questionRef, toggleReducer}) {
	const {event, guest} = useContext(GuestGlobalContext);

	const onConfirmEditQuestion = () => {
		socketClient.emit("question/update", {
			id: toggleReducer.data.id,
			guestName: userNameRef.current.value,
			EventId: event.id,
			GuestId: guest.id,
			content: questionRef.current.value,
			isAnonymous: userNameRef.current.value.length === 0,
		});
	};

	const editQuestionInputDrawerProps = {
		title: "질문 수정 하기",
		isOpen: toggleReducer.state,
		onClose: () => toggleReducer.setOff(toggleReducer.data),
		onConfirm: onConfirmEditQuestion,
		userNameRef,
		questionRef,
		initialUserName: toggleReducer.data.guestName,
		initialQuestion: toggleReducer.data.content,
	};

	return <QuestionInputDrawer {...editQuestionInputDrawerProps} />;
}

export default EditQuestionInputDrawer;
