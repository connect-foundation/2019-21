import React, {useContext} from "react";
import {useQuery} from "@apollo/react-hooks";
import PollContainer from "./PollContainer";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
import {POLL_QUERY} from "../../apollo/gqlSchemes.js";

function PollApollo() {
	const {event, guest} = useContext(GuestGlobalContext);
	const options = {
		variables: {
			EventId: event.id,
			guestId: guest.id,
		},
	};
	const {loading, error, data} = useQuery(POLL_QUERY, options);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return <PollContainer data={data.pollGuest} GuestId={guest.id} />;
}

export default PollApollo;
