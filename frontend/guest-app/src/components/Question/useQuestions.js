import {useState} from "react";
import DummyData from "./QuestionDummyData.js";

function useQuestions(initialState = DummyData()) {
	const [questions, setState] = useState(initialState);
	const addQuestion = newQuestion => {
		setState([newQuestion, ...questions]);
	};

	return {questions, addQuestion};
}

export default useQuestions;
