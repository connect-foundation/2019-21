import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "../useStyles.js";

function ApproveQuestionIconButton(props) {
	const classes = useStyles();

	return (
		<Tooltip title="승인">
			<Icon
				className={classes.approveButton}
				onClick={() =>
					props.dataHandler(props.id, props.type, "active")
				}
			>
				check_circle_outline
			</Icon>
		</Tooltip>
	);
}
export default ApproveQuestionIconButton;
