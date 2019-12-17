import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, Icon} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import UserAvata from "../UserAvata.js";
import {QuestionHeader, QuestionBody, QuestionInfo, QuestionMeta, QuestionButtons} from "../QuestionStyle";
import QuestionDate from "../QuestionDate";
import QuestionUserName from "../QuestionUserName";
import useQuestionCardStyles from "../useQuestionCardStyles";
import ApproveButton from "../Buttons/ApproveButton";
import RejectButton from "../Buttons/RejectButton";

function ModerationQuestionCard(props) {
	const classes = useQuestionCardStyles();

	return (
		<Card className={props.isStared ? classes.staredQuestion : classes.normalQuestion}>
			<CardContent>
				<QuestionHeader>
					<QuestionMeta>
						<UserAvata {...props} />
						<QuestionInfo>
							<QuestionUserName {...props} />
							<QuestionDate {...props} />
						</QuestionInfo>
						<QuestionButtons>
							<ApproveButton {...props}/>
							<RejectButton {...props}/>
						</QuestionButtons>
					</QuestionMeta>
				</QuestionHeader>
				<QuestionBody>{props.content}</QuestionBody>
			</CardContent>
		</Card>
	);
}

export default ModerationQuestionCard;
