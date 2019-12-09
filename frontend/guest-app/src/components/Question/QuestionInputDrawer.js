import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AppDrawer from "../AppDrawer/AppDrawer.js";
import QuestionInputArea from "./QuestionInputArea/QuestionInputArea.js";

const fullSizeCardStyle = {
	width: "100vw",
	height: "100vh",
};

function QuestionInputDrawer(props) {
	const {
		anchor,
		isOpen,
		onClose,
		userNameRef,
		questionRef,
		onAskQuestion,
	} = props;

	return (
		<AppDrawer anchor={anchor} isOpen={isOpen} onClose={onClose}>
			<Card style={fullSizeCardStyle}>
				<CardContent>
					<QuestionInputArea
						onAskQuestion={() => {
							onAskQuestion();
							onClose();
						}}
						onCancel={onClose}
						questionRef={questionRef}
						userNameRef={userNameRef}
					/>
				</CardContent>
			</Card>
		</AppDrawer>
	);
}

QuestionInputDrawer.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	anchor: PropTypes.string,
	onAskQuestion: PropTypes.func,
	userNameRef: PropTypes.any,
	questionRef: PropTypes.any,
};

QuestionInputDrawer.defaultProps = {
	isOpen: false,
	anchor: "right",
};

export default QuestionInputDrawer;
