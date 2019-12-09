import React from "react";
import {Icon, Typography} from "@material-ui/core";
import Badge from "@material-ui/core/Badge/Badge";
import useStyles from "./useStyles";
import {ThumbUpContainer, ReplyContainer} from "./QuestionStyle";

function ThumbUpButton(props) {
	const classes = useStyles();

	return (
		<ThumbUpContainer>
			<Icon className={classes.thumbUpButton}>thumb_up_outlined</Icon>
			<Typography color={"textSecondary"} variant={"body2"}>
				{props.likeCount}
			</Typography>
			<ReplyContainer>
				<Typography color={"textSecondary"} variant={"body2"}>
					0 개의 덧글
				</Typography>
			</ReplyContainer>
		</ThumbUpContainer>
	);
}

export default ThumbUpButton;
