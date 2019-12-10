import React from "react";
import Box from "@material-ui/core/Box";
import {styled} from "@material-ui/core/styles";
import AppDrawNavBar from "../AppDrawer/AppDrawerNavBar";
import PreviewQuestion from "./PreviewQuestion";
import RepliesList from "./RepliesList";
import ReplyQuestionDivider from "./ReplyQuestionDivider";

const Container = styled(Box)({
	display: "flex",
	flexDirection: "column",
	position: "absolute",
	top: "4rem",
	width: "100%",
});

function RepliesContainer(props) {
	const {onClose} = props;
	return (
		<Container>
			<AppDrawNavBar onClick={onClose} title="답글" />
			<PreviewQuestion {...props} />
			<ReplyQuestionDivider
				{...props}
				style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
			/>
			<RepliesList {...props} />
		</Container>
	);
}

export default RepliesContainer;
