import React from "react";
import {Icon, Typography} from "@material-ui/core";
import useStyles from "./useStyles";
import {ThumbUpContainer, ReplyContainer} from "./QuestionStyle";

// todo: proptype
function ThumbUpButton(props) {
	const classes = useStyles();

	const handleReply = () => props.replyOpenHandler(!props.replyOpenStatus);

	//todo 컴포넌트 쪼개기
	return (
		<ThumbUpContainer>
			<Icon className={classes.thumbUpButton}>thumb_up_outlined</Icon>
			<Typography color={"textSecondary"} variant={"body2"}>
				{props.likeCount}
			</Typography>
			<ReplyContainer>
				<Typography color={"textSecondary"} variant={"body2"} onClick={() => handleReply()}>
					{props.replies.length} 개의 덧글
				</Typography>
			</ReplyContainer>
		</ThumbUpContainer>
	);
}

export default ThumbUpButton;
