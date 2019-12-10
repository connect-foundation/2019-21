import React from "react";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer.js";
import useCommonModal from "../CommonComponent/CommonModal/useCommonModal.js";
import SideMenuItem from "./SideMenuItem.js";
import MyQuestionModal from "../Modals/MyQuestionModal.js";

function MyQuestionButton() {
	const modalState = useCommonModal();

	return (
		<div>
			<SideMenuItem
				icon={<QuestionAnswerIcon/>}
				itemText={"내 질문들"}
				onClick={modalState.openModal}
			/>
			<MyQuestionModal
				isOpened={modalState.isOpened}
				onCancelClick={modalState.closeModal}
			/>
		</div>
	);
}

export default MyQuestionButton;
