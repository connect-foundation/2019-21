import React, {useState} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {Typography} from "@material-ui/core";
import CommonModal from "../CommonModal/CommonModal.js";
import QuestionCard from "../Question/QuestionCard/QuestionCard.js";
import DummyData from "../Question/QuestionDummyData.js";

function MyQuestionModal({isOpened, onCancelClick}) {
	const [datas] = useState({questions: DummyData()});

	return (
		<CommonModal isOpened={isOpened} onCancelClick={onCancelClick}>
			<Typography>My question</Typography>
			<Scrollbars style={{width: "100%", height: "400px"}}>
				{datas.questions.map((question, idx) => (
					<QuestionCard {...question} key={idx} />
				))}
			</Scrollbars>
		</CommonModal>
	);
}

export default MyQuestionModal;
