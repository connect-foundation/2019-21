import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, Icon} from "@material-ui/core";
import UserAvata from "./UserAvata.js";
import {QuestionHeader, QuestionBody, QuestionInfo, QuestionMeta, QuestionButtons} from "./QuestionStyle";
import QuestionDate from "./QuestionDate";
import QuestionUserName from "./QuestionUserName";
import useStyles from "./useStyles";
import QuestionMenu from "./QuestionMenu";

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
								onClick={() => props.handleStar(props.id)}>
								stars
							</Icon>
							<Icon className={classes.upwardButton}>publish</Icon>
							<Icon
								className={classes.approveButton}
								onClick={() => props.dataHandler(props.id, props.type, "completeQuestion")}>
								check_circle_outline
							</Icon>
							<QuestionMenu id={props.id} type={props.type} handler={props.dataHandler}/>
						</QuestionButtons>
					</QuestionMeta>
				</QuestionHeader>
				<QuestionBody>{props.content}</QuestionBody>
			</CardContent>
		</Card>
	);
}

export default LiveQuestionCard;
