import styled from "styled-components";

const SkeletonColumnStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: flex-start;
	align-items: center;
	border-radius: 8px;
	min-width: "20rem";
	height: "100%";
	box-sizing: border-box;
	& + & {
		margin-left: 8px;
	}
`;

const SkeletonContentStyle = styled.div`
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

export {SkeletonColumnStyle, SkeletonContentStyle};

