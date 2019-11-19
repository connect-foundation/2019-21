import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import { UndoLikeConfirmModal, UseUndoLikeConfirmModalState } from "./UndoLikeModal.js";

export function LikeButton({likeCount, isLikeClicked, like, undoLike}) {
	const modalState = UseUndoLikeConfirmModalState();
	const onLikeButtonClicked = () => {
		if (isLikeClicked) {
			modalState.openModal();
		} else {
			like();
		}
	};

	const onCancelClick = () => {
		modalState.closeModal();
	};
	const onConfirmClick = () => {
		undoLike();
		modalState.closeModal();
	};

	return (
		<div>
			<Button
				variant="outlined"
				color={isLikeClicked ? "primary" : "default"}
				startIcon={<i className="far fa-thumbs-up" />}
				onClick={onLikeButtonClicked}
			>
				{likeCount}
			</Button>
			<UndoLikeConfirmModal
				{...{onCancelClick, onConfirmClick, ...modalState}}
			/>
		</div>
	);
}

export function useLikeButtonState(
	initialState = {isLikeClicked: false, likeCount: 0},
) {
	let [likeState, setLikeState] = useState(initialState);

	const like = () =>
		setLikeState({likeCount: likeState.likeCount + 1, isLikeClicked: true});

	const undoLike = () =>
		setLikeState({
			likeCount: likeState.likeCount - 1,
			isLikeClicked: false,
		});

	return { ...likeState, like, undoLike };
}
