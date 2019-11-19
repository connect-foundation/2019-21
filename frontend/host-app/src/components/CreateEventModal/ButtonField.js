import React from "react";
import styled from "styled-components";

const Container = styled.div`
	margin-top: auto;
	display: flex;
	margin-left: 160px;
`;

const CancelTextButton = styled.div`
    font-size:20px
	color: balck;
	:hover {
		font-weight: bold;
    }
    width:auto;
    cursor: pointer;
    margin:15px;
`;

const CreateTextButton = styled.div`
    font-size:20px
    color: green;
    :hover {
        font-weight: bold;
    }
    width:auto;
    cursor: pointer;
    margin:15px;
`;

function ButtonField({callBack, onClose}) {
	return (
		<Container>
			<CancelTextButton onClick={onClose}>CANCEL</CancelTextButton>
			<CreateTextButton onClick={callBack}>CREATE EVENT</CreateTextButton>
		</Container>
	);
}

export default ButtonField;
