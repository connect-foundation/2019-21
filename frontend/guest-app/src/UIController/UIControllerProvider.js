import React from "react";
import UIControlContext from "./UIControllerContext.js";
import useUIControllerReducers from "./useUIControllerReducers.js";

function UIControllerProvider(props) {
	const {children} = props;
	const UIControlReducer = useUIControllerReducers();

	return (
		<UIControlContext.Provider value={UIControlReducer}>
			{children}
		</UIControlContext.Provider>
	);
}

export default UIControllerProvider;
