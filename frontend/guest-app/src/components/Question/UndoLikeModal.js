import {makeStyles} from "@material-ui/core";
import React from "react";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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

export function UndoLikeConfirmModal({open, onCancelClick, onConfirmClick}) {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	return (
		<Modal open={open}>
			<div style={modalStyle} className={classes.paper}>
				<p id="simple-modal-description">
          Would you like to undo your like?
				</p>
				<Grid container direction={"row"} justify="flex-end">
					<Button className={classes.button} onClick={onCancelClick}>
            Cancel
					</Button>
					<Button
						color="secondary"
						className={classes.button}
						onClick={onConfirmClick}
					>
            Confirm
					</Button>
				</Grid>
			</div>
		</Modal>
	);
}

export function UseUndoLikeConfirmModalState() {
	const [open, setOpen] = React.useState(false);
	const openModal = () => {
		setOpen(true);
	};
	const closeModal = () => {
		setOpen(false);
	};

	return {
		open,
		openModal,
		closeModal,
	};
}
