import styled from "styled-components";

const QuestionStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	border-radius: 8px;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	min-width: 20rem;
	height: ${props => props.height || "100%"};
	box-sizing: border-box;
	margin-left: 8px;
`;

export default QuestionStyle;
