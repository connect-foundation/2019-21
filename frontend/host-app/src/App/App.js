import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Content from "../components/Content";
import NewPollModal from "../components/Poll/NewPollModal";
import { useCookies } from "react-cookie";
import axios from "axios";
const API = "http://localhost:3001/";
const cookieName = "vaagle";

function App() {
	const modal = false;
	const [event, setEvent] = useState(true);
	const [cookies, setCookie] = useCookies([cookieName]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(API, {
				headers: { Authorization: `Bearer ${cookies[cookieName]}` },
			});
			const eventNum = result.data.events.length;
			setEvent(eventNum);
		};
		fetchData();
	}, []);

	return (
		<div className="App">
			<Header />
			<Nav />
			{modal && <NewPollModal />}
			<Content event={event} />
		</div>
	);
}

export default App;
