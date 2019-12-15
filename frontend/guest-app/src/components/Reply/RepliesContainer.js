import React from "react";
import Box from "@material-ui/core/Box";
import {styled} from "@material-ui/core/styles";
import AppDrawNavBar from "../AppDrawer/AppDrawerNavBar.js";
import PreviewQuestion from "./PreviewQuestion.js";
import ReplyList from "./ReplyList.js";
import ReplyQuestionDivider from "./ReplyQuestionDivider.js";
import ReplyInputContainer from "./ReplyInputContainer.js";

const Container = styled(Box)({
	display: "flex",
	flexDirection: "column",
	position: "absolute",
	top: "4rem",
	width: "99%",
});

// todo proptype
function RepliesContainer(props) {
	const {onClose} = props;

	// todo 컴포넌트 분리하기
	return (
		<Container>
			<AppDrawNavBar onClick={onClose} title="답글" />
			<PreviewQuestion {...props} />
			<ReplyQuestionDivider
				{...props}
				style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
			/>
			<ReplyList {...props} />
			<ReplyInputContainer {...props} />
		</Container>
	);
}

export default RepliesContainer;
