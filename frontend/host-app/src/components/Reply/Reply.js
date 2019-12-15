import React from "react";
import {Icon, Typography} from "@material-ui/core";
import useStyles from "../Questions/useStyles.js";
import {QuestionMeta, ReplyBody, ReplyContainer, ReplyInfo} from "../Questions/QuestionStyle.js";
import QuestionUserName from "../Questions/QuestionUserName.js";
import QuestionDate from "../Questions/QuestionDate.js";

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
