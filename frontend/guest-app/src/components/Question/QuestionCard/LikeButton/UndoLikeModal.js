import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import CommonModal from "../../../CommonModal/CommonModal.js";

function CancelButton(props) {
	return (
		<Button color={"default"} {...props}>
			취소
		</Button>
	);
}

function ConfirmButton(props) {
	return (
		<Button color="secondary" {...props}>
			확인
		</Button>
	);
}

function UndoLikeConfirmModal({isOpened, onCancelClick, onConfirmClick}) {
	return (
		<CommonModal isOpened={isOpened}>
			<Box p={1} />
			<Typography>좋아하기를 취소하기겠습니까?</Typography>
			<Box p={2} />
			<Grid container direction={"row"} justify="flex-end">
				<CancelButton onClick={onCancelClick} />
				<ConfirmButton onClick={onConfirmClick} />
			</Grid>
		</CommonModal>
	);
}

export default UndoLikeConfirmModal;
