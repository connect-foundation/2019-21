import React from "react";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer.js";
import SideMenuItem from "./SideMenuItem.js";
import {useUIController} from "../UIController/UIControllerProvider.js";

const MY_QUESTION_BUTTON_TEXT = "내 질문들";

function MyQuestionButton() {
	const {myQuestionDrawerReducer} = useUIController();

	return (
		<SideMenuItem
			icon={<QuestionAnswerIcon />}
			itemText={MY_QUESTION_BUTTON_TEXT}
			onClick={() => {
				myQuestionDrawerReducer.setOn();
			}}
		/>
	);
}

export default MyQuestionButton;
