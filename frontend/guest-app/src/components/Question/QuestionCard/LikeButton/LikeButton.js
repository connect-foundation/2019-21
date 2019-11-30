import React from "react";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import useCommonModal from "../../../CommonComponent/CommonModal/useCommonModal.js";

import UndoLikeConfirmModal from "./UndoLikeModal.js";

function LikeButtonAtom({isLikeClicked, onLikeButtonClicked, likeCount}) {
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
			<ThumbUpIcon />
			{likeCount}
		</Button>
	);
}

function LikeButton({likeCount, isLikeClicked, onLike, onUndoLike}) {
	const modalState = useCommonModal();
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
		<>
			<LikeButtonAtom
				onLikeButtonClicked={onLikeButtonClicked}
				likeCount={likeCount}
				isLikeClicked={isLikeClicked}
			/>
			<UndoLikeConfirmModal
				{...{onCancelClick, onConfirmClick, ...modalState}}
			/>
		</>
	);
}

export default LikeButton;
