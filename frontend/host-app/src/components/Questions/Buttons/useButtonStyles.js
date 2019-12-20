import {makeStyles} from "@material-ui/core";

const useButtonStyles = makeStyles(() => ({
	starButton: {
		color: "#9e9e9e",
		marginLeft: "0.25rem",
		"&:hover": {
			color: "#ffe147",
		},
	},
	approveButton: {
		color: "#84c466",
		marginLeft: "0.25rem",
		"&:hover": {
			color: "#EF0046",
		},
	},
	restoreButton: {
		color: "#5a7ec4",
		marginLeft: "0.25rem",
		"&:hover": {
			color: "#EF0046",
		},
	},
	cancelButton: {
		color: "#b14246",
		marginLeft: "0.25rem",
		"&:hover": {
			color: "#EF0046",
		},
	},
	thumbUpButton: {
		color: "#7f7f7f",
		transform: "scale(0.7)",
		marginLeft: "0.5rem",
	},
	menuButton: {
		color: "#7f7f7f",
		transform: "scale(0.7)",
	},
}
));

export default useButtonStyles;
