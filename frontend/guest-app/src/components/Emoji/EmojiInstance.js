import React from "react";
import styled, {css} from "styled-components";
import {Emoji} from "emoji-mart";

const EmojiInstanceStyle = styled.div`
	display: inline-block;
	border: 1px solid #dee2e6; /* gray3 */
	${props =>
		props.didIPicked &&
		css`
			background-color: #e7f5ff; /* blue0 */
			border: 1px solid #339af0; /* blue5 */
		`}
	padding: 0 0.2rem;
	border-radius: 0.5rem;
	&:hover {
		cursor: pointer;
	}
	& + & {
		margin-left: 0.5rem;
	}
	span {
		margin-right: 0.2rem;
	}
`;

function EmojiInstance(props) {
	const {id, name, count, didIPicked, onClick} = props;

	return (
		<EmojiInstanceStyle didIPicked={didIPicked} onClick={() => onClick(id)}>
			<Emoji emoji={name} size={16} />
			<span>{count}</span>
		</EmojiInstanceStyle>
	);
}

export default EmojiInstance;
