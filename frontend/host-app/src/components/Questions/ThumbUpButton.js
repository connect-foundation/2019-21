import React from "react";
import {Icon} from "@material-ui/core";
import Badge from "@material-ui/core/Badge/Badge";
import useStyles from "./useStyles";
import {ThumbUpContainer} from "./QuestionStyle";

function ThumbUpButton(props) {
	const classes = useStyles();

	return (
		<ThumbUpContainer>
			<Icon className={classes.thumbUpButton}>thumb_up_outlined</Icon>
			<Badge
				color="primary"
				badgeContent={props.likeCount}
				showZero
				className={classes.thumbUpButton}
			/>
		</ThumbUpContainer>
	);
}

export default ThumbUpButton;
