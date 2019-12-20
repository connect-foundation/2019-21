import React from "react";
import Divider from "@material-ui/core/Divider";
import {Icon, Typography} from "@material-ui/core";
import {ReplyBody, ReplyInfo, QuestionMeta, ReplyContainer} from "../QuestionStyle";
import QuestionUserName from "./QuestionUserName";
import QuestionDate from "./QuestionDate";
import useQuestionCardStyles from "./useQuestionCardStyles";

function Replies(props) {
	const classes = useQuestionCardStyles();

	return (
		<div>
			<Divider
				style={{marginTop: "0.3rem", marginBottom: "0.3rem"}}
			/>
			{props.replies.map((reply, i) => (
				<div key={i}>
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
						<Typography color={"textPrimary"} variant={"body2"} component={"div"}>
							{reply.content}
						</Typography>
					</ReplyBody>
				</div>))}
		</div>
	);
}

export default Replies;
