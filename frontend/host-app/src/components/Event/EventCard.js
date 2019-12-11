import React from "react";
import PropTypes from "prop-types";
import {Card, CardContent} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EventIcon from "./EventIcon.js";
import EventCardContent from "./EventCardContent.js";

function EventCard(props) {
	const {isLive} = props;

	return (
		<Card
			style={{
				width: "100vw",
				padding: "0rem",

				marginTop: "0.25rem",
				marginBottom: "0.25rem",
			}}
		>
			<CardContent style={{padding: "1rem"}}>
				<Grid container direction="row" wrap={"nowrap"}>
					<EventIcon isLive={isLive} />
					<Box p={1} />
					<EventCardContent {...props}/>
				</Grid>
			</CardContent>
		</Card>
	);
}

EventCard.propTypes = {
	eventName: PropTypes.bool,
	startAt: PropTypes.string,
	endAt: PropTypes.string,
	eventCode: PropTypes.string,
	isLive: PropTypes.bool,
};

EventCard.defaultProps = {
	eventName: "name",
	startAt: "0",
	endAt: "0",
	eventCode: "code",
	isLive: false,
};

export default EventCard;
