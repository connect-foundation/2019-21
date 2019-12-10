import React, {useState} from "react";
import Title from "./Title";
import QuestionContainer from "./Questions/QuestionContainer";
import ColumnFooter from "./ColumnFooter";
import {ColumnStyle} from "./ComponentsStyle";
import {filterStared} from "../libs/utils";

function Column({type, state, stateHandler, data, dataHandler, handleStar}) {
	const [heightWeight,setHeightWeight] = useState(0);

	return (
		<ColumnStyle height={`${100 +(heightWeight * 50)}%`}>
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
				containerType={"focus"}
			/>
			<QuestionContainer
				type={type}
				datas={filterStared(false, data)}
				dataHandler={dataHandler}
				handleStar={handleStar}
				containerType={"unFocus"}
			/>
			<ColumnFooter data={heightWeight} handler={setHeightWeight}/>
		</ColumnStyle>
	);
}

export default Column;
