import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";
import {handleQuestionDatas} from "../../EventEmiter/QuestionSocketEventEmiter.js";

function QuestionCompleteButton(props) {
	const classes = useStyles();

	return (
		<>
			<Tooltip title="답변 완료">
				<Icon
					className={classes.approveButton}
					onClick={() => handleQuestionDatas(props.data, props.id, props.type, "completeQuestion")}>
					check_circle_outline
				</Icon>
			</Tooltip>
		</>
	);
}
export default QuestionCompleteButton;

