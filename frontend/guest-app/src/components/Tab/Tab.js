import React from "react";
import TabBar from "./TabBar.js";
import TabPanel from "./TabPanel.js";
import QuestionContainer from "../Question/QuestionContainer.js";
import useTabBarState from "./TabBarState.js";

function Tab() {
	const tabBarState = useTabBarState();

	return (
		<div>
			<TabBar
				{...{
					tabIdx: tabBarState.tabIdx,
					onTabIdxChange: tabBarState.selectTabIdx,
				}}
			/>
			<TabPanel value={tabBarState.tabIdx} index={0}>
				<QuestionContainer />
			</TabPanel>
			<TabPanel value={tabBarState.tabIdx} index={1}>
				<div>vote me</div>
			</TabPanel>
		</div>
	);
}

export default Tab;
