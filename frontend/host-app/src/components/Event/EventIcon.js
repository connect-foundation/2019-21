import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles.js";
import {blue, grey} from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday.js";

const useStyles = makeStyles({
	inActive: {
		margin: 10,
		width: "3rem",
		height: "3rem",
		fontSize: "0.5rem",
		backgroundColor: grey[100],
		color: grey[500],
	},
	active: {
		margin: 10,
		width: "3rem",
		height: "3rem",
		fontSize: "0.5rem",
		backgroundColor: blue[100],
		color: blue[500],
	},
});

function EventIcon(props) {
	const {isLive} = props;
	const classes = useStyles();

	return (
		<Avatar className={isLive ? classes.active : classes.inActive}>
			<CalendarTodayIcon />
		</Avatar>
	);
}

EventIcon.propTypes = {
	isLive: PropTypes.bool,
};

EventIcon.defaultProps = {
	isLive: false,
};
export default EventIcon;
