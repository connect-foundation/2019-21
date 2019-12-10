import React from "react";
import PropTypes from "prop-types";
import {styled} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const TextField = styled(Typography)({
	marginLeft: 10,
	textAlign: "center",
	textDecoration: "underline",
	cursor: "pointer",
	"&:hover": {
		color: "#3f51b5",
	},
});

function CurrentRepliesTextField(props) {
	const {openReplies} = props;

	return (
		<TextField variant="h6" onClick={openReplies}>
			{props.children}
		</TextField>
	);
}

CurrentRepliesTextField.propTypes = {
	children: PropTypes.node,
	openReplies: PropTypes.func,
};

export default CurrentRepliesTextField;
