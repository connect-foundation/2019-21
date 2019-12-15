import React from "react";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CommonModal from "../CommonModal/CommonModal.js";


// todo proptype 추가
function LogOutModal({isOpened = false, onCancelClick, onLogout}) {
	// 컴포넌트 쪼개기
	return (
		<CommonModal isOpened={isOpened} onCancelClick={onCancelClick}>
			<Typography>로그아웃 하시겠습니까?</Typography>
			<Box p={1} />
			<Grid container direction={"row"} justify="flex-end">
				<Button variant={"contained"} onClick={onCancelClick}>
					취소
				</Button>
				<Box p={1} />
				<Button
					color="secondary"
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
