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
							<Icon
								className={classes.starButton}
								onClick={() => props.handleStar(props.id, props.type)}>
								stars
							</Icon>
							<Icon className={classes.upwardButton}>publish</Icon>
							<Icon
								className={classes.approveButton}
								onClick={() => props.dataHandler(props.id, props.type, "completeQuestion")}>
								check_circle_outline
							</Icon>
							<Icon className={classes.moreButton}>more_vert</Icon>
						</QuestionButtons>
					</QuestionMeta>
				</QuestionHeader>
				<QuestionBody>{props.content}</QuestionBody>
			</CardContent>
		</Card>
	);
}

export default LiveQuestionCard;
