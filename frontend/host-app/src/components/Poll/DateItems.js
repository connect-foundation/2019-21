import React from "react";
import styled from "styled-components";
import {MdDelete, MdAdd} from "react-icons/md";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

const Remove = styled.div`
    opacity: 0;
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

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
	align-items: center;
	justify-content: ${props => (props.left ? "flex-start" : "space-around")};
	width: 100%;
	min-height: 50px;
	padding: 0 0 0 1rem;
    box-sizing: border-box;
    &:hover {
        ${Remove} {
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

function DateItems({dates, handleSelectionDateChange, onRemoveDate, onAddDate}) {
	return (
		<>
			{dates.map((date, index) => (
				<RowWrapper left>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							variant="inline"
							format="yyyy/MM/dd"
							margin="dense"
							value={date}
							onChange={newDate => handleSelectionDateChange(newDate, index)}
						/>
					</MuiPickersUtilsProvider>

					<Remove>
						{(index > 1) && <MdDelete onClick={() => onRemoveDate(index)} />}
					</Remove>
				</RowWrapper>))
			}
			<AddItem onClick={onAddDate}>
				<MdAdd />
			</AddItem>
		</>
	);
}

export default DateItems;
