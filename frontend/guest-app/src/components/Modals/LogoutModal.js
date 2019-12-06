import React from "react";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CommonModal from "../CommonComponent/CommonModal/CommonModal.js";

function LogOutModal({isOpened = false, onCancelClick, onLogout}) {
	return (
		<CommonModal isOpened={isOpened} onCancelClick={onCancelClick}>
			<p>로그아웃 하시겠습니까?</p>
			<Grid container direction={"row"} justify="flex-end">
				<Button onClick={onCancelClick}>Cancel</Button>
				<Button color="secondary" onClick={onLogout}>
					로그아웃
				</Button>
			</Grid>
		</CommonModal>
	);
}

export default LogOutModal;
