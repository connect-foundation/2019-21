import React from "react";

const MODAL_CLOSED = false;
const MODAL_OPENED = true;

function useCommonModal(initialState = MODAL_CLOSED) {
	const [isOpened, setIsOpened] = React.useState(initialState);
	const openModal = () => {
		setIsOpened(MODAL_OPENED);
	};
	const closeModal = () => {
		setIsOpened(MODAL_CLOSED);
	};

	return {
		isOpened,
		openModal,
		closeModal,
	};
}

export default useCommonModal;
