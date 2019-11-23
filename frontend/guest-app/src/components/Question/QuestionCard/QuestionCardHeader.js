import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import UserAvatar from "../../UserAvatar/UserAvatar.js";
import LikeButton from "./LikeButton/LikeButton.js";
import useLikeButton from "./LikeButton/useLikeButton.js";

const QuestionInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-content: left;
	margin-left: 1rem;
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

const QuestionHeaderStyle = styled.div`
	display: flex;
	justify-content: space-between;
`;

function QuestionHeader(props) {
	const {userName, date, isAnonymous, isLike, likeCount} = props;
	const likeButton = useLikeButton({
		isLikeClicked: isLike,
		likeCount,
	});

	return (
		<QuestionHeaderStyle>
			<Grid container direction={"row"}>
				<UserAvatar isAnonymous={isAnonymous} userName={userName} />
				<QuestionInfo>
					<QuestionUserName userName={userName} />
					<QuestionDate date={date} />
				</QuestionInfo>
			</Grid>
			<LikeButton {...likeButton} />
		</QuestionHeaderStyle>
	);
}

export default QuestionHeader;
