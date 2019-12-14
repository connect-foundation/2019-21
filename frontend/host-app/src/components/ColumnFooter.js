import React from "react";
import {Icon} from "@material-ui/core";
import useStyles from "./Questions/useStyles";
import ColumnFooterStyledComponent from "./StyledComponent/ColumnFooterStyledComponent.js";

function ColumnFooter({data, handler}) {
	const classes = useStyles();
	const increaseHeight = () => handler(data + 1);
	const decreaseHeight = () => data > 0 && handler(data - 1);

	return (
		<ColumnFooterStyledComponent>
			<Icon
				className={classes.footerButton}
				onClick={() => {
					decreaseHeight();
				}}
			>
				remove
			</Icon>
			<Icon
				className={classes.footerButton}
				onClick={() => {
					increaseHeight();
				}}
			>
				add
			</Icon>
		</ColumnFooterStyledComponent>
	);
}

export default ColumnFooter;
