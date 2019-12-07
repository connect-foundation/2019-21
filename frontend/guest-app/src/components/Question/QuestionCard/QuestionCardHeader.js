import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import UserAvatar from "../../UserAvatar/UserAvatar.js";
import LikeButton from "../../LikeButton/LikeButton.js";
import useLikeButton from "../../LikeButton/useLikeButton.js";
import QuestionCardDate from "./QuestionsCardDate.js";
import QuestionUserName from "./QuestionCardUserName.js";

const QuestionInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-content: left;
	margin-left: 1rem;
`;

const QuestionHeaderStyle = styled.div`
	display: flex;
	justify-content: space-between;
`;

function QuestionHeader(props) {
	const {guestName, createdAt, isLike, likeCount} = props;
	const likeButton = useLikeButton({
		isLikeClicked: isLike,
		likeCount,
	});

	return (
		<QuestionHeaderStyle>
			<Grid container direction={"row"}>
				<UserAvatar userName={guestName} />
				<QuestionInfo>
					<QuestionUserName userName={guestName} />
					<QuestionCardDate date={createdAt} />
				</QuestionInfo>
			</Grid>
			<LikeButton {...likeButton} />
		</QuestionHeaderStyle>
	);
}

export default QuestionHeader;
