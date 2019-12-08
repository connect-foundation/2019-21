import React from "react";
import Title from "./Title";
import QuestionContainer from "./Questions/QuestionContainer";
import {ColumnStyle} from "./ComponentsStyle";

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
			<QuestionContainer type={type} datas={data} dataHandler={dataHandler} handleStar={handleStar}/>
		</ColumnStyle>
	);
}

export default Column;
