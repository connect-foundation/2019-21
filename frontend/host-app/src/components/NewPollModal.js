import React from "react";
import styled from "styled-components";
import {TextField, Button, Modal, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from "@material-ui/core";


const ModalWrapper = styled.div`
	position: relative;
	top: calc(50% - 150px);
	left: calc(50% - 150px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 300px;
	height: 300px;
	background-color: white;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

function NewPollModal() {
	return (
		<Modal
			aria-labelledby="modal-title"
			open
		>
			<ModalWrapper>
				<h2>투표 만들기</h2>
				<TextField
					margin="normal"
					variant="outlined"
					placeholder="투표 제목을 입력해주세요"
				/>
				<FormControl component="fieldset">
					<FormLabel component="legend">투표 종류: </FormLabel>
					<RadioGroup aria-label="pollType" name="pollType">
						<FormControlLabel value="selection" control={<Radio />} label="N지선다" />
						<FormControlLabel value="rating" control={<Radio />} label="별점" />
					</RadioGroup>
				</FormControl>
				<ButtonWrapper>
					<Button variant="contained" color="primary">확인</Button>
					<Button variant="contained" color="secondary">취소</Button>
				</ButtonWrapper>
			</ModalWrapper>
		</Modal>
	);
}

export default NewPollModal;
