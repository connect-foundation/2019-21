import {useState} from "react";

function useLikeButton(initialState = {isLikeClicked: false, likeCount: 0}) {
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

export default useLikeButton;
