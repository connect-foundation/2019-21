import React, {useContext} from "react";
import EventCard from "./EventCard.js";
import {HostContext} from "../../libs/hostContext";
import {compareCurrentDateToTarget} from "../../libs/utils";

const dateFormat = date => new Date(parseInt(date, 10));

function EventCardList(props) {
	const {allEvents} = useContext(HostContext);
	const {value, index} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`hostpage-tabpanel-${index}`}
			aria-labelledby={`hostpage-tab-${index}`}
		>
			{value === index &&
				allEvents.map(event => {
					const isLive =
						compareCurrentDateToTarget(dateFormat(event.endAt)) > 0;

					return (
						<EventCard {...event} key={event.id} isLive={isLive} />
					);
				})}
		</div>
	);
}

export default EventCardList;
