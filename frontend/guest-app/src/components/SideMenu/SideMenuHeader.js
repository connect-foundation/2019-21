import React from "react";
import moment from "moment"
import PropTypes from "prop-types";
import {Grid} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useSideMenuStyles from "./UseSideMenuStyles.js";

const style = {background: blue[600]};
const dateFormat="YYYY년 MM월 DD일 HH시 mm분";

function getDateRangeString(startAt, endAt) {
	const start = new Date(parseInt(startAt, 10));
	const end = new Date(parseInt(endAt, 10));
	const startDate = moment(start).format(dateFormat);
	const endDate = moment(end).format(dateFormat);

	return `${startDate} ~ ${endDate}`;
}

function SideMenuHeader(props) {
	const {eventName, startAt, endAt, eventCode} = props;
	const classes = useSideMenuStyles();

	return (
		<Paper style={style} square={true}>
			<Grid
				container
				className={classes.header}
				direction="column"
				justify="flex-end"
			>
				<div className={classes.headerSpace}/>
				<div className={classes.headerWrappedText}>
					<Typography>{eventName}</Typography>
				</div>
				<div className={classes.headerWrappedText}>
					<Typography variant={"body1"}>
						{getDateRangeString(startAt, endAt)}
					</Typography>
				</div>
				<div className={classes.headerWrappedText}>
					<Typography variant={"body1"}>#{eventCode}</Typography>
				</div>
				<Box p={1}/>
			</Grid>
		</Paper>
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
