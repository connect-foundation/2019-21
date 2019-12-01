import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Content from "../components/Content";
import NewPollModal from "../components/Poll/NewPollModal";
import { useCookies } from "react-cookie";
import { HostProvider } from "../libs/hostContext";
import axios from "axios";
const API = "http://localhost:3001/";
const cookieName = "vaagle";

function App() {
	const modal = false;
	const [event, setEvent] = useState(true);
	const [hostInfo, setHostInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [cookies, setCookie] = useCookies([cookieName]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(API, {
				headers: { Authorization: `Bearer ${cookies[cookieName]}` },
			});
			const eventNum = result.data.events.length;
			const host = result.data.host;
			setEvent(eventNum);
			setHostInfo(host);
			setLoading(false);
		};
		fetchData();
	}, []);
	console.log(cookies);
	if (loading) {
		return <p>loading...</p>;
	}
	return (
		<HostProvider value={hostInfo}>
			<div className="App">
				<Header />
				<Nav />
				{modal && <NewPollModal />}
				<Content event={event} />
			</div>
		</HostProvider>
	);
}

export default App;
