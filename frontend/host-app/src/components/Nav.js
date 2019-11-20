import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const NavStyle = styled.div`
	display: flex;
	height: 50px;
	background-color: #adb5bd;
	box-sizing: border-box;
	padding: 0 30px;
`;

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
		fontWeight: "bold",
	},
}));

function Nav() {
	const classes = useStyles();

	return (
		<NavStyle>
			<Button
				className={classes.margin}
				size="medium"
				variant="outlined"
				color="default"
			>
				이벤트
			</Button>
			<Button
				className={classes.margin}
				size="medium"
				variant="outlined"
				color="default"
			>
				과거기록
			</Button>
			<Button
				className={classes.margin}
				size="medium"
				variant="outlined"
				color="default"
			>
				통계
			</Button>
		</NavStyle>
	);
}

export default Nav;
