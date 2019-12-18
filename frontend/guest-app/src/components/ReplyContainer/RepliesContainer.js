import React from "react";
import styled from "styled-components";
import {Scrollbars} from "react-custom-scrollbars";
import Box from "@material-ui/core/Box";
import PreviewQuestion from "./PreviewQuestion.js";
import ReplyCardList from "../ReplyCard/ReplyCardList.js";
import ReplyQuestionDivider from "./ReplyQuestionDivider.js";
import ReplyInputContainer from "../ReplyInput/ReplyInputContainer.js";
import PaddingArea from "../atoms/PaddingArea.js";

const RepliesContainerStyle = styled.div`
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;

const fullScreen = {
	width: "100vw",
	height: "100vh",
};

function RepliesContainer(props) {
	return (
		<Scrollbars style={fullScreen}>
			<RepliesContainerStyle>
				<Box p={1} />
				<PreviewQuestion {...props} />
				<ReplyQuestionDivider
					{...props}
					style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
				/>
				<ReplyCardList {...props} />
				<ReplyInputContainer {...props} />
				<PaddingArea />
			</RepliesContainerStyle>
		</Scrollbars>
	);
}

export default RepliesContainer;
