import React, {useState} from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard.js";
import DummyData from "./QuestionDummyData.js";
import QuestionContainerHeader from "./QuestionContainerHeader.js";
import useTabGroup from "../TabGroup/useTabGroup.js";
import QuestionInputArea from "./QuestionInputArea.js";
import useTextInput from "../Modals/EditPriofileModal/useTextInput.js";
import useUserAvata from "./useUserAvata.js";

const Container = styled.div``;

function QuestionContainer(props) {
	const [datas] = useState({questions: DummyData()});
	const {tabIdx, selectTabIdx} = useTabGroup();
	const userAvataState = useUserAvata();
	const textInputState = useTextInput();

	return (
		<Container>
			<QuestionContainerHeader
				questionNumber={datas.questions.length}
				tabIdx={tabIdx}
				onSelectTab={selectTabIdx}
			/>
			<QuestionInputArea
				userAvataState={userAvataState}
				textInputState={textInputState}
			/>
			{datas.questions.map((question, idx) => (
				<QuestionCard {...question} key={idx} />
			))}
		</Container>
	);
}

export default QuestionContainer;
