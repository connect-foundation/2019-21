import React from "react";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer.js";
import SideMenuItem from "./SideMenuItem.js";
import {useUIControllerContext} from "../UIController/UIController.js";

const MY_QUESTION_BUTTON_TEXT = "내 질문들";

function MyQuestionButton() {
	const {myQuestionDrawerReducer} = useUIControllerContext();

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
