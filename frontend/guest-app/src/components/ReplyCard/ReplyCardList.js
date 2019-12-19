import React from "react";
import PropTypes from "prop-types";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import gray from "@material-ui/core/colors/grey.js";
import ReplyCard from "./ReplyCard.js";

const RepliesListStyle = styled(Paper)({
	width: "100%",
	backgroundColor: gray[300],
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
