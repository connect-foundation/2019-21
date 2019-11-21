import React from "react";

function useDrawer() {
	const [isOpen, setState] = React.useState(false);
	const toggleDrawer = () => {
		setState(!isOpen);
	};

	return {
		isOpen,
		toggleDrawer,
	};
}

export default useDrawer;
