import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import styled from "styled-components";
import Column from "./Column";
import {socketClient, useSocket} from "../libs/socket.io-Client-wrapper";
import {getQuestionsByEventCodeAndGuestId} from "../libs/gql";

const ContentStyle = styled.div`
	display: flex;
	flex-direction: row;
	flex: 1;
	overflow: auto;
	justify-content: left;
	align-items: center;
	padding: 4px 8px;
	overflow-x: auto;
	flex-wrap: nowrap;
`;

const filterQuestion = (option, data) => data.filter(e => e.state === option);

function Inner({data, event ,option}) {
	const SELECTED = true;
	const UNSELECTED = false;

	const [radioState, setRadioState] = useState([SELECTED, UNSELECTED, UNSELECTED, UNSELECTED]);
	const [moderationState, setModeration] = useState(option.moderationOption); // get from DB
	const [modeartionDatas, setModerationDatas] = useState({questions: filterQuestion("moderation", data)});
	const [newQuestionDatas, setNewQuestionDatas] = useState({questions: filterQuestion("active", data)});
	const [completeQuestionDatas, setCompleteQuestionDatas] = useState({questions: filterQuestion("completeQuestion", data)});
	const [questionNumber, setQuestionNumber] = useState([modeartionDatas.questions.length, newQuestionDatas.questions.length, newQuestionDatas.questions.length, completeQuestionDatas.questions.length]);
	const [pollNumberStatus] = useState(0);

	const handleRadioState = buttonIndex => {
		const newState = [UNSELECTED, UNSELECTED, UNSELECTED, UNSELECTED]
			.map((_, idx) => (idx === buttonIndex ? SELECTED : UNSELECTED));

		setRadioState(newState);
	};

	const typeMap = {
		moderation: {
			state: moderationState,
			stateHandler: setModeration,
			data: modeartionDatas,
			handler: setModerationDatas,
		},
		newQuestion: {
			state: radioState,
			stateHandler: handleRadioState,
			data: newQuestionDatas,
			handler: setNewQuestionDatas,
		},
		popularQuestion: {
			state: radioState,
			stateHandler: handleRadioState,
			data: newQuestionDatas,
			handler: setNewQuestionDatas,
		},
		completeQuestion: {
			state: radioState,
			stateHandler: handleRadioState,
			data: completeQuestionDatas,
			handler: setCompleteQuestionDatas,
		},
		deleted: {
			data: {
				questions: [],
			},
			handler: e => typeMap.deleted.data.questions.push(e),
		},
		active: {
			data: newQuestionDatas,
			handler: setNewQuestionDatas,
		},
	};

	useSocket("question/create", req => {
		// DB 와 sequelize 이름이 달라 error 발생해서 임시조치
		const tempData = {
			Emojis: [],
			GuestId: req.guestId,
			content: req.content,
			createdAt: req.date,
			guestName: req.userName,
			id: Math.floor(Math.random() * 9999999), // id sequelize 로부터 받아와야 함
			isLike: false,
			likeCount: 0,
			state: req.status,
		};

		switch (req.status) {
			case "moderation" :
				return setModerationDatas({questions: [...(modeartionDatas.questions), tempData]});
			case "active" :
				return setNewQuestionDatas({questions: [...(newQuestionDatas.questions), tempData]});
			default: return "err";
		}
	});

	useSocket("question/toggleStar", req => {
		const targetColumn = typeMap[req.state];
		const newData = targetColumn.data.questions.map(e => ((e.id === req.id) ? req : e));

		targetColumn.handler({questions: [...newData]});
	});

	useSocket("question/move", req => {
		const fromObject = typeMap[req.from];
		const toObject = typeMap[req.to];

		if (req.id === "all") {
			const newCompleteData = [...toObject.data.questions, ...fromObject.data.questions];

			fromObject.handler({questions: []});
			toObject.handler({questions: newCompleteData});
			return setQuestionNumber([modeartionDatas.questions.length, 0, 0, newCompleteData.length]);
		}

		fromObject.handler({questions: fromObject.data.questions.filter(e => e.id !== req.id)});
		toObject.handler({questions: [
			...toObject.data.questions, fromObject.data.questions
				.find(e => e.id === req.id),
		]});

		return setQuestionNumber([modeartionDatas.questions.length,newQuestionDatas.questions.length,newQuestionDatas.questions.length,completeQuestionDatas.questions.length]);
		// bug: state 가 한박자 늦게 update. 아직 handler 로 인한 state 변화가 update 되지 않았기 때문으로 추정함.
	});

	const handleQuestionDatas = (id, from, to) => socketClient.emit("question/move", {id, from, to});

	const handleStar = (id, type) => {
		const targetObject = typeMap[type];

		targetObject.data.questions.some(e => {
			if (e.id === id) {
				e.isStared = !e.isStared;
				socketClient.emit("question/toggleStar", e);
				return true;
			}
			return false;
		});
	};

	return (
		<ContentStyle>
			{Object.keys(typeMap).splice(0, Object.keys(typeMap).length - 2)
				.map(e => (<Column
					type={e}
					state={typeMap[e].state}
					stateHandler={typeMap[e].stateHandler}
					data={typeMap[e].data}
					badgeState={questionNumber}
					dataHandler={handleQuestionDatas}
					handleStar={handleStar}
				/>))}
			<Column
				type="poll"
				state={radioState}
				stateHandler={handleRadioState}
				badgeState={pollNumberStatus}
			/>
		</ContentStyle>
	);
}

function Content({event}) {
	const {loading, error, data} = useQuery(getQuestionsByEventCodeAndGuestId());

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<Inner data={data.questions} event={event} option={data.getEventOption}/>
		</>
	);
}

export default Content;
