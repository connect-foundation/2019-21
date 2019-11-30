import React from "react";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import gray from "@material-ui/core/colors/grey.js";
import PropTypes from "prop-types";

const RECENT_TAB_IDX = 1;
const POPULAR_TAB_IDX = 2;

function QuestionContainerHeader(props) {
	const {questionNumber, tabIdx, onSelectTab} = props;

	return (
		<Paper style={{backgroundColor: gray[300]}}>
			<Tabs value={tabIdx} onChange={onSelectTab}>
				<Tab disabled style={{minWidth: "1rem"}} />
				<Tab label={"최근순"} selected={tabIdx === RECENT_TAB_IDX} />
				<Tab label={"인기순"} selected={tabIdx === POPULAR_TAB_IDX} />
				<Tab
					disabled
					icon={
						<Typography color={"textSecondary"}>
							총 {questionNumber} 질문
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

QuestionContainerHeader.propTypes = {
	questionNumber: PropTypes.number,
	tabIdx: PropTypes.number,
	onSelectTab: PropTypes.func,
};

QuestionContainerHeader.defaultProps = {
	questionNumber: 0,
	tabIdx: 1,
};

export default QuestionContainerHeader;
