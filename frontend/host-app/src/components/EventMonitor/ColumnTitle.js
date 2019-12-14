import React from "react";
import Title from "./Title.js";

function ColumnTitle({type, state, dataHandler, data, stateHandler}) {
	return (
		<Title
			type={type}
			state={state}
			stateHandler={stateHandler}
			data={data}
			dataHandler={dataHandler}
		/>
	);
}

export default ColumnTitle;
