import React from "react";
import Card from "@material-ui/core/Card";
import {styled} from "@material-ui/core/styles";
import {CardContent} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import QuestionHeader from "../QuestionCard/QuestionCardHeader.js";
import QuestionBody from "../QuestionCard/QuestionCardBody.js";
import EmojiArea from "../EmojiArea/EmojiArea.js";

const PreviewQuestionStyle = styled(Box)({
	backgroundColor: "#E0E0E0",
});

function PreviewQuestion(props) {
	return (
		<PreviewQuestionStyle>
			<Card style={{margin: "0.5rem"}}>
				<CardContent style={{paddingTop: "1rem", paddingBottom: "0"}}>
					<QuestionHeader {...props} />
					<Divider
						style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
					/>
					<QuestionBody {...props} />
					<EmojiArea {...props} />
				</CardContent>
			</Card>
		</PreviewQuestionStyle>
	);
}

export default PreviewQuestion;
