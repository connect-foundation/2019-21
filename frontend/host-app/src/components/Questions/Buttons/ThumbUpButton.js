import React from "react";
import {Icon, Typography} from "@material-ui/core";
import useStyle from "./useButtonStyles";
import {ThumbUpContainer, ReplyContainer} from "../QuestionStyle";


function ThumbUpButton(props) {
	const classes = useStyle();

	const handleReply = () => props.replyOpenHandler(!props.replyOpenStatus);

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
