import React from "react";
import styled from "styled-components";
import "./App.css";
import NavBar from "../components/NavBar/NavBar.js";
import TabGroup from "../components/TabGroup/TabGroup.js";
import UIControllerProvider from "../models/UIController/UIControllerProvider.js";
import ApolloClientProvider from "../apollo/ApolloClientProvider.js";
import useGlobalData from "../models/GlobalData/useGlobalData.js";
import GlobalDataProvider from "../models/GlobalData/GlobalDataProvider.js";

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
`;

const App = () => {
	const {event} = useGlobalData();

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
		<GlobalDataProvider>
			<App />
		</GlobalDataProvider>
	</ApolloClientProvider>
);

export default WrappedApp;
