import React from "react";
import styled from "styled-components";
import "./App.css";
import NavBar from "../components/NavBar/NavBar.js";
import TabGroup from "../components/TabGroup/TabGroup.js";

const AppStyle = styled.div`
	height: 100vh;
	width: 100vw;
`;

export default function App() {
	return (
		<AppStyle>
			<NavBar />
			<TabGroup />
		</AppStyle>
	);
}