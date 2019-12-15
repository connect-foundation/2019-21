import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import AppDrawerNavBar from "./AppDrawerNavBar.js";

const AppDrawerBody = styled.div`
	position: fixed;
	top: 3.5rem;
	width: 100%;
	z-index: 1;
`;

function AppDrawer(props) {
	const {isOpen, onClose, anchor, children, title} = props;

	// todo 스타일 분리
	return (
		<Drawer open={isOpen} anchor={anchor} onClose={onClose}>
			<Paper style={{width: "100vw", height: "100vh"}}>
				<AppDrawerNavBar onClick={onClose} title={title}/>
				<AppDrawerBody>{children}</AppDrawerBody>
			</Paper>
		</Drawer>
	);
}

AppDrawer.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	anchor: PropTypes.string,
	title: PropTypes.string,
};

AppDrawer.defaultProps = {
	isOpen: false,
	onClose: undefined,
	anchor: "right",
	title: "",
};

export default AppDrawer;
