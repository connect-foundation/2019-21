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

function AddQuestionInputButton(props) {
	const {onClick} = props;

	// todo 스타일 컴포넌트로 변경
	// todo 컴포넌트 쪼개기
	return (
		<Card style={cardStyle} onClick={onClick}>
			<CardContent style={cardContentStyle}>
				<div style={{color: "white"}}>
					<EditIcon style={{marginRight: "8px"}} />
					질문하기
				</div>
			</CardContent>
		</Card>
	);
}

AddQuestionInputButton.propTypes = {
	onClick: PropTypes.func,
};

export default AddQuestionInputButton;
