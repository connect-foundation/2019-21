import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {CardContent, Typography} from "@material-ui/core";
import UserAvata from "./UserAvata.js";
import {LikeButton, useLikeButton} from "./LikeButton.js";
import {EllipsisHorizonIcon} from "../FontAwesomeIcons.js";

const QuestionHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;

const QuestionInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-content: left;
	margin-left: 1rem;
`;


const Question = styled.span``;

const QuestionEditButtonStyle = styled.div`
	float: right;
	text-align: right;
`;

function QuestionUserName({userName}) {
	return (
		<Typography
			color={"textPrimary"}
			variant={"subtitle1"}
			style={{fontWeight: "bold"}}
		>
			{userName}
		</Typography>
	);
}

function QuestionDate({date}) {
	return (
		<Typography color={"textSecondary"} variant={"body1"}>
			{`${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`}
		</Typography>
	);
}

function QuestionEditButton() {
	return (
		<QuestionEditButtonStyle>
			<Typography color={"textSecondary"}>
				<EllipsisHorizonIcon/>
			</Typography>
		</QuestionEditButtonStyle>
	);
}

function QuestionCard(props) {
	const {isShowEditButton = true, question, userName, date} = props;
	const likeButtonState = useLikeButton({
		isLikeClicked: false,
		likeCount: 100,
	});

	return (
		<Card>
			<CardContent>
				<QuestionHeader>
					<Grid container direction={"row"}>
						<UserAvata {...props} />
						<QuestionInfo>
							<QuestionUserName userName={userName}/>
							<QuestionDate date={date}/>
						</QuestionInfo>
					</Grid>
					<LikeButton {...likeButtonState} />
				</QuestionHeader>
				<Question>
					{question}
					{isShowEditButton && <QuestionEditButton/>}
				</Question>
			</CardContent>
		</Card>
	);
}

export default QuestionCard;
