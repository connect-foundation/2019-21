import React from "react";
import {socketClient} from "../../socket.io";
import QuestionInputDrawer from "./QuestionInputDrawer.js";
import useGlobalData from "../../contexts/GlobalData/useGlobalData.js";

function EditQuestionInputDrawer({userNameRef, questionRef, toggleReducer}) {
	const {event, guest} = useGlobalData();

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
