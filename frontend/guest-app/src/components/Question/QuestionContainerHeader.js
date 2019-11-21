import React from "react";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

function QuestionContainerHeader({questionNumber, tabIdx, onSelectTab}) {
	return (
		<Paper>
			<Tabs value={tabIdx} onChange={onSelectTab}>
				<Tab label={"최근순"} />
				<Tab label={"인기순"} />
				<Tab
					disabled
					icon={
						<Typography color={"textSecondary"}>
							{questionNumber} 질문
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

export default QuestionContainerHeader;
