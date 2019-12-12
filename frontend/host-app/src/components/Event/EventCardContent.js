import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EventCode from "./EventCode.js";
import EventName from "./EventName.js";
import EventDateRage from "./EventDateRage.js";

function EventCardContent(props) {
	const {eventName, startAt, endAt, eventCode} = props;

	return (
		<Grid container direction={"row"}>
			<Grid container direction={"row"}>
				<EventName title={eventName} />
				<Box p={1} />
				<EventCode code={eventCode} />
			</Grid>
			<EventDateRage startAt={startAt} endAt={endAt} />
		</Grid>
	);
}

EventCardContent.propTypes = {
	eventName: PropTypes.string,
	startAt: PropTypes.string,
	endAt: PropTypes.string,
	eventCode: PropTypes.string,
};

EventCardContent.defaultProps = {
	eventName: "name",
	startAt: "0",
	endAt: "0",
	eventCode: "code",
};

export default EventCardContent;
