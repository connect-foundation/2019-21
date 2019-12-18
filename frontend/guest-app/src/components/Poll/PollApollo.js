import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import PollContainer from "./PollContainer";
import {useGuestGlobal} from "../../GuestGlobalProvider.js";

const POLL_QUERY = gql`
	query PollGuest($EventId: ID!, $guestId: ID!) {
		pollGuest(EventId: $EventId, guestId: $guestId) {
			id
			pollName
			pollType
			selectionType
			allowDuplication
			state
			totalVoters
			pollDate
			rated
			ratingValue
			nItems {
				id
				number
				content
				voters
				voted
				firstPlace
			}
		}
	}
`;

function PollApollo() {
	const {event, guest} = useGuestGlobal();
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
