import React, {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Content from "./components/Content";

function App() {
	const [event] = useState(true);

	return (
		<div className="App">
			<Header />
			<Nav />
			<Content event={event}/>
		</div>
	);
}

export default App;
