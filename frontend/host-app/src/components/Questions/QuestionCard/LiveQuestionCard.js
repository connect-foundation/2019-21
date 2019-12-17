import React, {useState} from "react";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import {CardContent, Icon} from "@material-ui/core";
import UserAvata from "../UserAvata.js";
import {QuestionHeader, QuestionBody, QuestionInfo, QuestionMeta, QuestionButtons} from "../QuestionStyle";
import QuestionDate from "../QuestionDate";
import QuestionUserName from "../QuestionUserName";
import useQuestionCardStyles from "../useQuestionCardStyles";
import QuestionMenuButton from "../Buttons/QuestionMenuButton";
import ThumbUpButton from "../Buttons/ThumbUpButton";
import Replies from "../Replies";
import TopFixButton from "../Buttons/TopFixButton";
import QuestionCompleteButton from "../Buttons/QuestionCompleteButton";

function LiveQuestionCard(props) {
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
							<TopFixButton {...props}/>
							<QuestionCompleteButton {...props} />
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

export default LiveQuestionCard;
