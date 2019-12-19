import React from "react";
import PropTypes from "prop-types";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ReplyCard from "./ReplyCard.js";

const RepliesListStyle = styled(Paper)({
	width: "100%",
	// backgroundColor: "#e7f5ff",
});

function ReplyCardList(props) {
	const {replies} = props;

	return (
		<RepliesListStyle>
			{replies.map((reply, idx) => (
				<ReplyCard {...reply} key={idx} />
			))}
		</RepliesListStyle>
	);
}

ReplyCardList.propTypes = {
	replies: PropTypes.any,
};

export default ReplyCardList;
