import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import PollContainer from "./PollContainer";

const POLL_QUERY = gql`
	{
		pollGuest(eventCode: "sd3k", guestId: 4) {
			id
			pollName
			pollType
			selectionType
			allowDuplication
			state
			totalVoters
			pollDate
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
	const {loading, error, data} = useQuery(POLL_QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return <PollContainer data={data.pollGuest} />;
}

export default PollApollo;
