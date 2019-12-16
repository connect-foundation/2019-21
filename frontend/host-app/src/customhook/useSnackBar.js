import {useState} from "react";

const useSnackBar = () => {
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const snackBarHandleClose = reason => {
		if (reason === "clickaway") {
			return;
		}
		setSnackBarOpen(false);
	};

	return {snackBarOpen, snackBarHandleClose, setSnackBarOpen};
};

export default useSnackBar;
