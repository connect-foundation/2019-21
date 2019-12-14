import React from "react";
import {Icon} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "../useStyles.js";

function RejectQuestionIconButton(props) {
	const classes = useStyles();

	return (
		<Tooltip title="거절">
			<Icon
				className={classes.cancelButton}
				onClick={() =>
					props.dataHandler(props.id, props.type, "deleted")
				}
			>
				highlight_off
			</Icon>
		</Tooltip>
	);
}

export default RejectQuestionIconButton;
