import React from "react";
import "./App.css";
import Header from "./compounds/Header";
import Nav from "./compounds/Nav";
import Content from "./compounds/Content";

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
