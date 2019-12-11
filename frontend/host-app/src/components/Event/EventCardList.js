import React from "react";
import EventCard from "./EventCard.js";

function EventCardList(props) {
	const {events = [{}, {}, {}]} = props;

	return (
		<>
			{events.map(event => (
				<EventCard {...event} key={event.id} />
			))}
		</>
	);
}

export default EventCardList;
