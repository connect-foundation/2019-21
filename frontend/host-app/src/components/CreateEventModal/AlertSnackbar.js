import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const ERROR_MESSAGE = {
	nameError: "이벤트 이름을 확인해주세요",
	dateError: "시작날짜를 다시 선택해주세요",
};

function AlertSnackbar(props) {
	const {handleClose, open, errorState} = props;
	let message = ERROR_MESSAGE.dateError;

	if (errorState.eventName === true) {
		message = ERROR_MESSAGE.nameError;
	}

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			ContentProps={{
				"aria-describedby": "can't create event",
			}}
			message={<span id="message-id">{message}</span>}
			action={[
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>,
			]}
		/>
	);
}

export default AlertSnackbar;
