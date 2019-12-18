import Badge from "@material-ui/core/Badge/Badge";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(2)},
}
));

function TitleBadge({dataLength}) {
	const classes = useStyles();

	return (
		<>
			<Badge
				color="secondary"
				badgeContent={dataLength}
				showZero
				className={classes.margin}
			/>
		</>
	);
}
export default TitleBadge;

