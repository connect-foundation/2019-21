import React from "react";
import styled from "styled-components";
import {TextField} from "@material-ui/core";
import {MdDelete, MdAdd} from "react-icons/md";

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	min-height: 50px;
	padding: 0 0 0 1rem;
    box-sizing: border-box;
`;

const AddItem = styled.div`
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 24px;
    border: 1px solid gray;
    &:hover {
        background-color: #f1f3f5;
    }
    &:active {
        background-color: #dee2e6;
    }
`;

const Remove = styled.div`
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 32px;
    height: 32px;
    font-size: 24px;
    border-radius: 50%;
    color: #f1f3f5;
    &:hover {
        color: #adb5bd;
    }
`;

function TextItems({items, handleSelectionItemChange, onRemoveItem, onAddItem}) {
	return (
		<>
			{items.map((item, index) => (
				<RowWrapper left>
					<TextField
						value={item}
						margin="dense"
						variant="outlined"
						placeholder="항목입력"
						key={index}
						onChange={() => handleSelectionItemChange(event, index)}
					/>
					<Remove>
						{(index > 1) && <MdDelete onClick={() => onRemoveItem(index)} />}
					</Remove>
				</RowWrapper>))
			}
			<AddItem onClick={onAddItem}>
				<MdAdd />
			</AddItem>
		</>
	);
}

export default TextItems;
