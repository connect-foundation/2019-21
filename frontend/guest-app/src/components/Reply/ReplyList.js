import React from "react";
import PropTypes from "prop-types";
import {styled} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Reply from "./Reply";

const ReplyListStyle = styled(Paper)({
	width: "100%",
	backgroundColor: "#FFFFF0",
});

function ReplyList(props) {
	const {replies} = props;

	return (
		<ReplyListStyle>
			{replies.map((reply, idx) => <Reply {...reply} key={idx}/>)}
		</ReplyListStyle>
	);
}

ReplyList.propTypes = {
	replies: PropTypes.any,
};

export default ReplyList;
