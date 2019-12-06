import React from "react";
import styled from "styled-components";
import {useQuery} from "@apollo/react-hooks";
import "./App.css";
import NavBar from "../components/NavBar/NavBar.js";
import TabGroup from "../components/TabGroup/TabGroup.js";
import {GuestProvider} from "../libs/guestContext";
import TopProgressBar from "../components/TopProcessBar.js";
import ErrorPage from "../components/ErrorPage/ErrorPage.js";
import {GET_GUEST_APP_GLOBAL_DATA} from "../apollo/gqlSchemes.js";

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
`;


export default function App() {
	const {data, loading, error} = useQuery(GET_GUEST_APP_GLOBAL_DATA);

	if (error) {
		return <ErrorPage/>;
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
