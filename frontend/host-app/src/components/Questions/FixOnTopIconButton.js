import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useStyles.js";

function FixOnTopIconButton(props) {
	const classes = useStyles();

	return (
		<Tooltip title="상단 고정">
			<Icon
				className={classes.starButton}
				onClick={() => props.handleStar(props.id)}
			>
				stars
			</Icon>
		</Tooltip>
	);
}

export default FixOnTopIconButton;
