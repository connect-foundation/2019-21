import React, {createContext, useContext} from "react";
import useToggleReducer from "../QuestionContainer/useToggleReducer.js";

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

export function UIController(props) {
	const {children} = props;
	const UIControlReducer = useUIControlReducers();

	return (
		<UIControlProvider value={UIControlReducer}>
			{children}
		</UIControlProvider>
	);
}

export function useUIControllerContext() {
	return useContext(UIControlContext);
}
