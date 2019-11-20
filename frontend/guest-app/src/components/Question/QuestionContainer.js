import React, {useState} from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard.js";
import DummyData from "./QuestionDummyData.js";

const Container = styled.div``;

function QuestionContainer(props) {
	const [datas] = useState({questions: DummyData()});

	return (
		<Container>
			{datas.questions.map((question, idx) => (
				<QuestionCard {...question} key={idx} />
			))}
		</Container>
	);
}

export default QuestionContainer;
