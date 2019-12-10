import React, {useContext} from "react";
import PropTypes from "prop-types";
import {Scrollbars} from "react-custom-scrollbars";
import AppDrawer from "../AppDrawer/AppDrawer.js";
import {useQuestions} from "./QuestionsContext.js";
import QuestionCardList from "./QuestionCard/QuestionCardList.js";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import PaddingArea from "./QuestionInputArea/PaddingArea.js";

const fullSizeCardStyle = {
	width: "100vw",
	height: "100vh",
};

function MyQuestionsDrawer(props) {
	const {isOpen, onClose} = props;
	const {guest} = useContext(GuestGlobalContext);
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
					questions={questions.filter(x => x.GuestId === guest.d)}
					replies={replies}
				/>
				<PaddingArea/>
			</Scrollbars>
		</AppDrawer>
	);
}

MyQuestionsDrawer.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
};

export default MyQuestionsDrawer;
