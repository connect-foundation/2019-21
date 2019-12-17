import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AppDrawer from "../../AppDrawer/AppDrawer.js";
import QuestionInput from "./QuestionInput.js";

const fullSizeCardStyle = {
	width: "100vw",
	height: "100vh",
};

function QuestionInputDrawer(props) {
	const {
		title,
		anchor,
		isOpen,
		onClose,
		userNameRef,
		questionRef,
		initialQuestion,
		initialUserName,
		confirmButtonText,
		onConfirm,
	} = props;

	return (
		<AppDrawer
			anchor={anchor}
			isOpen={isOpen}
			onClose={onClose}
			title={title}
		>
			<Card style={fullSizeCardStyle}>
				<CardContent>
					<QuestionInput
						onConfirm={() => {
							// onConfirm && onConfirm();
							// onClose();
							if (onConfirm) {
								if (questionRef.current.value.trim() !== "") {
									onConfirm();
									onClose();
								}
							}
						}}
						onCancel={onClose}
						questionRef={questionRef}
						userNameRef={userNameRef}
						initialQuestion={initialQuestion}
						initialUserName={initialUserName}
						confirmButtonText={confirmButtonText}
					/>
				</CardContent>
			</Card>
		</AppDrawer>
	);
}

QuestionInputDrawer.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
	userNameRef: PropTypes.any,
	questionRef: PropTypes.any,
	anchor: PropTypes.string,
	initialUserName: PropTypes.string,
	initialQuestion: PropTypes.string,
	confirmButtonText: PropTypes.string,
};

QuestionInputDrawer.defaultProps = {
	isOpen: false,
	anchor: "right",
	confirmButtonText: "확인",
};

export default QuestionInputDrawer;
