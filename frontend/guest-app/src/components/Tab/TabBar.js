import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {PollTabIcon, QnATabIcon} from "./TabIcons.js";
import React from "react";

export function TabBar({tabIdx, onTabIdxChange, showQnABadge, showPollBadge}) {
	return (
		<Paper square>
			<Tabs
				value={tabIdx}
				onChange={onTabIdxChange}
				aria-label="simple tabs example"
				variant="fullWidth"
			>
				<Tab icon={<QnATabIcon showBadge={showQnABadge} />} />
				<Tab icon={<PollTabIcon showBadge={showPollBadge} />} />
			</Tabs>
		</Paper>
	);
}
