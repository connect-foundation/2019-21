import React, {useState} from "react";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import UserAvata from "./UserAvata.js";
import {
	QuestionBody,
	QuestionButtons,
	QuestionHeader,
	QuestionInfo,
	QuestionMeta,
} from "./QuestionStyle";
import QuestionDate from "./QuestionDate";
import QuestionUserName from "./QuestionUserName";
import useStyles from "./useStyles";
import QuestionMenu from "./QuestionMenu";
import ThumbUpButton from "./ThumbUpButton";
import Replies from "./Replies";
import FixOnTopIconButton from "./FixOnTopIconButton.js";
import CompleteQuestionIconButton from "./CompleteQuestionIconButton.js";

function LiveQuestionCard(props) {
	const classes = useStyles();
	const [openReplies, setOpenReplies] = useState(false);

	return (
		<Card
			className={
				props.isStared ? classes.staredQuestion : classes.normalQuestion
			}
		>
			<CardContent className={classes.cardContentPadding}>
				<QuestionHeader>
					<QuestionMeta>
						<UserAvata {...props} />
						<QuestionInfo>
							<QuestionUserName {...props} />
							<QuestionDate {...props} />
						</QuestionInfo>
						<QuestionButtons>
							<FixOnTopIconButton {...props} />
							<CompleteQuestionIconButton {...props} />
							<QuestionMenu
								id={props.id}
								type={props.type}
								handler={props.dataHandler}
							/>
						</QuestionButtons>
					</QuestionMeta>
				</QuestionHeader>
				<QuestionBody>{props.content}</QuestionBody>
				<Divider
					style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
				/>
				<ThumbUpButton
					{...props}
					replyOpenHandler={setOpenReplies}
					replyOpenStatus={openReplies}
				/>
				{openReplies && <Replies replies={props.replies} />}
			</CardContent>
		</Card>
	);
}

export default LiveQuestionCard;
