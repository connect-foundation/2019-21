import React from "react";
import styled from "styled-components";
import Title from "./Title";
import QuestionContainer from "./Questions/QuestionContainer";

const ColumnStyle = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	min-width: 20rem;
	overflow: auto;
	justify-content: flex-start;
	align-items: center;
	border-radius: 8px;
	background-color: #f1f3f5;
	border: 1px solid #e9ecef;
	height: 100%;
	box-sizing: border-box;
	& + & {
		margin-left: 8px;
	}
`;

function Column({type, state, stateHandler, badgeState, data, dataHandler}) {
	return (
		<ColumnStyle>
			<Title type={type} state={state} stateHandler={stateHandler} badgeState={badgeState}/>
			<QuestionContainer type={type} datas={data} dataHandler={dataHandler}/>
		</ColumnStyle>
	);
}

export default Column;
