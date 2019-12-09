import React from "react";
import Divider from "@material-ui/core/Divider";
import UserAvata from "./UserAvata.js";
import {QuestionBody, QuestionInfo, QuestionMeta} from "./QuestionStyle";
import QuestionUserName from "./QuestionUserName";
import useStyles from "./useStyles";


function Replies(props) {
	const classes = useStyles();

	return (
		<div>
			<Divider
				style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
			/>
			{props.replies.map(e => (
				<>
					<QuestionMeta>
						<UserAvata {...e} />
						<QuestionInfo>
							<QuestionUserName {...e} />
						</QuestionInfo>
					</QuestionMeta>
					<QuestionBody>{e.content}</QuestionBody>
				</>))}
		</div>
	);
}

export default Replies;
