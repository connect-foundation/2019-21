import React, {useState} from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard.js";
import DummyData from "./QuestionDummyData.js";
import QuestionContainerHeader from "./QuestionContainerHeader.js";
import useTabGroup from "../TabGroup/useTabGroup.js";

const Container = styled.div``;

function QuestionContainer(props) {
	const [datas] = useState({questions: DummyData()});
	const {tabIdx, selectTabIdx} = useTabGroup();

	return (
		<Container>
			<QuestionContainerHeader
				questionNumber={datas.questions.length}
				tabIdx={tabIdx}
				onSelectTab={selectTabIdx}
			/>
			{datas.questions.map((question, idx) => (
				<QuestionCard {...question} key={idx} />
			))}
		</Container>
	);
}

export default QuestionContainer;
