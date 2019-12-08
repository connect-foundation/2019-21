import React from "react";
import Radio from "@material-ui/core/Radio";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import {makeStyles} from "@material-ui/core/styles";
import {Icon} from "@material-ui/core";

const TitleBox = styled.div`
	display:flex;
	align-items: center;
	width:100%;
	justify-content:space-around;
`;

const TitleStyle = styled.div`
	font-weight: bold;
`;

const RightSide = styled.div`
	margin-left: 2rem;
	display: flex;
	align-items: center;
`;

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

function RadioTitle({titleName, state, stateHandler, idx, data, dataHandler, type}) {
	const SELECTED = true;
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
				<Radio
					checked={state[idx] === SELECTED}
					onClick={stateHandler.bind(this, idx)}
				/>
				<Icon
					className={classes.icon}
					onClick={() => dataHandler("all", "active", "completeQuestion")}
				>
					delete_outlined_icon
				</Icon>
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
			<Radio
				checked={state[idx] === SELECTED}
				onClick={stateHandler.bind(this, idx)}
			/>
		</TitleBox>
	);
}

export default RadioTitle;
