import React from "react";
import PropTypes from "prop-types";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AppDrawNavBar from "../AppDrawer/AppDrawerNavBar";
const StyledPaper = styled(Paper)({
	width: "100vw",
	height: "100vh",
});

function RepliesPaper(props) {
	const {onClose} = props;
	return (
		<>
			<StyledPaper>
				<AppDrawNavBar onClick={onClose} title="답글" />
			</StyledPaper>
		</>
	);
}

RepliesPaper.propTypes = {
	title: PropTypes.string,
	onClose: PropTypes.func,
};

export default RepliesPaper;
