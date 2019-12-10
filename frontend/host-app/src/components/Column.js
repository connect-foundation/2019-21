import React from "react";
import Title from "./Title";
import QuestionContainer from "./Questions/QuestionContainer";
import {ColumnStyle} from "./ComponentsStyle";
import {filterStared} from "../libs/utils";

function Column({type, state, stateHandler, data, dataHandler, handleStar}) {
	const staredData = filterStared(true, data);

	return (
		<ColumnStyle height={`${100 + (staredData.questions.length * 10)}%` }>
			<Title
				type={type}
				state={state}
				stateHandler={stateHandler}
				data={data}
				dataHandler={dataHandler}
			/>
			<QuestionContainer
				type={type}
				datas={staredData}
				dataHandler={dataHandler}
				handleStar={handleStar}
				containerType={"focus"}
			/>
			<QuestionContainer
				type={type}
				datas={filterStared(false, data)}
				dataHandler={dataHandler}
				handleStar={handleStar}
				containerType={"unFocus"}
			/>
		</ColumnStyle>
	);
}

export default Column;
