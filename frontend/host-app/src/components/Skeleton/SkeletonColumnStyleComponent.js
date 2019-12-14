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

export default SkeletonColumnStyle;
