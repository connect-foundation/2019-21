import React from "react";
import PropTypes from "prop-types";
import {Scrollbars} from "react-custom-scrollbars";

function TabBody(props) {
	const {children, hidden} = props;

	return (
		<Scrollbars
			hidden={hidden}
			style={{
				width: "100%",
				height: "calc(100vh - 7rem)",
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
