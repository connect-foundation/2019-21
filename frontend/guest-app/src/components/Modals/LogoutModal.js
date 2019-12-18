import React from "react";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CommonModal from "../CommonComponent/CommonModal/CommonModal.js";
import CancelButton from "../CommonComponent/CommonButtons/CancelButton.js";
import ConfirmButton from "../CommonComponent/CommonButtons/ConfirmButton.js";

function LogOutModal({isOpened = false, onCancelClick, onLogout}) {
	return (
		<CommonModal isOpened={isOpened} onCancelClick={onCancelClick}>
			<Typography>로그아웃 하시겠습니까?</Typography>
			<Box p={1} />
			<Grid container direction={"row"} justify="flex-end">
				<CancelButton onClick={onCancelClick} />
				<ConfirmButton onClick={onLogout} />
			</Grid>
		</CommonModal>
	);
}

export default LogOutModal;
