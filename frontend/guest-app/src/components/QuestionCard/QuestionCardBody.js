import React, {useContext} from "react";
import PropTypes from "prop-types";
import QuestionEditButton from "./QuestionCardEditButton.js";
<<<<<<< Develop:frontend/guest-app/src/components/Question/QuestionCard/QuestionCardBody.js
import {GuestGlobalContext} from "../../../libs/guestGlobalContext.js";
import {Typography} from "@material-ui/core";
=======
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";
>>>>>>> refactoring: QuestionCard 및 QuestionArea 폴더 이동:frontend/guest-app/src/components/QuestionCard/QuestionCardBody.js

function QuestionBody(props) {
	const {guest} = useContext(GuestGlobalContext);
	const {content, GuestId} = props;

	const isMyQuestion = guest.id === GuestId;

	return (
		<span>
			<Typography
				color={"textPrimary"}
				variant={"subtitle1"}
				style={{fontWeight: "bold"}}
			>
				{content}
			</Typography>
			{isMyQuestion && <QuestionEditButton {...props} />}
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
