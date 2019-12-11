import makeStyles from "@material-ui/core/styles/makeStyles.js";

const useSideMenuStyles = makeStyles({
	body: {
		width: 250,
		maxWidth: 250,
		overflow: "hidden",
	},
	header: {
		minHeight: 150,
		paddingLeft: "1rem",
		paddingRight: "1rem",
	},
	headerWrappedText: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		width: 200,
		color: "white",
		fontWeight: "bolder",
	},
	headerSpace: {
		height: 100,
	},
});

export default useSideMenuStyles;
