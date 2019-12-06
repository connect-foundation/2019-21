import styled from "styled-components";

const QuestionHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;

const QuestionMeta = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
`;

const QuestionInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-content: left;
	margin-left: 1rem;
`;

const QuestionBody = styled.div`
	font-size: 0.9rem;
	margin: 1rem 0;
`;

const QuestionButtons = styled.div`
	margin-left:auto;
`;

export {QuestionHeader, QuestionMeta, QuestionInfo, QuestionBody, QuestionButtons};
