import {makeStyles} from "@material-ui/core";

const useQuestionCardStyles = makeStyles(() => ({
	replyIcon: {
		color: "#7f7f7f",
		transform: "scale(0.7)",
	},
	staredQuestion: {
		backgroundColor: "rgb(242,248,255)",
	},
	normalQuestion: {
		backgroundColor: "rgba(255,255,255,100)",
	},
	cardContentPadding: {
		"&:last-child": {
			paddingBottom: "0.7rem",
		},
	},
}
));

export default useQuestionCardStyles;
