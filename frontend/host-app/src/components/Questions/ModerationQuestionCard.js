import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, Icon} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import UserAvata from "./UserAvata.js";
import {QuestionHeader, QuestionBody, QuestionInfo, QuestionMeta, QuestionButtons} from "./QuestionStyle";
import QuestionDate from "./QuestionDate";
import QuestionUserName from "./QuestionUserName";
import useStyles from "./useStyles";

function ModerationQuestionCard(props) {
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
							<Tooltip title="승인">
								<Icon
									className={classes.approveButton}
									onClick={() => props.dataHandler(props.id, props.type, "active")}>
									check_circle_outline
								</Icon>
							</Tooltip>
							<Tooltip title="거절">
								<Icon
									className={classes.cancelButton}
									onClick={() => props.dataHandler(props.id, props.type, "deleted")}>
									highlight_off
								</Icon>
							</Tooltip>
						</QuestionButtons>
					</QuestionMeta>
				</QuestionHeader>
				<QuestionBody>{props.content}</QuestionBody>
			</CardContent>
		</Card>
	);
}

export default ModerationQuestionCard;
