import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, Icon} from "@material-ui/core";
import UserAvata from "./UserAvata.js";
import {QuestionHeader, QuestionBody, QuestionInfo, QuestionMeta, QuestionButtons} from "./QuestionStyle";
import QuestionDate from "./QuestionDate";
import QuestionUserName from "./QuestionUserName";
import useStyles from "./useStyles";

function LiveQuestionCard(props) {
	const classes = useStyles();

	return (
		<Card>
			<CardContent>
				<QuestionHeader>
					<QuestionMeta>
						<UserAvata {...props} />
						<QuestionInfo>
							<QuestionUserName {...props} />
							<QuestionDate {...props} />
						</QuestionInfo>
						<QuestionButtons>
							<Icon className={classes.starButton}>stars</Icon>
							<Icon className={classes.upwardButton}>arrow_upward</Icon>
							<Icon className={classes.approveButton}>check_circle_outline</Icon>
							<Icon className={classes.moreButton}>more_vert</Icon>
						</QuestionButtons>
					</QuestionMeta>
				</QuestionHeader>
				<QuestionBody>{props.question}</QuestionBody>
			</CardContent>
		</Card>
	);
}

export default LiveQuestionCard;
