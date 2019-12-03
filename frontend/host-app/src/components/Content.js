import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import styled from "styled-components";
import Column from "./Column";
import EmptyContent from "./EmptyContent";
import {socketClient, useSocket} from "../libs/socket.io-Client-wrapper";

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

const EXCHANGE_RATES = gql`
    {
        questions(eventCode: "u0xn", guestId: 148) {
            content
            id
            likeCount
            isLike
            GuestId
            state
            createdAt
            guestName
            Emojis {
                EmojiName
            }
        }
    }
`;

const filterQuestion = (option, data) => data.filter(e => e.state === option);

function Inner({data, event}) {
	const SELECTED = true;
	const UNSELECTED = false;
	const MODERATION_ON = true;
	const MODERATION_OFF = false;
	const [radioState, setRadioState] = useState([SELECTED, UNSELECTED, UNSELECTED, UNSELECTED]);
	const [moderationState, setModeration] = useState(MODERATION_OFF);
	const [modeartionDatas, setModerationDatas] = useState({questions: filterQuestion("moderation", data)});
	const [newQuestionDatas, setNewQuestionDatas] = useState({questions: filterQuestion("active", data)});
	const [completeQuestionDatas, setCompleteQuestionDatas] = useState({questions: filterQuestion("completeQuestion", data)});
	const [questionNumberStatus] = useState([modeartionDatas.questions.length, newQuestionDatas.questions.length, newQuestionDatas.questions.length, completeQuestionDatas.questions.length]);
	const [pollNumberStatus] = useState(0);

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
			state: "active",
		};

		setNewQuestionDatas({questions: [...(newQuestionDatas.questions), tempData]});
	});

	const handleRadioState = buttonIndex => {
		const newState = [UNSELECTED, UNSELECTED, UNSELECTED, UNSELECTED]
			.map((_, idx) => (idx === buttonIndex ? SELECTED : UNSELECTED));

		setRadioState(newState);
	};

	const handleModerationState = () => {
		moderationState === MODERATION_ON ? setModeration(MODERATION_OFF) : setModeration(MODERATION_ON);
	};

	const typeMap = {
		moderation: {
			state: moderationState,
			stateHandler: handleModerationState,
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
	};

	const handleQuestionDatas = (id, from, to) => {
		const fromObject = typeMap[from];
		const toObject = typeMap[to];

		if (id === "all") {
			fromObject.handler({questions: []});
			return toObject.handler({questions: [...toObject.data.questions, ...fromObject.data.questions]});
		}

		fromObject.handler({questions: fromObject.data.questions.filter(e => e.id !== id)});
		return toObject.handler({questions: [
			...toObject.data.questions, fromObject.data.questions
				.find(e => e.id === id),
		]});
	};

	const handleStar = (id, type) => {
		const targetObject = typeMap[type];

		targetObject.handler({
			questions: targetObject.data.questions
				.map(e => {
					if (e.id === id) { e.isStared = !e.isStared; }
					return e;
				}),
		});
	};

	return event ? (
		<ContentStyle>
			{Object.keys(typeMap).splice(0, Object.keys(typeMap).length - 1)
				.map(e => (<Column
					type={e}
					state={typeMap[e].state}
					stateHandler={typeMap[e].stateHandler}
					data={typeMap[e].data}
					badgeState={questionNumberStatus}
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
	) : (
		<ContentStyle>
			<EmptyContent/>
		</ContentStyle>
	);
}

function Content({event}) {
	const {loading, error, data} = useQuery(EXCHANGE_RATES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<Inner data={data.questions} event={event}/>
		</>
	);
}

export default Content;
