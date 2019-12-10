import React, {useContext, useRef} from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ReplyInput from "./ReplyInput";
import {socketClient} from "../../libs/socket.io-Client-wrapper";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";

const createNewReply = ({EventId, GuestId, guestName, content, QuestionId}) => {
	return {
		guestName,
		EventId,
		GuestId,
		content,
		QuestionId,
		isAnonymous: guestName.length === 0,
	};
};

function ReplyInputContainer(props) {
	const {id} = props;
	const {event, guest} = useContext(GuestGlobalContext);
	const userNameRef = useRef(null);
	const questionRef = useRef(null);
	const onConfirmNewReply = () => {
		socketClient.emit(
			"reply/create",
			createNewReply({
				guestName: userNameRef.current.value,
				EventId: event.id,
				GuestId: guest.id,
				content: questionRef.current.value,
				QuestionId: id,
			}),
		);
	};

	return (
		<Card>
			<CardContent>
				<ReplyInput
					onConfirm={() => {
						onConfirmNewReply();
					}}
					confirmButtonText="댓글달기"
					userNameRef={userNameRef}
					questionRef={questionRef}
				/>
			</CardContent>
		</Card>
	);
}

export default ReplyInputContainer;
