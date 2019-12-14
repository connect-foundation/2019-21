import React from "react";
import Radio from "@material-ui/core/Radio";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";
import {Icon} from "@material-ui/core";
import {RightSide, BoldTitleStyle} from "../StyledComponent/ComponentsStyle.js";
import TitleBox from "../StyledComponent/TitleBox.js";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2),
	},
	icon: {
		"&:hover": {
			color: "#EF0046",
		},
	},
}));

function RadioTitle({
	titleName,
	state,
	stateHandler,
	idx,
	data,
	dataHandler,
	type,
}) {
	const SELECTED = true;
	const classes = useStyles();

	return idx <= 1 ? (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={data.length}
				showZero
				className={classes.margin}
				children={undefined}
			/>
			<BoldTitleStyle>{titleName}</BoldTitleStyle>
			<RightSide>
				<Radio
					checked={state[idx] === SELECTED}
					onClick={stateHandler.bind(this, idx)}
				/>
				<Tooltip title="모든 질문 완료">
					<Icon
						className={classes.icon}
						onClick={() =>
							dataHandler("all", "active", "completeQuestion")
						}
					>
						launch
					</Icon>
				</Tooltip>
			</RightSide>
		</TitleBox>
	) : (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={data.length}
				showZero
				className={classes.margin}
				children={undefined}
			/>
			<BoldTitleStyle>{titleName}</BoldTitleStyle>
			<Radio
				checked={state[idx] === SELECTED}
				onClick={stateHandler.bind(this, idx)}
			/>
		</TitleBox>
	);
}

export default RadioTitle;
