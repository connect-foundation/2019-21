import React, {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Content from "./components/Content";
import NewPollModal from "./components/Poll/NewPollModal";

function App() {
	const modal = true;
	const [event] = useState(true);

	return (
		<div className="App">
			<Header />
			<Nav />
			{modal && <NewPollModal />}
			<Content event={event}/>
		</div>
	);
}

export default App;
