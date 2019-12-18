import {useContext} from "react";
import QuestionsContext from "./QuestionsContext.js";

function useQuestions() {
	return useContext(QuestionsContext);
}

export default useQuestions;
