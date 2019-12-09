import React from "react";
import PropTypes from "prop-types";
import {styled} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const TextField = styled(Typography)({
	marginLeft: 10,
	textAlign: "center",
	textDecoration: "underline",
});

function CurrentRepliesTextField(props) {
	return <TextField variant="h6">{`${props.children} replies`}</TextField>;
}

CurrentRepliesTextField.propTypes = {
	children: PropTypes.node,
};

export default CurrentRepliesTextField;
