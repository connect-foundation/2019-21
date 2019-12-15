import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import UserAvatar from "../UserAvatar.js";
import {
	QuestionBody,
	QuestionButtons,
	QuestionHeader,
	QuestionInfo,
	QuestionMeta,
} from "../QuestionStyle.js";
import QuestionDate from "../QuestionDate.js";
import QuestionUserName from "../QuestionUserName.js";
import useStyles from "../useStyles.js";
import QuestionMenu from "../QuestionMenu.js";
import ThumbUpButton from "../ThumbUpButton.js";
import ReplyList from "../../Reply/ReplyList.js";
import FixOnTopIconButton from "../QuestionIconButton/FixOnTopIconButton.js";
import CompleteQuestionIconButton from "../QuestionIconButton/CompleteQuestionIconButton.js";
import QuestionCardInnerDivider from "../QuestionCardInnerDivider.js";

// todo: proptype
function LiveQuestionCard(props) {
	const classes = useStyles();
	const [openReplies, setOpenReplies] = useState(false);

	// todo 컴포넌트 쪼개기
	return (
		<Card
			className={
				props.isStared ? classes.staredQuestion : classes.normalQuestion
			}
		>
			<CardContent className={classes.cardContentPadding}>
				<QuestionHeader>
					<QuestionMeta>
						<UserAvatar {...props} />
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
				<QuestionCardInnerDivider />
				<ThumbUpButton
					{...props}
					replyOpenHandler={setOpenReplies}
					replyOpenStatus={openReplies}
				/>
				{openReplies && <ReplyList replies={props.replies} />}
			</CardContent>
		</Card>
	);
}

export default LiveQuestionCard;
