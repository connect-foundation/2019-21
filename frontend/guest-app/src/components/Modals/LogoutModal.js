import React from "react";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CommonModal from "../CommonModal.js";

function LogOutModal({isOpened = false, onCancelClick, onLogout}) {
	return (
		<CommonModal isOpened={isOpened} onCancelClick={onCancelClick}>
			<p>Do you want to logout</p>
			<Grid container direction={"row"} justify="flex-end">
				<Button onClick={onCancelClick}>Cancel</Button>
				<Button color="secondary" onClick={onLogout}>
					logout
				</Button>
			</Grid>
		</CommonModal>
	);
}

export default LogOutModal;
