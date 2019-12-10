import styled from "styled-components";

const TitleBox = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-around;
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
	flex-direction: column;
	font-size: 2rem;
	margin: auto 0;
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

const ColumnStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	min-width: 20rem;
	justify-content: flex-start;
	align-items: center;
	border-radius: 8px;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	height: ${props => props.height || "100%" };
	box-sizing: border-box;
	margin-bottom: 1rem;
	& + & {
		margin-left: 8px;
	}
`;

const FooterStyle = styled.div`
	width: 90%;
	margin-top: auto;
`;

export {TitleStyle, TitleBox, RightSide, EmptyContentBox, EmptyContentDiv, ContentStyle, ColumnStyle,FooterStyle}