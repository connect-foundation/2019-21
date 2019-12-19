import React from "react";
import PropTypes from "prop-types";
import {grey} from "@material-ui/core/colors";
import {Scrollbars} from "react-custom-scrollbars";
import AppDrawer from "../AppDrawer/AppDrawer.js";
import QuestionCardList from "../QuestionCard/QuestionCardList.js";
import PaddingArea from "../atoms/PaddingArea.js";
import useQuestions from "../../contexts/Questions/useQuestions.js";
import useGlobalData from "../../contexts/GlobalData/useGlobalData.js";

const fullSizeCardStyle = {
	width: "100vw",
	height: "100vh",
	backgroundColor: grey[300],
};

function MyQuestionsDrawer(props) {
	const {isOpen, onClose} = props;
	const {guest} = useGlobalData();
	const {questions, replies} = useQuestions();

	return (
		<AppDrawer
			anchor={"right"}
			title={"내 질문"}
			isOpen={isOpen}
			onClose={onClose}
		>
			<Scrollbars style={fullSizeCardStyle}>
				<QuestionCardList
					questions={questions.filter(x => x.GuestId === guest.id)}
					replies={replies}
				/>
				<PaddingArea />
			</Scrollbars>
		</AppDrawer>
	);
}

MyQuestionsDrawer.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
};

export default MyQuestionsDrawer;
