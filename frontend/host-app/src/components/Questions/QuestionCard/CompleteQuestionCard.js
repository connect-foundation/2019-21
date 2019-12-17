import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import UserAvata from "../UserAvata.js";
import {QuestionHeader, QuestionBody, QuestionInfo, QuestionMeta, QuestionButtons} from "../QuestionStyle";
import QuestionDate from "../QuestionDate";
import QuestionUserName from "../QuestionUserName";
import useQuestionCardStyles from "../useQuestionCardStyles";
import QuestionMenuButton from "../Buttons/QuestionMenuButton";
import ThumbUpButton from "../Buttons/ThumbUpButton";
import Replies from "../Replies";
import QuestionRestoreButton from "../Buttons/QuestionRestoreButton";

function CompleteQuestionCard(props) {
	const classes = useQuestionCardStyles();
	const [openReplies, setOpenReplies] = useState(false);

	return (
		<Card className={props.isStared ? classes.staredQuestion : classes.normalQuestion}>
			<CardContent className={classes.cardContentPadding}>
				<QuestionHeader>
					<QuestionMeta>
						<UserAvata {...props} />
						<QuestionInfo>
							<QuestionUserName {...props} />
							<QuestionDate {...props} />
						</QuestionInfo>
						<QuestionButtons>
							<QuestionRestoreButton {...props}/>
							<QuestionMenuButton id={props.id} type={props.type} handler={props.dataHandler}/>
						</QuestionButtons>
					</QuestionMeta>
				</QuestionHeader>
				<QuestionBody>{props.content}</QuestionBody>
				<Divider
					style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
				/>
				<ThumbUpButton {...props} replyOpenHandler={setOpenReplies} replyOpenStatus={openReplies}/>
				{(openReplies) && <Replies replies={props.replies}/> }
			</CardContent>
		</Card>
	);
}

export default CompleteQuestionCard;
