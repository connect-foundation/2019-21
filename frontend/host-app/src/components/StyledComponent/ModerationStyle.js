import styled, {keyframes} from "styled-components";

const Open = keyframes`
	0% { 
		min-width: 8rem; 
		height: 13%;
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
		min-width: 8rem; 
		height: 13%;
	}
`;

const ModerationStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	animation: ${props => (props.state ? Open : Close)};
	animation-duration: 0.2s;
	animation-fill-mode: forwards;
	justify-content: flex-start;
	align-items: center;
	border-radius: 8px;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	min-width: ${props => (props.state ? "20rem" : "8rem")};
	height: ${props => props.height || "100%"};
	min-height: 2.5rem;
	box-sizing: border-box;
	& + & {
		margin-left: 8px;
	}
`;

export default ModerationStyle;
