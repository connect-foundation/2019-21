import React from "react";
import styled from "styled-components";
import {Scrollbars} from "react-custom-scrollbars"
import PreviewQuestion from "./PreviewQuestion";
import RepliesList from "./RepliesList";
import ReplyQuestionDivider from "./ReplyQuestionDivider";
import ReplyInputContainer from "./ReplyInputContainer";
import PaddingArea from "../CommonComponent/PaddingArea";

const RepliesContainerStyle = styled.div`
	overflow-y:scroll;
`;

function RepliesContainer(props) {
	const fullScreen = {
		width: "100vw",
		height: "100vh",
	};

	return (
		<Scrollbars style={fullScreen}>
			<RepliesContainerStyle>
				<PreviewQuestion {...props} />
				<ReplyQuestionDivider
					{...props}
					style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
				/>
				<RepliesList {...props} />
				<ReplyInputContainer {...props} />
				<PaddingArea/>
			</RepliesContainerStyle>
		</Scrollbars>
	);
}

export default RepliesContainer;
