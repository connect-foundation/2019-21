import React from "react";
import {Icon} from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "../QuestionContainer/useStyles.js";
import ColumnFooterStyled from "../StyledComponent/ColumnFooterStyle.js";

// todo: propType, defalut prop 추가
// todo: 다른 파일로 분리
function PlusIcon({onClick}) {
	const classes = useStyles();

	return (
		<Icon className={classes.footerButton} onClick={onClick}>
			add
		</Icon>
	);
}

// todo: propType, defalut prop 추가
// todo: 다른 파일로 분리
function MinusIcon({onClick}) {
	const classes = useStyles();

	return (
		<Icon className={classes.footerButton} onClick={onClick}>
			remove
		</Icon>
	);
}

function ColumnFooter(props) {
	const {data, handler} = props;
	const increaseHeight = () => handler(data + 1);
	const decreaseHeight = () => data > 0 && handler(data - 1);

	return (
		<ColumnFooterStyled>
			<MinusIcon
				onClick={decreaseHeight}
			/>
			<PlusIcon
				onClick={increaseHeight}
			/>
		</ColumnFooterStyled>
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
