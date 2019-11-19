import React, {useState} from "react";
import "./App.css";
import QuestionContainer from "../components/Question/QuestionContainer.js";
import TabPanel from "../components/Tab/TabPanel.js";
import NavBar from "../components/NavBar/NavBar.js";
import TabBar from "../components/Tab/TabBar.js";

export default function App() {
	const QUESTION_TAB_IDX = 0;
	// const VOTE_TAB_IDX = 1;
	const [tabIdx, setTabIdx] = useState(QUESTION_TAB_IDX);

	const onTabIdxChange = (event, newValue) => {
		setTabIdx(newValue);
	};

	return (
		<div>
			<NavBar />
			<TabBar {...{tabIdx, onTabIdxChange}} />

			<TabPanel value={tabIdx} index={0}>
				<QuestionContainer />
			</TabPanel>
			<TabPanel value={tabIdx} index={1}>
				<div>vote me</div>
			</TabPanel>
		</div>
	);
}
