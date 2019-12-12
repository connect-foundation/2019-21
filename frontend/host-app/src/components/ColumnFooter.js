import React from "react";
import {Icon} from "@material-ui/core";
import {FooterBox, FooterStyle} from "./ComponentsStyle";
import useStyles from "./Questions/useStyles";

function ColumnFooter({data, handler}) {
	const classes = useStyles();
	const increaseHeight = () => handler(data + 1);
	const decreaseHeight = () => ((data > 0) && handler(data - 1));

	return (
		<FooterStyle>
			<FooterBox>
				<Icon className={classes.footerButton} onClick={() => { decreaseHeight(); }}>
					remove
				</Icon>
				<Icon className={classes.footerButton} onClick={() => { increaseHeight(); }}>
					add
				</Icon>
			</FooterBox>
		</FooterStyle>
	);
}

export default ColumnFooter;
