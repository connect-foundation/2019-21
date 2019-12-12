import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const AntTabs = withStyles({
	root: {
		borderBottom: "1px solid #e8e8e8",
	},
	indicator: {
		backgroundColor: "rgba(45,48,52,0.96)",
	},
})(Tabs);

const AntTab = withStyles(theme => ({
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

const useStyles = makeStyles(theme => ({
	root: {
		marginBottom: theme.spacing(2),
	},
	navBar: {
		backgroundColor: theme.palette.background.paper,
	},
}));

function Nav(props) {
	const {onChangeTab} = props;
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const onChange = (event, newValue) => {
		setValue(newValue);
		onChangeTab(newValue);
	};

	return (
		<div className={classes.root}>
			<div className={classes.navBar}>
				<AntTabs
					value={value}
					onChange={onChange}
					aria-label="ant example"
				>
					<AntTab label="이벤트 목록"/>
					<AntTab label="라이브 이벤트"/>
				</AntTabs>
			</div>
		</div>
	);
}

export default Nav;
