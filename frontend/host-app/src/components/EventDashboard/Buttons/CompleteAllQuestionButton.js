import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import {Icon} from "@material-ui/core";
import useStyles from "./useButtonStyles.js";
import {handleQuestionDatas} from "../../EventEmiter/QuestionSocketEventEmiter.js";

function CompleteAllQuestionButton({data}) {
	const classes = useStyles();

	return (
		<>
			<Tooltip title="모든 질문 완료">
				<Icon
					className={classes.completeAllButton}
					onClick={() => handleQuestionDatas(data, "all", "active", "completeQuestion")}
				>
					launch
				</Icon>
			</Tooltip>
		</>
	);
}
export default CompleteAllQuestionButton;

