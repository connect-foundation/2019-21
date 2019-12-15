import React, {useContext} from "react";
import PropTypes from "prop-types";
import {grey} from "@material-ui/core/colors";
import {Scrollbars} from "react-custom-scrollbars";
import AppDrawer from "../AppDrawer/AppDrawer.js";
import {useQuestions} from "./QuestionsContext.js";
import QuestionCardList from "../QuestionCard/QuestionCardList.js";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import PaddingArea from "../QuestionInputArea/PaddingArea.js";

// todo 좀더 좋은 이름
const fullSizeCardStyle = {
	width: "100vw",
	height: "100vh",
	backgroundColor: grey[300],
};

function MyQuestionsDrawer(props) {
	const {isOpen, onClose} = props;
	const {guest} = useContext(GuestGlobalContext);
	const {questions, replies} = useQuestions();

	// todo 필터 부분 함수로 분리
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
