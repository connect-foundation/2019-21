import React, {useState} from "react";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import {CardContent, Icon} from "@material-ui/core";
import UserAvata from "./UserAvata.js";
import {QuestionHeader, QuestionBody, QuestionInfo, QuestionMeta, QuestionButtons} from "./QuestionStyle";
import QuestionDate from "./QuestionDate";
import QuestionUserName from "./QuestionUserName";
import useStyles from "./useStyles";
import QuestionMenu from "./QuestionMenu";
import ThumbUpButton from "./ThumbUpButton";
import Replies from "./Replies";

function LiveQuestionCard(props) {
	const classes = useStyles();
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
							<Tooltip title="상단 고정">
								<Icon
									className={classes.starButton}
									onClick={() => props.handleStar(props.id)}>
									stars
								</Icon>
							</Tooltip>
							<Tooltip title="답변 완료">
								<Icon
									className={classes.approveButton}
									onClick={() => props.dataHandler(props.id, props.type, "completeQuestion")}>
									check_circle_outline
								</Icon>
							</Tooltip>
							<QuestionMenu id={props.id} type={props.type} handler={props.dataHandler}/>
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
