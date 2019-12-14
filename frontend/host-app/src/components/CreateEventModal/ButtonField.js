import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CancelButton from "./CancelButton.js";
import ConfirmButton from "./ConfirmButton.js";

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
			<CancelButton onClick={onClose} />
			<ConfirmButton onClick={onConfirm} />
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
