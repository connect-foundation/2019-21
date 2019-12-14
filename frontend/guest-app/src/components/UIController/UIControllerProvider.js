import React, {createContext, useContext} from "react";
import useToggleReducer from "../Question/useToggleReducer.js";

const UIControlContext = createContext([]);

const UIControlProvider = UIControlContext.Provider;

function useUIControlReducers() {
	const newQuestionInputDrawer = useToggleReducer();
	const editQuestionInputDrawer = useToggleReducer();
	const questionEditMenuReducer = useToggleReducer();
	const myQuestionDrawerReducer = useToggleReducer();

	return {
		newQuestionInputDrawer,
		editQuestionInputDrawer,
		questionEditMenuReducer,
		myQuestionDrawerReducer,
	};
}

export function UIControllerProvider(props) {
	const {children} = props;
	const UIControlReducer = useUIControlReducers();

	return (
		<UIControlProvider value={UIControlReducer}>
			{children}
		</UIControlProvider>
	);
}

export function useUIController() {
	return useContext(UIControlContext);
}
