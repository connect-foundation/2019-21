import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import QuestionEditButton from "./QuestionCardEditButton.js";
import useGlobalData from "../../models/GlobalData/useGlobalData.js";

function QuestionBody(props) {
	const {guest} = useGlobalData();
	const {content, GuestId} = props;

	const isMyQuestion = guest.id === GuestId;

	return (
		<span>
			<Typography color={"textPrimary"} variant={"body1"}>
				{content}
				{isMyQuestion && <QuestionEditButton {...props} />}
			</Typography>
		</span>
	);
}

QuestionBody.propTypes = {
	content: PropTypes.string,
	isMyQuestion: PropTypes.bool,
};

QuestionBody.defualtProps = {
	content: "",
	isMyQuestion: false,
};

export default QuestionBody;
