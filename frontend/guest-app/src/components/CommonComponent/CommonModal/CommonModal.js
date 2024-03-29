import React from "react";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles.js";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";

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

function CommonModal(props) {
	const {isOpened, onCancelClick} = props;
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	return (
		<Modal open={isOpened} onClose={onCancelClick}>
			<Paper style={modalStyle} className={classes.paper}>
				{props.children}
			</Paper>
		</Modal>
	);
}

CommonModal.propTypes = {
	children: PropTypes.node,
	isOpened: PropTypes.bool,
	onCancelClick: PropTypes.func,
};

export default CommonModal;
