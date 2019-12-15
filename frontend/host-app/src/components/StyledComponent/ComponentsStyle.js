import styled from "styled-components";



const BoldTitleStyle = styled.div`
	font-weight: bold;
`;

// todo 좀더 명확한 이름
const RightSide = styled.div`
	margin-left: 2rem;
	display: flex;
	align-items: center;
`;

// todo 좀더 명확한 이름
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

export {
	BoldTitleStyle,
	RightSide,
	ContentStyle,
};
