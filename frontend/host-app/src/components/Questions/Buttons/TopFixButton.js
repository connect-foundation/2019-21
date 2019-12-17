import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";
import {handleStar} from "../../EventEmiter/QuestionSocketEventEmiter";

function TopFixButton(props) {
	const classes = useStyles();

	return (
		<>
			<Tooltip title="상단 고정">
				<Icon
					className={classes.starButton}
					onClick={() => handleStar(props.data, props.id)}>
					stars
				</Icon>
			</Tooltip>
		</>
	);
}
export default TopFixButton;

