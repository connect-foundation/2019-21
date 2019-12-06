import React from "react";
import styled from "styled-components";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import "./App.css";
import NavBar from "../components/NavBar/NavBar.js";
import TabGroup from "../components/TabGroup/TabGroup.js";
import {GuestProvider} from "../libs/guestContext";
import TopProgressBar from "../components/TopProcessBar.js";

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
`;

const GET_EVENT = gql`
    query {
        guestInEvent {
            event {
                id
                eventCode
                startAt
                endAt
                eventName
                HostId
            }
            guest {
                id
                name
                email
                company
            }
        }
    }
`;


export default function App() {
	const {data, loading, error} = useQuery(GET_EVENT);

	if (error) {
		return <p>error-page...</p>;
	}

	if (loading) {
		return <TopProgressBar/>;
	}

	const {event, guest} = data.guestInEvent;

	return (
		<GuestProvider value={{event, guest}}>
			<AppStyle>
				<NavBar/>
				<TabGroup/>
			</AppStyle>
		</GuestProvider>
	);
}
