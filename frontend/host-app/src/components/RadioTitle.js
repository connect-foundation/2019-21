import React from "react";
import Radio from "@material-ui/core/Radio";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import {makeStyles} from "@material-ui/core/styles";

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
	const classes = useStyles();

	return (
		<TitleBox>
			<Badge
				color="secondary"
				badgeContent={0}
				showZero
				className={classes.margin}
			/>
			<TitleStyle>{titleName}</TitleStyle>
			<Radio
				checked={state[idx] === 1}
				onClick={stateHandler.bind(this, idx)}
			/>
		</TitleBox>
	);
}

export default SwitchTitle;
