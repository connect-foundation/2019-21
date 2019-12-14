import {withStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import React from "react";

const NavBarTab = withStyles(theme => ({
	root: {
		textTransform: "none",
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(4),
		"&:hover": {
			color: "#69747f",
			opacity: 1,
		},
		"&$selected": {
			color: "#343b40",
			fontWeight: theme.typography.fontWeightMedium,
		},
		"&:focus": {
			color: "#868686",
		},
	},
	selected: {},
}))(props => <Tab disableRipple {...props} />);

export default NavBarTab;
