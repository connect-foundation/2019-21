import React, {useState, useEffect} from "react";
import _ from "lodash";
import QuestionCard from "./QuestionCard.js";

function QuestionContainer(props) {
	const dummy = {userName: "username", date: "date", question: "question"};
	const init = _.range(10).map(x => dummy);
	const [datas, updateDatas] = useState(init);

	useEffect(() => {
		// async function fetch() {
		// 	const fetched = await axios.get({
		// 		headers: {
		// 			"Access-Control-Allow-Origin": "*",
		// 		},
		// 		proxy: {
		// 			host: "10.180.171.187",
		// 			port: 3000,
		// 		},
		// 		method: "get",
		// 	});
		//
		// 	console.log(fetched);
		//
		// 	updateDatas(fetched);
		// }
		//
		// fetch();
	}, []);

	console.log(updateDatas);
	return (
		<div>
			{datas.map((data, idx) => (
				<QuestionCard {...data} key={idx} />
			))}
		</div>
	);
}

export default QuestionContainer;
