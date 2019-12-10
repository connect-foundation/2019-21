import React from "react";
import Title from "./Title";
import QuestionContainer from "./Questions/QuestionContainer";
import {ColumnStyle} from "./ComponentsStyle";
import {filterStared} from "../libs/utils";

function Column({type, state, stateHandler, data, dataHandler, handleStar}) {
	return (
		<ColumnStyle>
			<Title
				type={type}
				state={state}
				stateHandler={stateHandler}
				data={data}
				dataHandler={dataHandler}
			/>
			<QuestionContainer
				type={type}
				datas={filterStared(true, data)}
				dataHandler={dataHandler}
				handleStar={handleStar}
			/>
			<QuestionContainer
				type={type}
				datas={filterStared(false, data)}
				dataHandler={dataHandler}
				handleStar={handleStar}
			/>
		</ColumnStyle>
	);
}

export default Column;
