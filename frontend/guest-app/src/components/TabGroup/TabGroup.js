import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import useTabs from "../../hooks/useTabs.js";
import TabBody from "./TabBody.js";
import QuestionContainer from "../QuestionContainer/QuestionContainer.js";
import PollApollo from "../Poll/PollApollo.js";
import QnATabIcon from "./QnATabIcon.js";
import PollTabIcon from "./PollTabIcon.js";
import QuestionsProvider from "../../models/Questions/QuestionProvider.js";

const TabGroupStyle = styled.div`
	position: fixed;
	top: 4rem;
	width: 100%;
	z-index: 1;
`;

const QUESTION_TAB_IDX = 0;
const POLL_TAB_IDX = 1;

function TabGroup({showQnABadge = true, showPollBadge}) {
	const {tabIdx, selectTabIdx} = useTabs(QUESTION_TAB_IDX);

	return (
		<TabGroupStyle>
			<Tabs value={tabIdx} onChange={selectTabIdx} variant="fullWidth">
				<Tab icon={<QnATabIcon showBadge={showQnABadge} />} />
				<Tab icon={<PollTabIcon showBadge={showPollBadge} />} />
			</Tabs>
			<TabBody hidden={tabIdx !== QUESTION_TAB_IDX}>
				<QuestionsProvider>
					<QuestionContainer />
				</QuestionsProvider>
			</TabBody>
			<TabBody hidden={tabIdx !== POLL_TAB_IDX}>
				<PollApollo />
			</TabBody>
		</TabGroupStyle>
	);
}

export default TabGroup;
