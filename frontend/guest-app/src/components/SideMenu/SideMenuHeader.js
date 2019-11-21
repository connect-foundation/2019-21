import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import useSideMenuStyles from "./UseSideMenuStyles.js";

function SideMenuHeader({
	eventName = "event name ",
	eventTerm = "event term ",
	eventCode = "event code ",
}) {
	const classes = useSideMenuStyles();

	return (
		<Grid
			container
			className={classes.header}
			direction="column"
			justify="flex-end"
		>
			<div className={classes.headerSpace} />
			<div className={classes.headerWrappedText}>
				<Typography>{eventName}</Typography>
			</div>
			<div className={classes.headerWrappedText}>
				<Typography color={"textSecondary"} variant={"body1"}>
					{eventTerm}
				</Typography>
			</div>
			<div className={classes.headerWrappedText}>
				<Typography color={"textSecondary"} variant={"body1"}>
					{eventCode}
				</Typography>
			</div>
		</Grid>
	);
}

export default SideMenuHeader;
