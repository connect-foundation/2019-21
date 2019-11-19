import React from "react";

function useModalState() {
	const [isOpened, setOpen] = React.useState(false);
	const openModal = () => {
		setOpen(true);
	};
	const closeModal = () => {
		setOpen(false);
	};

	return {
		isOpened,
		openModal,
		closeModal,
	};
}

export default useModalState;
