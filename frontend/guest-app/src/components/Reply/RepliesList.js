import React from "react";
import PropTypes from "prop-types";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Reply from "./Reply";

const RepliesListContainer = styled(Paper)({
	width: "100%",
	backgroundColor: "#FFFFF0",
});

function RepliesList(props) {
	const {replies} = props;

	return (
		<>
			<RepliesListContainer>
				{replies.map((reply, idx) => <Reply {...reply} key={idx} />)}
			</RepliesListContainer>
		</>
	);
}

RepliesList.propTypes = {
	replies: PropTypes.any,
};

export default RepliesList;
