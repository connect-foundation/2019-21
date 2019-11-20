import React from "react";
import styled from "styled-components";
import SelectionType from "./SelectionType";
import TextItems from "./TextItems";
import DateItems from "./DateItems";

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	flex: 1;
    padding: 0 0.5rem 0.5rem 1rem;
	box-sizing: border-box;
    border: 1px solid #adb5bd;
    max-height: 380px;
    overflow-y: auto;
`;

function NItems(
	{
		items,
		dates,
		selectionType,
		onChange,
		handleSelectionItemChange,
		onAddItem,
		onRemoveItem,
		handleSelectionDateChange,
		onAddDate,
		onRemoveDate,
	},
) {
	return (
		<ColumnWrapper>
			<SelectionType selectionType={selectionType} onChange={onChange} />
			{(selectionType === "text") && <TextItems
				items={items}
				handleSelectionItemChange={handleSelectionItemChange}
				onRemoveItem={onRemoveItem}
				onAddItem={onAddItem} />
			}
			{(selectionType === "date") && <DateItems
				dates={dates}
				handleSelectionDateChange={handleSelectionDateChange}
				onRemoveDate={onRemoveDate}
				onAddDate={onAddDate} />
			}
		</ColumnWrapper>
	);
}

export default NItems;
