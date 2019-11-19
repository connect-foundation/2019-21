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

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)}}
));

function SwitchTitle({titleName, state, stateHandler, idx}) {
	const SELECTED = 1;
	const classes = useStyles();

	return idx <= 1 ? (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={0}
				showZero
				className={classes.margin}
			/>
			<TitleStyle>{titleName}</TitleStyle>
			<Radio
				checked={state[idx] === SELECTED}
				onClick={stateHandler.bind(this, idx)}
			/>
			<Icon>delete_outlined_icon</Icon>
		</TitleBox>
	) : (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={0}
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

export default SwitchTitle;
