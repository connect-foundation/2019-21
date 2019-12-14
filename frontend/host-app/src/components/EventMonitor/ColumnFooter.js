import React from "react";
import {Icon} from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "../Questions/useStyles.js";
import ColumnFooterStyledComponent from "../StyledComponent/ColumnFooterStyledComponent.js";

function ColumnFooter(props) {
	const {data, handler} = props;
	const classes = useStyles();
	const increaseHeight = () => handler(data + 1);
	const decreaseHeight = () => data > 0 && handler(data - 1);

	return (
		<ColumnFooterStyledComponent>
			<Icon
				className={classes.footerButton}
				onClick={() => {
					decreaseHeight();
				}}
			>
				remove
			</Icon>
			<Icon
				className={classes.footerButton}
				onClick={() => {
					increaseHeight();
				}}
			>
				add
			</Icon>
		</ColumnFooterStyledComponent>
	);
}

ColumnFooter.propTypes = {
	data: PropTypes.any,
	handler: PropTypes.func,
};

ColumnFooter.defaultProp = {
	data: undefined,
	handler: undefined,
};

export default ColumnFooter;
