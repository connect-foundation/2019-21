import React, {useContext} from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import PollContainer from "./PollContainer";
import {HostContext} from "../../libs/hostContext";

const POLL_QUERY = gql`
	query PollHost($EventId: ID!) {
		pollHost(EventId: $EventId) {
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

// todo: 좀더 명확한 이름
function PollApollo() {
	const {events} = useContext(HostContext);
	const options = {
		variables: {
			EventId: events[0].id,
		},
	};

	const {loading, error, data} = useQuery(POLL_QUERY, options);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	// console.log(data.pollHost);
	return <PollContainer data={data.pollHost} />;
}

export default PollApollo;
