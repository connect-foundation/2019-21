import useStyles from "../useStyles.js";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import React from "react";

function RestoreQuestionIconButton(props) {
	const classes = useStyles();

	return (
		<Tooltip title="질문 되살리기">
			<Icon
				className={classes.restoreButton}
				onClick={() =>
					props.dataHandler(props.id, props.type, "active")
				}
			>
				restore
			</Icon>
		</Tooltip>
	);
}

export default RestoreQuestionIconButton;
