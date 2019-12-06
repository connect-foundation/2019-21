import React from "react";
import PropTypes from "prop-types";
import {Typography, Box} from "@material-ui/core";

export default function TabContent(props) {
	const {children, value, index, ...other} = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			<Box p={3}>{children}</Box>
		</Typography>
	);
}

TabContent.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
