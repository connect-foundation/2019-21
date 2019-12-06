import React from "react";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useDrawer from "../../../materialUIHooks/useDrawer.js";
import CommonModal from "../../CommonComponent/CommonModal/CommonModal.js";
import useCommonModal from "../../CommonComponent/CommonModal/useCommonModal.js";
import SideMenuItem from "../../SideMenu/SideMenuItem.js";

const QuestionEditButtonStyle = styled.div`
	float: right;
	text-align: right;
	margin-right: 1rem;
`;

function DeleteQuestionCardModal({isOpened, closeModal, onCancel, onDelete}) {
	return (
		<CommonModal isOpened={isOpened} onCancelClick={closeModal}>
			<p>질문을 삭제하겠습니까?</p>
			<Grid container direction={"row"} justify="flex-end">
				<Button onClick={onCancel || closeModal}>취소</Button>
				<Button color="secondary" onClick={onDelete}>
          삭제
				</Button>
			</Grid>
		</CommonModal>
	);
}

function DeleteQuestionCardMenuButton() {
	const {isOpened, openModal, closeModal} = useCommonModal();

	return (
		<>
			<SideMenuItem
				icon={<DeleteIcon/>}
				itemText={"질문 삭제"}
				onClick={openModal}
			/>
			<DeleteQuestionCardModal
				isOpened={isOpened}
				closeModal={closeModal}
			/>
		</>
	);
}

function QuestionCardDrawer({isOpen, toggleDrawer}) {
	return (
		<Drawer open={isOpen} anchor={"bottom"} onClose={toggleDrawer}>
			<List>
				<SideMenuItem
					icon={<EditIcon/>}
					itemText={"질문 수정"}
					onClick={toggleDrawer}
				/>
				<DeleteQuestionCardMenuButton onClick={toggleDrawer}/>
			</List>
		</Drawer>
	);
}

function QuestionEditButton() {
	const {isOpen, toggleDrawer} = useDrawer();

	return (
		<span>
			<QuestionEditButtonStyle onClick={toggleDrawer}>
				<Typography color={"textSecondary"}>
					<MoreHorizIcon/>
				</Typography>
			</QuestionEditButtonStyle>
			<QuestionCardDrawer {...{isOpen, toggleDrawer}} />
		</span>
	);
}

function QuestionBody({question, isMyQuestion}) {
	return (
		<span>
			{question}
			{isMyQuestion && <QuestionEditButton/>}
		</span>
	);
}

export default QuestionBody;
