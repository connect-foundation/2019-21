import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import {PollTabIcon, QnATabIcon} from "./TabIcons.js";
import useTabGroup from "./useTabGroup.js";
import TabBody from "./TabBody.js";
import QuestionContainer from "../Question/QuestionContainer.js";
import PollContainer from "../Poll/PollContainer.js";

const TabGroupStyle = styled.div`
	position: fixed;
	top: 4rem;
	width: 100%;
	z-index: 1;
`;

function TabGroup({showQnABadge = true, showPollBadge}) {
	const {tabIdx, selectTabIdx} = useTabGroup();

	return (
		<TabGroupStyle>
			<Tabs value={tabIdx} onChange={selectTabIdx} variant="fullWidth">
				<Tab icon={<QnATabIcon showBadge={showQnABadge} />} />
				<Tab icon={<PollTabIcon showBadge={showPollBadge} />} />
			</Tabs>
			<TabBody hidden={tabIdx !== 0}>
				<QuestionContainer />
			</TabBody>
			<TabBody hidden={tabIdx !== 1}>
				<PollContainer />
			</TabBody>
		</TabGroupStyle>
	);
}

export default TabGroup;
