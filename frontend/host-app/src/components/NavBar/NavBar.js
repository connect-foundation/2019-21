import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import NavBarTab from "./NavBarTab.js";
import NavBarTabs from "./NavBarTabs.js";
import EventDashboard from "../EventDashboard/EventDashboard";
import EventCardList from "../Event/EventCardList";
import EmptyContent from "../EventDashboard/EmptyContent";

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
	const {eventNum} = props;
	const [tabIdx, selectTab] = useState(0);
	const classes = useStyles();

	const onChange = (e, selectedTabIdx) => {
		selectTab(selectedTabIdx);
	};

	return (
		<>
			<div className={classes.root}>
				<div className={classes.navBar}>
					<NavBarTabs value={tabIdx} onChange={onChange}>
						<NavBarTab label="라이브 이벤트" />
						<NavBarTab label="이벤트 목록" />
					</NavBarTabs>
				</div>
			</div>
			{eventNum ? (
				<EventDashboard value={tabIdx} index={0} />
			) : (
				<EmptyContent value={tabIdx} index={0} />
			)}
			<EventCardList value={tabIdx} index={1} />
		</>
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
