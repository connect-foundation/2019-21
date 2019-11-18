import React from "react";
import {Card, CardBody} from "reactstrap";
import styled from "styled-components";

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`;

const UserInfo = styled.div`
	display: flex;
`;

const UserImage = styled.div`
	margin-left: 1rem;
	margin-right: 1rem;
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	align-content: left;
`;

const LikeButton = styled.div`
	margin: 1rem;
`;

function QuestionCard(props) {
	const {userName, question, date} = props;

	return (
		<Card>
			<CardBody>
				<Header>
					<UserInfo>
						<UserImage>
							<i className="fas fa-user" />
						</UserImage>
						<Info>
							<div>{userName}</div>
							<div>{date}</div>
						</Info>
					</UserInfo>
					<LikeButton>
						<i className="far fa-thumbs-up" />
					</LikeButton>
				</Header>
			</CardBody>
			<CardBody>{question}</CardBody>
		</Card>
	);
}

export default QuestionCard;
