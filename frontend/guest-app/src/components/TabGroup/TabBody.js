import React from "react";
import PropTypes from "prop-types";
import {Scrollbars} from "react-custom-scrollbars";
import grey from "@material-ui/core/colors/grey.js";

function TabBody(props) {
	const {children, hidden} = props;

	// todo 스타일 분리?
	return (
		<Scrollbars
			hidden={hidden}
			style={{
				width: "100%",
				height: "calc(100vh - 7rem)",
				backgroundColor: grey[300],
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
