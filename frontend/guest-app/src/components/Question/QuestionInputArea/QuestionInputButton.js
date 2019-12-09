import React from "react";
import PropTypes from "prop-types";
import {Card, CardContent} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const cardStyle = {
	width: "calc(100% - 2rem)",
	position: "fixed",
	bottom: "0",
	left: "0rem",
	zIndex: 100,
	margin: "1rem",
	backgroundColor: "#3f51b5",
};

const cardContentStyle = {paddingBottom: "1rem"};

function QuestionInputButton(props) {
	const {onClick} = props;

	return (
		<Card style={cardStyle}>
			<CardContent style={cardContentStyle}>
				<div onClick={onClick} style={{color: "white"}}>
					<EditIcon style={{marginRight: "8px"}} />
					질문하기
				</div>
			</CardContent>
		</Card>
	);
}

QuestionInputButton.propTypes = {
	onClick: PropTypes.func,
};

export default QuestionInputButton;
