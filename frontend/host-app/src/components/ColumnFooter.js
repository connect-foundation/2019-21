import React from "react";
import {Icon} from "@material-ui/core";
import {TitleBox, FooterStyle} from "./ComponentsStyle";
import useStyles from "./Questions/useStyles";

function ColumnFooter({titleName,data}) {
	const classes = useStyles();

	return (
		<FooterStyle>
			<TitleBox>
				<Icon className={classes.footerButton}>
					remove_circle
				</Icon>
				<Icon className={classes.footerButton}>
					add_circle
				</Icon>
			</TitleBox>
		</FooterStyle>
	);
}

export default ColumnFooter;
