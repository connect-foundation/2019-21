import Badge from "@material-ui/core/Badge/Badge";
import React from "react";
import {makeStyles} from "@material-ui/core";

const isPoll = type => (type === "poll");
const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)},
}
));

function TitleBadge({dataLength, type}) {
	const classes = useStyles();

	return (
		<>
			<Badge
				color="secondary"
				badgeContent={ isPoll(type) ? "P" : dataLength }
				showZero
				className={classes.margin}
			/>
		</>
	);
}
export default TitleBadge;

