import React, {useState} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {Typography} from "@material-ui/core";
import CommonModal from "../CommonModal/CommonModal.js";
import DummyData from "../Question/QuestionDummyData.js";
import QuestionCardList from "../Question/QuestionCardList.js";

function MyQuestionModal({isOpened, onCancelClick}) {
	const [datas] = useState({questions: DummyData()});

	return (
		<CommonModal isOpened={isOpened} onCancelClick={onCancelClick}>
			<Typography>내 질문들</Typography>
			<Scrollbars style={{width: "100%", height: "400px"}}>
				<QuestionCardList questions={datas.questions} />
			</Scrollbars>
		</CommonModal>
	);
}

export default MyQuestionModal;
