import React, {useState} from "react";
import "./App.css";
import EventForm from "./compounds/EventForm";
import HostLoginMessage from "./compounds/HostLoginMessage";
import LoginModal from "./compounds/LoginModal";

function App() {
	const [show, setShow] = useState(0);
	const onHideModal = () => {
		setShow(0);
	};
	const onShowModal = () => {
		setShow(1);
	};

	return (
		<div className="App">
			<EventForm />
			<HostLoginMessage onShowModal={onShowModal} />
			{show === 0 ? null : <LoginModal onHideModal={onHideModal} />}
		</div>
	);
}

export default App;
