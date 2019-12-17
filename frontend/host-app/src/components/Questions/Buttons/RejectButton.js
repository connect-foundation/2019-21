import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";

function RejectButton(props) {
	const classes = useStyles();

	return (
		<>
			<Tooltip title="거절">
				<Icon
					className={classes.cancelButton}
					onClick={() => props.dataHandler(props.id, props.type, "deleted")}>
					highlight_off
				</Icon>
			</Tooltip>
		</>
	);
}
export default RejectButton;

