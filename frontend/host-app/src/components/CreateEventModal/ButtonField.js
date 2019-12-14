import React from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";

const ButtonFieldStyledComponent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: flex-end;
	height: 3rem;
`;

function ButtonField(props) {
	const {onConfirm, onClose} = props;

	return (
		<ButtonFieldStyledComponent>
			<Button
				size="large"
				variant="contained"
				color="secondary"
				onClick={onClose}
			>
				취소
			</Button>
			<Button
				size="large"
				variant="contained"
				color="primary"
				onClick={onConfirm}
			>
				확인
			</Button>
		</ButtonFieldStyledComponent>
	);
}

ButtonField.propTypes = {
	onConfirm: PropTypes.func,
	onClose: PropTypes.func,
};

ButtonField.defaultProps = {
	onConfirm: undefined,
	onClose: undefined,
};

export default ButtonField;
