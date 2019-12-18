import useToggle from "../../hooks/useToggle.js";

function useUIControllerReducers() {
	const newQuestionInputDrawer = useToggle();
	const editQuestionInputDrawer = useToggle();
	const questionEditMenuReducer = useToggle();
	const myQuestionDrawerReducer = useToggle();

	return {
		newQuestionInputDrawer,
		editQuestionInputDrawer,
		questionEditMenuReducer,
		myQuestionDrawerReducer,
	};
}

export default useUIControllerReducers;
