import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";
import {handleQuestionDatas} from "../../EventEmiter/QuestionSocketEventEmiter.js";

function RejectButton(props) {
	const classes = useStyles();

	return (
		<>
			<Tooltip title="거절">
				<Icon
					className={classes.cancelButton}
					onClick={() => handleQuestionDatas(props.data, props.id, props.type, "delete")}>
					highlight_off
				</Icon>
			</Tooltip>
		</>
	);
}
export default RejectButton;

