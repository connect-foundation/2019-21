import React from "react";
import Divider from "@material-ui/core/Divider";
import {QuestionBody, QuestionInfo, QuestionMeta} from "./QuestionStyle";
import QuestionUserName from "./QuestionUserName";
import QuestionDate from "./QuestionDate";


function Replies(props) {

	return (
		<div>
			<Divider
				style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
			/>
			{props.replies.map(reply => (
				<>
					<QuestionMeta>
						<QuestionInfo>
							<QuestionUserName {...reply} />
							<QuestionDate {...reply} />
						</QuestionInfo>
					</QuestionMeta>
					<QuestionBody>{reply.content}</QuestionBody>
				</>))}
		</div>
	);
}

export default Replies;
