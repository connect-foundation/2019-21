import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import UserAvatar from "./UserAvatar.js";
import {QuestionHeader, QuestionBody, QuestionInfo, QuestionMeta, QuestionButtons} from "../QuestionStyle";
import QuestionDate from "./QuestionDate";
import QuestionUserName from "./QuestionUserName";
import ApproveButton from "../Buttons/ApproveButton";
import RejectButton from "../Buttons/RejectButton";

function ModerationQuestionCard(props) {
	return (
		<Card>
			<CardContent>
				<QuestionHeader>
					<QuestionMeta>
						<UserAvatar {...props} />
						<QuestionInfo>
							<QuestionUserName {...props} />
							<QuestionDate {...props} />
						</QuestionInfo>
						<QuestionButtons>
							<ApproveButton {...props}/>
							<RejectButton {...props}/>
						</QuestionButtons>
					</QuestionMeta>
				</QuestionHeader>
				<QuestionBody>{props.content}</QuestionBody>
			</CardContent>
		</Card>
	);
}

export default ModerationQuestionCard;
