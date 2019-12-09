import React from "react";
import Divider from "@material-ui/core/Divider";
import {Icon, Typography} from "@material-ui/core";
import {ReplyBody, ReplyInfo, QuestionMeta, ReplyContainer} from "./QuestionStyle";
import QuestionUserName from "./QuestionUserName";
import QuestionDate from "./QuestionDate";
import useStyles from "./useStyles";

function Replies(props) {
	const classes = useStyles();

	return (
		<div>
			<Divider
				style={{marginTop: "0.3rem", marginBottom: "0.3rem"}}
			/>
			{props.replies.map(reply => (
				<>
					<QuestionMeta>
						<ReplyInfo>
							<Icon className={classes.replyIcon}>subdirectory_arrow_right</Icon>
							<QuestionUserName {...reply} />
							<ReplyContainer>
								<QuestionDate {...reply} />
							</ReplyContainer>
						</ReplyInfo>
					</QuestionMeta>
					<ReplyBody>
						<Typography color={"textPrimary"} variant={"body2"}>
							{reply.content}
						</Typography>
					</ReplyBody>
				</>))}
		</div>
	);
}

export default Replies;
