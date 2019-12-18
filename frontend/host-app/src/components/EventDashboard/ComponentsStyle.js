import styled, {keyframes} from "styled-components";

const Open = keyframes`
	0% { 
		min-width: 10rem; 
		height: 10%;
	}
	100% { 
		min-width: 20rem;
		height: 100%;
	}
`;

const Close = keyframes`
	0% { 
		min-width: 20rem;
		height: 100%;	
	}
	100% { 
		min-width: 10rem; 
		height: 10%;
	}
`;

const TitleBox = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-around;
	min-height: 2.5rem;
`;

const TitleStyle = styled.div`
	font-weight: bold;
`;

const RightSide = styled.div`
	margin-left: 2rem;
	display: flex;
	align-items: center;
`;

const EmptyContentBox = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: auto;
	align-items: center;
	border-radius: 8px;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	height: 100%;
	box-sizing: border-box;
`;

const EmptyContentDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-size: 1.5rem;
	margin: auto 0;
	button {
		margin-top: 1rem;
	}
`;

const ContentStyle = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	overflow: auto;
	justify-content: left;
	align-items: flex-start;
	padding: 4px 8px;
	overflow-x: auto;
	flex-wrap: nowrap;
`;

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
	height: 100%;
	box-sizing: border-box;
	margin-left: 8px;
`;

const ModerationStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	animation: ${props => ((props.state) ? Open : Close)};
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
	justify-content: flex-start;
	align-items: center;
	border-radius: 8px;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	min-width: ${props => (props.state ? "20rem" : "8rem")};
	height: 100%;
	min-height: 2.5rem;
	box-sizing: border-box;
	& + & {
		margin-left: 8px;
	}
`;



export {
	TitleStyle,
	TitleBox,
	RightSide,
	EmptyContentBox,
	EmptyContentDiv,
	ContentStyle,
	QuestionStyle,
	ModerationStyle,
};
