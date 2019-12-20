import React from "react";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import gray from "@material-ui/core/colors/grey.js";
import PropTypes from "prop-types";
import useQuestions from "../../contexts/Questions/useQuestions.js";

const RECENT_TAB_IDX = 1;
const POPULAR_TAB_IDX = 2;

function QuestionContainerTabBar(props) {
	const {questions} = useQuestions();
	const {tabIdx, onSelectTab} = props;

	return (
		<Paper style={{backgroundColor: gray[300]}}>
			<Tabs
				value={tabIdx}
				onChange={onSelectTab}
				indicatorColor="primary"
				textColor="primary"
			>
				<Tab disabled style={{minWidth: "1rem"}} />
				<Tab
					label={<Typography>시간순</Typography>}
					selected={tabIdx === RECENT_TAB_IDX}
				/>
				<Tab
					label={<Typography>인기순</Typography>}
					selected={tabIdx === POPULAR_TAB_IDX}
				/>
				<Tab
					disabled
					icon={
						<Typography color={"textSecondary"}>
							총 {questions.length} 질문
						</Typography>
					}
					style={{
						position: "absolute",
						right: 0,
					}}
				/>
			</Tabs>
		</Paper>
	);
}

QuestionContainerTabBar.propTypes = {
	questionNumber: PropTypes.number,
	tabIdx: PropTypes.number,
	onSelectTab: PropTypes.func,
};

QuestionContainerTabBar.defaultProps = {
	questionNumber: 0,
	tabIdx: 1,
};

export default QuestionContainerTabBar;
