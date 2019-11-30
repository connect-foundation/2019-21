import {useState} from "react";

const compareByDate = (a, b) => {
	return a.createdAt.localeCompare(b.createdAt);
};

const compareByLikeCount = (a, b) => {
	return a.likeCount - b.likeCount;
};

function useQuestionCardList(initialState = []) {
	const [questions, setState] = useState(initialState);
	const addQuestion = newQuestion => {
		setState([newQuestion, ...questions]);
	};
	const sortByRecent = () => {
		setState([...questions.sort(compareByDate)]);
	};
	const sortByLikeCount = () => {
		setState([...questions.sort(compareByLikeCount)]);
	};


	return {questions, addQuestion, setState, sortByLikeCount, sortByRecent};
}

export default useQuestionCardList;
