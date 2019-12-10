import React from "react";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CommonModal from "../CommonComponent/CommonModal/CommonModal.js";

function LogOutModal({isOpened = false, onCancelClick, onLogout}) {
	return (
		<CommonModal isOpened={isOpened} onCancelClick={onCancelClick}>
			<p>로그아웃 하시겠습니까?</p>
			<Grid container direction={"row"} justify="flex-end">
				<Button variant={"contained"} onClick={onCancelClick}>
					취소
				</Button>
				<Box p={1} />
				<Button
					color="primary"
					variant={"contained"}
					onClick={onLogout}
				>
					확인
				</Button>
			</Grid>
		</CommonModal>
	);
}

export default LogOutModal;
