import React, {useContext} from "react";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import useCommonModal from "../CommonComponent/CommonModal/useCommonModal.js";
import UndoLikeConfirmModal from "./UndoLikeModal.js";
import {socketClient} from "../../libs/socketIoClientProvider.js";
import {GuestGlobalContext} from "../../libs/guestGlobalContext.js";


// todo proptype 추가
function LikeButtonAtom({isLikeClicked, onLikeButtonClicked, likeCount}) {
	// todo style 분리
	return (
		<Button
			variant={isLikeClicked ? "contained" : "outlined"}
			color={isLikeClicked ? "primary" : "default"}
			onClick={onLikeButtonClicked}
			style={{
				width: "5rem",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<ThumbUpIcon/>
			{likeCount}
		</Button>
	);
}

function emitQuestionLikeCreate(GuestId, QuestionId) {
	socketClient.emit("questionLike/create", {
		GuestId,
		QuestionId,
	});
}

function emitQuestionLikeRemove(GuestId, QuestionId) {
	socketClient.emit("questionLike/remove", {
		GuestId,
		QuestionId,
	});
}


// todo proptype 추가
// todo 하나의 모달만 사용하도록 변경
function LikeButton(props) {
	const {likeCount, didILike, id} = props;
	const {guest} = useContext(GuestGlobalContext);
	const modalState = useCommonModal();
	const onLikeButtonClicked = () => {
		if (didILike) {
			modalState.openModal();
		} else {
			emitQuestionLikeCreate(guest.id, id);
		}
	};

	const onCancelClick = () => {
		modalState.closeModal();
	};
	const onConfirmClick = () => {
		emitQuestionLikeRemove(guest.id, id);
		modalState.closeModal();
	};

	return (
		<>
			<LikeButtonAtom
				onLikeButtonClicked={onLikeButtonClicked}
				likeCount={likeCount}
				isLikeClicked={didILike}
			/>
			<UndoLikeConfirmModal
				{...{onCancelClick, onConfirmClick, ...modalState}}
			/>
		</>
	);
}

export default LikeButton;
