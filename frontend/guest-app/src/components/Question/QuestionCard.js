import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import QuestionHeader from "./QuestionCardHeader.js";
import QuestionBody from "./QuestionCardBody.js";
import EmojiArea from "../Emoji/EmojiArea.js";

function QuestionCard(props) {
	const {isShowEditButton = false, question} = props;

	return (
		<Card>
			<CardContent>
				<QuestionHeader {...props} />
				<QuestionBody
					question={question}
					isMyQuestion={isShowEditButton}
				/>
				<EmojiArea />
			</CardContent>
		</Card>
	);
}

export default QuestionCard;
