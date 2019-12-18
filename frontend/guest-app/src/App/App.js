import React from "react";
import styled from "styled-components";
import "./App.css";
import NavBar from "../components/NavBar/NavBar.js";
import TabGroup from "../components/TabGroup/TabGroup.js";
import UIControllerProvider from "../UIController/UIControllerProvider.js";
import ApolloClientProvider from "../apollo/ApolloClientProvider.js";
import {GuestGlobalProvider, useGuestGlobal} from "../GuestGlobalProvider.js";

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
`;

const App = () => {
	const {event} = useGuestGlobal();

	return (
		<AppStyle>
			<UIControllerProvider>
				<NavBar title={event.eventName} />
				<TabGroup />
			</UIControllerProvider>
		</AppStyle>
	);
};

const WrappedApp = () => (
	<ApolloClientProvider>
		<GuestGlobalProvider>
			<App />
		</GuestGlobalProvider>
	</ApolloClientProvider>
);

export default WrappedApp;
