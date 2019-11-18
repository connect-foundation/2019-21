import React, {useState} from "react";
import "./App.css";
import EventForm from "./compounds/EventForm";
import HostLoginMessage from "./compounds/HostLoginMessage";
import LoginModal from "./compounds/LoginModal";

function App() {
	const MODAL_OPENED = true;
	const MODAL_CLOSED = false;

	const [loginModalStatus, setModalStatus] = useState(MODAL_CLOSED);
	const onHideModal = () => {
		setModalStatus(MODAL_CLOSED);
	};
	const onShowModal = () => {
		setModalStatus(MODAL_OPENED);
	};

	return (
		<div className="App">
			<EventForm />
			<HostLoginMessage onShowModal={onShowModal} />
			{loginModalStatus && <LoginModal onHideModal={onHideModal} />}
		</div>
	);
}

export default App;
