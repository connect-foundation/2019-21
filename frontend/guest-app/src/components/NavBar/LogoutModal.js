import makeStyles from "@material-ui/core/styles/makeStyles.js";
import React from "react";
import Modal from "@material-ui/core/Modal";
import {Grid} from "@material-ui/core";
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

function LogOutModal({isOpened, onCancelClick, onConfirmClick}) {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	return (
		<Modal open={isOpened} onClose={onCancelClick}>
			<div style={modalStyle} className={classes.paper}>
				<p>Do you want to logout</p>
				<Grid container direction={"row"} justify="flex-end">
					<Button className={classes.button} onClick={onCancelClick}>
						Cancel
					</Button>
					<Button
						color="secondary"
						className={classes.button}
						onClick={onConfirmClick}
					>
						logout
					</Button>
				</Grid>
			</div>
		</Modal>
	);
}

export default LogOutModal;
