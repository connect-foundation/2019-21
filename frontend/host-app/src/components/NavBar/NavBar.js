import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import NavBarTab from "./NavBarTab.js";
import NavBarTabs from "./NavBarTabs.js";

const useStyles = makeStyles(theme => ({
	root: {
		marginBottom: theme.spacing(2),
	},
	navBar: {
		backgroundColor: theme.palette.background.paper,
	},
}));

const NAV_BAR_DEFAULT_TAB_IDX = 0;

function NavBar(props) {
	const {onChange, tabIdx} = props;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.navBar}>
				<NavBarTabs value={tabIdx} onChange={onChange}>
					<NavBarTab label="이벤트 목록" />
					<NavBarTab label="라이브 이벤트" />
				</NavBarTabs>
			</div>
		</div>
	);
}

NavBar.propTypes = {
	onChange: PropTypes.func,
	tabIdx: PropTypes.number,
};

NavBar.defaultProps = {
	onChange: undefined,
	tabIdx: NAV_BAR_DEFAULT_TAB_IDX,
};

export default NavBar;