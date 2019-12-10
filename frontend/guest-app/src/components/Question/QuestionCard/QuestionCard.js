import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import QuestionHeader from "./QuestionCardHeader.js";
import QuestionBody from "./QuestionCardBody.js";
import EmojiArea from "../../Emoji/EmojiArea.js";
import ReplyArea from "../../Reply/ReplyArea";

const QuestionCard = React.memo(props => (
	<Card style={{margin: "0.5rem"}}>
		<CardContent style={{paddingTop: "1rem", paddingBottom: "0"}}>
			<QuestionHeader {...props} />
			<Divider
				style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
			/>
			<QuestionBody {...props} />
			<EmojiArea {...props} />
			<ReplyArea {...props} />
		</CardContent>
	</Card>
));

QuestionCard.proptypes = {};

export default QuestionCard;
