import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import UserAvata from "./UserAvata.js";
import {QuestionHeader, QuestionBody, QuestionInfo, QuestionMeta} from "./QuestionStyle";
import QuestionDate from "./QuestionDate";
import QuestionUserName from "./QuestionUserName";

function CompleteQuestionCard(props) {
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
				</QuestionHeader>
				<QuestionBody>{props.question}</QuestionBody>
			</CardContent>
		</Card>
	);
}

export default CompleteQuestionCard;
