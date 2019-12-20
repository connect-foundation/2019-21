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

const ReplyInfo = styled.div`
	display: flex;
	width: 90%;
	align-items: center;
	margin-left: 0.3rem;
	margin-top: 0.3rem;
`;

const QuestionBody = styled.div`
	font-size: 0.9rem;
	margin: 1rem 0;
`;

const QuestionButtons = styled.div`
	margin-left: auto;
`;

const ThumbUpContainer = styled.div`
	display: flex;
	margin-top: 0.1rem;
	align-items: center;
`;

const ReplyContainer = styled.div`
	margin-left: auto;
	cursor: pointer;
`;

const ReplyBody = styled.div`
	margin: 0.5rem 1rem;
`;

const FocusedDiv = styled.div`
	width: 100%;
`;

const UnFocusedDiv = styled.div`
	width: 100%;
	overflow: auto;
`;

export {
	QuestionHeader,
	QuestionMeta,
	QuestionInfo,
	QuestionBody,
	QuestionButtons,
	ThumbUpContainer,
	ReplyContainer,
	ReplyBody,
	ReplyInfo,
	FocusedDiv,
	UnFocusedDiv,
};
