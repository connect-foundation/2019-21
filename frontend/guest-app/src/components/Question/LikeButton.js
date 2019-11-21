import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {
	UndoLikeConfirmModal,
	UseUndoLikeConfirmModalState,
} from "./UndoLikeModal.js";
import {LikeIcon} from "../FontAwesomeIcons.js";

export function LikeButton({likeCount, isLikeClicked, onLike, onUndoLike}) {
	const modalState = UseUndoLikeConfirmModalState();
	const onLikeButtonClicked = () => {
		if (isLikeClicked) {
			modalState.openModal();
		} else {
			onLike();
		}
	};

	const onCancelClick = () => {
		modalState.closeModal();
	};
	const onConfirmClick = () => {
		onUndoLike();
		modalState.closeModal();
	};

	return (
		<div>
			<Button
				variant="outlined"
				color={isLikeClicked ? "primary" : "default"}
				onClick={onLikeButtonClicked}
				style={{
					width: "5rem",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<LikeIcon />
				{likeCount}
			</Button>
			<UndoLikeConfirmModal
				{...{onCancelClick, onConfirmClick, ...modalState}}
			/>
		</div>
	);
}

export function useLikeButton(
	initialState = {isLikeClicked: false, likeCount: 0},
) {
	const [likeState, setLikeState] = useState(initialState);

	const onLike = () =>
		setLikeState({likeCount: likeState.likeCount + 1, isLikeClicked: true});

	const onUndoLike = () =>
		setLikeState({
			likeCount: likeState.likeCount - 1,
			isLikeClicked: false,
		});

	return {...likeState, onLike, onUndoLike};
}
