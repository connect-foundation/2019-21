import React from "react";
import PropTypes from "prop-types";
import {Scrollbars} from "react-custom-scrollbars";
import gray from "@material-ui/core/colors/grey.js";

function TabBody(props) {
	const {children, hidden} = props;

	return (
		<Scrollbars
			hidden={hidden}
			style={{
				width: "100%",
				height: "calc(100vh - 7rem)",
				backgroundColor: gray[300],
			}}
		>
			{children}
		</Scrollbars>
	);
}

TabBody.propTypes = {
	children: PropTypes.node,
	hidden: PropTypes.any.isRequired,
};

export default TabBody;
