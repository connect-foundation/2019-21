import React from "react";
import PropTypes from "prop-types";
import {Button} from "@material-ui/core";

function AskButton(props) {
	const {onClick} = props;

	return (
		<Button variant="contained" color={"primary"} onClick={onClick}>
			질문
		</Button>
	);
}

AskButton.propTypes = {
	onClick: PropTypes.func,
};

export default AskButton;
