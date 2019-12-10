import React from "react";
import {Icon} from "@material-ui/core";
import {TitleBox, FooterStyle} from "./ComponentsStyle";
import useStyles from "./Questions/useStyles";

function ColumnFooter({data,handler}) {
	const classes = useStyles();
	const increaseHeight = () => handler(data + 1);
	const decreaseHeight = () => ((data > 0) && handler(data - 1));

	return (
		<FooterStyle>
			<TitleBox>
				<Icon className={classes.footerButton} onClick={() => { decreaseHeight(); }}>
					remove
				</Icon>
				<Icon className={classes.footerButton} onClick={() => { increaseHeight(); }}>
					add
				</Icon>
			</TitleBox>
		</FooterStyle>
	);
}

export default ColumnFooter;
