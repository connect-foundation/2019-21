import React from "react";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RepliesContainer from "./RepliesContainer";

const StyledPaper = styled(Paper)({
	width: "100vw",
	height: "100vh",
	position: "relative",
});

function RepliesPaper(props) {
	return (
		<>
			<StyledPaper>
				<RepliesContainer {...props} />
			</StyledPaper>
		</>
	);
}

export default RepliesPaper;
