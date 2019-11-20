import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import {CardContent, Typography} from "@material-ui/core";
import UserAvata from "./UserAvata.js";
import {LikeButton, useLikeButtonState} from "./LikeButton.js";

const QuestionHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;

const QuestionMeta = styled.div`
	display: flex;
`;

const QuestionInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-content: left;
	margin-left: 1rem;
`;

const QuestionBody = styled.div``;

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

function QuestionCard(props) {
	const likeState = useLikeButtonState({
		isLikeClicked: false,
		likeCount: 100,
	});

	return (
		<Card>
			<CardContent>
				<QuestionHeader>
					<QuestionMeta>
						<UserAvata {...props} />
						<QuestionInfo>
							<QuestionUserName {...props} />
							<QuestionDate {...props} />
						</QuestionInfo>
					</QuestionMeta>

					<LikeButton {...likeState} />
				</QuestionHeader>

				<QuestionBody>{props.question}</QuestionBody>
			</CardContent>
		</Card>
	);
}

export default QuestionCard;
