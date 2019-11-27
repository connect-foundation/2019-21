import React from "react";
import styled from "styled-components";
import {Emoji} from "emoji-mart";

const EmojiInstanceStyle = styled.div`
    display: inline-block;
    border: 1px solid #dee2e6; /* gray3 */
    background-color: ${props => (props.voted ? "#dee2e6" : "inherit")}; /* gray3 */
    padding: 0 0.2rem;
    border-radius: 0.5rem;
	&:hover {
		cursor: pointer;
	}
	&+& {
		margin-left: 0.5rem;
    }
    span {
        margin-right: 0.2rem;
    }
`;

function EmojiInstance({id, name, count, voted, onVote}) {
	return (
		<EmojiInstanceStyle voted={voted} onClick={() => onVote(id)}>
			<Emoji emoji={name} size={16} />
			<span>{count}</span>
		</EmojiInstanceStyle>
	);
}

export default EmojiInstance;
