import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import PollContainer from "./PollContainer";

const POLL_QUERY = gql`
	{
		polls(eventCode: "sd3k", guestId: 148) {
			id
			pollName
			pollType
			selectionType
			allowDuplication
			state
			active
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

	// console.log(data.polls);
	return <PollContainer data={data.polls} />;
}

export default PollApollo;
