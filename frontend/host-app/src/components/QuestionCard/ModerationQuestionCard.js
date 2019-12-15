import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import UserAvatar from "../QuestionContainer/UserAvatar.js";
import {
	QuestionBody,
	QuestionButtons,
	QuestionHeader,
	QuestionInfo,
	QuestionMeta,
} from "../QuestionContainer/QuestionStyle.js";
import QuestionDate from "../QuestionContainer/QuestionDate.js";
import QuestionUserName from "../QuestionContainer/QuestionUserName.js";
import useStyles from "../QuestionContainer/useStyles.js";
import ApproveQuestionIconButton from "../QuestionIconButton/ApproveQuestionIconButton.js";
import RejectQuestionIconButton from "../QuestionIconButton/RejectQuestionIconButton.js";

// todo: proptype
function ModerationQuestionCard(props) {
	const classes = useStyles();

	// todo 컴포넌트 쪼개기
	return (
		<Card
			className={
				props.isStared ? classes.staredQuestion : classes.normalQuestion
			}
		>
			<CardContent>
				<QuestionHeader>
					<QuestionMeta>
						<UserAvatar {...props} />
						<QuestionInfo>
							<QuestionUserName {...props} />
							<QuestionDate {...props} />
						</QuestionInfo>
						<QuestionButtons>
							<ApproveQuestionIconButton {...props} />
							<RejectQuestionIconButton {...props} />
						</QuestionButtons>
					</QuestionMeta>
				</QuestionHeader>
				<QuestionBody>{props.content}</QuestionBody>
			</CardContent>
		</Card>
	);
}

export default ModerationQuestionCard;
