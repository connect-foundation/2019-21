import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
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
	upwardButton: {
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
	moreButton: {
		color: "#7f7f7f",
		marginLeft: "0.25rem",
		"&:hover": {
			color: "#ef0046",
		},
	},
});

export default useStyles;
