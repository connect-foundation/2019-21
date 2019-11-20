import React, {useState} from "react";
import QuestionCard from "./QuestionCard.js";
import DummyData from "./QuestionDummyData.js";

function QuestionContainer(props) {
	const [datas] = useState({questions: DummyData()});

	return (
		<div>
			{datas.questions.map((question, idx) => (
				<QuestionCard {...question} key={idx}/>
			))}
		</div>
	);
}

export default QuestionContainer;
