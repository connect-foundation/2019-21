import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";

function QuestionRestoreButton(props) {
	const classes = useStyles();

	return (
		<>
			<Tooltip title="질문 되살리기">
				<Icon
					className={classes.restoreButton}
					onClick={() => props.dataHandler(props.id, props.type, "active")}>
					restore
				</Icon>
			</Tooltip>
		</>
	);
}
export default QuestionRestoreButton;

