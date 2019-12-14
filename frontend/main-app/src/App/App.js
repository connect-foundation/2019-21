import React from "react";
import "./App.css";
import EventForm from "../components/EventForm.js";
import HostLoginMessage from "../components/HostLoginMessage.js";

function App() {
	return (
		<div className="App">
			<EventForm />
			<HostLoginMessage />
		</div>
	);
}

export default App;
