import React, {useState} from "react";
import PropTypes from "prop-types";
import {Scrollbars} from "react-custom-scrollbars";
import {Typography} from "@material-ui/core";
import CommonModal from "../CommonComponent/CommonModal/CommonModal.js";
import DummyData from "../QuestionContainer/QuestionDummyData.js";
import QuestionCardList from "../QuestionCard/QuestionCardList.js";

function MyQuestionModal(props) {
	const {isOpened, onCancelClick} = props;
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

MyQuestionModal.propTypes = {
	isOpened: PropTypes.bool,
	onCancel: PropTypes.func,
};

MyQuestionModal.defualtProps = {
	isOpened: false,
	onCancel: undefined,
};

export default MyQuestionModal;
