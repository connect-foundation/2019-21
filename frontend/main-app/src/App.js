/**
 * Review 요청
 * line #: 27
 * 모달을 띄우는 방식을 이런식으로 코딩하면 되는지 궁금합니다.
 **/ 


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
