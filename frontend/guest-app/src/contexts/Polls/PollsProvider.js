import {useQuery} from "@apollo/react-hooks";
import React from "react";
import useGlobalData from "../GlobalData/useGlobalData.js";
import PollsContext from "./PollsContext.js";
import {POLL_QUERY} from "../../apollo/gqlSchemes.js";

function PollsProvider(props) {
	const {event, guest} = useGlobalData();
	const options = {
		variables: {
			EventId: event.id,
			guestId: guest.id,
		},
	};
	const {loading, error, data} = useQuery(POLL_QUERY, options);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<PollsContext.Provider value={data}>
			{props.children}
		</PollsContext.Provider>
	);
}

export default PollsProvider;
