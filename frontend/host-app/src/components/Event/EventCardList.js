import React, {useState, useContext} from "react";
import EventCard from "./EventCard.js";
import {HostContext} from "../../libs/hostContext";
import {compareCurrentDateToTarget} from "../../libs/utils";

const DEFAULT = 0;

const dateFormat = date => {
	return new Date(parseInt(date));
};

function EventCardList(props) {
	const {events} = useContext(HostContext);
	const {value, index} = props;
	const [selected, setSelected] = useState(null);

	const selectEvent = key => {
		setSelected(key);
	};

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`hostpage-tabpanel-${index}`}
			aria-labelledby={`hostpage-tab-${index}`}
		>
			{value === index &&
				events.map(event => {
					const isLive =
						compareCurrentDateToTarget(dateFormat(event.endAt)) > 0;
					return (
						<EventCard
							{...event}
							key={event.id}
							onClickHandler={selectEvent}
							selected={selected}
							isLive={isLive}
						/>
					);
				})}
		</div>
	);
}

export default EventCardList;
