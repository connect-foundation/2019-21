import React from "react";
import styled from "styled-components";
import {TextField} from "@material-ui/core";
import {MdDelete, MdAdd} from "react-icons/md";

const DeleteItem = styled.div`
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
    border-radius: 50%;
    color: #f1f3f5;
    &:hover {
        color: #adb5bd;
    }
`;

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	min-height: 3rem;
	padding: 0 0 0 1rem;
    box-sizing: border-box;
    &:hover {
        ${DeleteItem} {
            opacity: 1;
        }
    }
`;

const AddItem = styled.div`
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    font-size: 1.5rem;
    border: 1px solid gray;
    &:hover {
        background-color: #f1f3f5;
    }
    &:active {
        background-color: #dee2e6;
    }
`;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	flex: 1;
	box-sizing: border-box;
    max-height: 300px;
    overflow-y: auto;
`;

/**
 * N지선다형 투표는 항상 2개의 선택지를 가지고 있어야 함
 * 선택지가 3개 이상인 경우에는 우측에 휴지통 아이콘이 나타나서 삭제할 수 있어야 함
 * index 값은 0 부터 시작하므로 1 보다 큰 경우 휴지통 아이콘이 나타남
 */

const MIN_ITEMS_COUNT = 2;

function TextItems({texts, onTextChange, onDeleteText, onAddText}) {
	return (
		<>
			<ColumnWrapper>
				{texts.map((text, index) => (
					<RowWrapper left>
						<TextField
							value={text}
							margin="dense"
							variant="outlined"
							placeholder="항목입력"
							key={index}
							onChange={() => onTextChange(event, index)}
						/>
						<DeleteItem>
							{(index > (MIN_ITEMS_COUNT - 1)) && <MdDelete onClick={() => onDeleteText(index)} />}
						</DeleteItem>
					</RowWrapper>))
				}
			</ColumnWrapper>
			<AddItem onClick={onAddText}>
				<MdAdd />
			</AddItem>
		</>
	);
}

export default TextItems;
