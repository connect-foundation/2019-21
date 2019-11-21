import React from "react";
import {Scrollbars} from "react-custom-scrollbars";
import CommonModal from "../CommonModal.js";
import QuestionContainer from "../Question/QuestionContainer.js";

function MyQuestionModal({isOpened, onCancelClick}) {
	return (
		<CommonModal isOpened={isOpened} onCancelClick={onCancelClick}>
			<p>my question</p>
			<Scrollbars style={{width: "100%", height: "400px"}}>
				<QuestionContainer/>
			</Scrollbars>
		</CommonModal>
	);
}

export default MyQuestionModal;
