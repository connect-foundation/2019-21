import React from "react";
import "./App.css";
import Header from "./compounds/Header";
import EventForm from "./compounds/EventForm";
import HostLogin from "./compounds/HostLogin";

function App() {
	return (
		<div className="App">
			<Header />
			<EventForm />
			<HostLogin />
		</div>
	);
}

export default App;
