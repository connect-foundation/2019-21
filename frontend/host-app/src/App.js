import React from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Content from "./components/Content";
import NewPollModal from "./components/Poll/NewPollModal";

function App() {
	const modal = true;

	return (
		<div className="App">
			<Header />
			<Nav />
			<Content />
			{modal && <NewPollModal />}
		</div>
	);
}

export default App;
