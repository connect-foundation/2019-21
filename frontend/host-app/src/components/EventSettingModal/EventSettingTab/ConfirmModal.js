import React from "react";
import {Modal, Button, Grid, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles.js";

function getModalStyle() {
	return {
		top: `${50}%`,
		left: `${50}%`,
		transform: `translate(-${50}%, -${50}%)`,
	};
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function ConfirmModal(props) {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	// todo common 모달로 변경가능함
	// todo common 버튼으로 변경가능함
	// todo text 수정 필요함..
	return (
		<Modal
			aria-labelledby="confirm-modal-title"
			aria-describedby="confirm-modal-description"
			open={props.open}
			onClose={props.handleClose}
		>
			<div style={modalStyle} className={classes.paper}>
				<Typography>정말취소?</Typography>
				<Grid container direction={"row"} justify="flex-end">
					<Button onClick={props.handleClose}>취소</Button>
					<Button color="secondary" onClick={props.reset}>
						버리기
					</Button>
				</Grid>
			</div>
		</Modal>
	);
}

export default ConfirmModal;
