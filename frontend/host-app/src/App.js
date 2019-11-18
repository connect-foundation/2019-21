import React from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Content from "./components/Content";

function App() {
	return (
		<div className="App">
			<Header />
			<Nav />
			<Content />
		</div>
	);
}

export default App;
