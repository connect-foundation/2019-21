import styled from "styled-components";

const QuestionHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;

const QuestionMeta = styled.div`
	display: flex;
`;

const QuestionInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-content: left;
	margin-left: 1rem;
`;

const QuestionBody = styled.div``;

export {QuestionHeader, QuestionMeta, QuestionInfo, QuestionBody};
