import React from "react";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";
import {Icon} from "@material-ui/core";
import {TitleStyle, TitleBox, RightSide} from "../ComponentsStyle";
import CompleteAllQuestionButton from "../Buttons/CompleteAllQuestionButton";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)},
	icon: {
		"&:hover": {
			color: "#EF0046",
		},
	},
}
));

function RadioTitle({titleName, idx, data, dataHandler}) {
	const classes = useStyles();

	return idx <= 1 ? (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={data.length}
				showZero
				className={classes.margin}
			/>
			<TitleStyle>{titleName}</TitleStyle>
			<RightSide>
				<CompleteAllQuestionButton dataHandler={dataHandler}/>
			</RightSide>
		</TitleBox>
	) : (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={data.length}
				showZero
				className={classes.margin}
			/>
			<TitleStyle>{titleName}</TitleStyle>
		</TitleBox>
	);
}

export default RadioTitle;
