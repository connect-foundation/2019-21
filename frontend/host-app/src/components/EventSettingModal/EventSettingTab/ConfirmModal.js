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

	return (
		<Modal
			aria-labelledby="confirm-modal-title"
			aria-describedby="confirm-modal-description"
			open={props.open}
			onClose={props.handleClose}
		>
			<div style={modalStyle} className={classes.paper}>
				<Typography>
					취소하시면 현재 입력한 내용이 저장되지 않습니다. 정말 취소
					하시겠습니까?
				</Typography>
				<Grid container direction={"row"} justify="flex-end">
					<Button onClick={props.handleClose}>돌아가기</Button>
					<Button color="secondary" onClick={props.reset}>
						취소
					</Button>
				</Grid>
			</div>
		</Modal>
	);
}

export default ConfirmModal;
