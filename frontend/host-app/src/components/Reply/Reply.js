import React from "react";
import {Icon, Typography} from "@material-ui/core";
import useStyles from "../QuestionContainer/useStyles.js";
import {QuestionMeta, ReplyBody, ReplyContainer, ReplyInfo} from "../QuestionContainer/QuestionStyle.js";
import QuestionUserName from "../QuestionContainer/QuestionUserName.js";
import QuestionDate from "../QuestionContainer/QuestionDate.js";

// todo: proptype
function Reply(props) {
	const classes = useStyles();

	// todo: 컴포넌트 쪼개기
	return (
		<>
			<QuestionMeta>
				<ReplyInfo>
					<Icon className={classes.replyIcon}>
						subdirectory_arrow_right
					</Icon>
					<QuestionUserName {...props} />
					<ReplyContainer>
						<QuestionDate {...props} />
					</ReplyContainer>
				</ReplyInfo>
			</QuestionMeta>
			<ReplyBody>
				<Typography color={"textPrimary"} variant={"body2"}>
					{props.content}
				</Typography>
			</ReplyBody>
		</>
	);
}

export default Reply;
