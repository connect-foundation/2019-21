import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import CommonModal from "../CommonComponent/CommonModal/CommonModal.js";
import ConfirmButton from "../atoms/ConfirmButton.js";
import CancelButton from "../atoms/CancelButton.js";

function UndoLikeConfirmModal({isOpened, onCancelClick, onConfirmClick}) {
	return (
		<CommonModal isOpened={isOpened}>
			<Box p={1} />
			<Typography>좋아하기를 취소하시겠습니까?</Typography>
			<Box p={2} />
			<Grid container direction={"row"} justify="flex-end">
				<CancelButton onClick={onCancelClick} />
				<ConfirmButton onClick={onConfirmClick} />
			</Grid>
		</CommonModal>
	);
}

export default UndoLikeConfirmModal;
