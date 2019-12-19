import React from "react";
import "./App.css";
import EventForm from "./components/EventForm";
import HostLoginMessage from "./components/HostLoginMessage";

function App() {
	return (
		<div className="App">
			<EventForm />
			<HostLoginMessage />
		</div>
	);
}

export default App;
