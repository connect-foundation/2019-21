import styled from "styled-components";

const modalHeight = 38; // 37;
const modalWidth = 28.125;

const CreateEventModalContent = styled.div`
	position: relative;
	top: calc(50% - ${modalHeight / 2}rem);
	left: calc(50% - ${modalWidth / 2}rem);
	display: flex;
	flex-direction: column;
	width: ${modalWidth}rem;
	height: ${modalHeight}rem;
	background-color: white;
	// padding-left: 1.25rem;
	padding: 0 1.5rem;
	box-sizing: border-box;
`;

export default CreateEventModalContent;
