import React from "react";
import PropTypes from "prop-types";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useSideMenuStyles from "./UseSideMenuStyles.js";

function SideMenuHeader(props) {
	const {eventName, startAt, endAt, eventCode} = props;

	const classes = useSideMenuStyles();

	const start = new Date(parseInt(startAt, 10)).toLocaleString();
	const end = new Date(parseInt(endAt, 10)).toLocaleString();
	const dateRange = `${start} ~ ${end}`;

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
					{dateRange}
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

SideMenuHeader.propTypes = {
	eventName: PropTypes.string,
	startAt: PropTypes.string,
	endAt: PropTypes.string,
	eventCode: PropTypes.string,
};

SideMenuHeader.defaultProps = {
	eventName: "",
	startAt: "",
	endAt: "",
	eventCode: "",
};

export default SideMenuHeader;
