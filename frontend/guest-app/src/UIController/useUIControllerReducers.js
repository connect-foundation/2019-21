import useToggleReducer from "../hooks/useToggleReducer.js";

function useUIControllerReducers() {
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

export default useUIControllerReducers;
