import React, {useState} from "react";
import styled from "styled-components";
import Column from "./Column";
import {socketClient, useSocket} from "../libs/socket.io-Client-wrapper";
import useQueryQuestions from "../libs/useQueryQuestions";
import {makeNewData} from "../libs/utils";

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

function Inner({data, event, option}) {
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
		const newData = makeNewData(req);

		switch (req.status) {
			case "moderation" :
				return setModerationDatas({questions: [...(modeartionDatas.questions), newData]});
			case "active" :
				return setNewQuestionDatas({questions: [...(newQuestionDatas.questions), newData]});
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

		return setQuestionNumber([modeartionDatas.questions.length, newQuestionDatas.questions.length, newQuestionDatas.questions.length, completeQuestionDatas.questions.length]);//state 가 한step 늦게 반영됩니다
		/*
			Q1: 
			이 함수는 'question/move' 이벤트를 받았을 때 질문을 다른 컬럼으로 이동시키고, UI 상에서 해당 컬럼의
			질문 숫자를 update하는 코드입니다. 
			현재 위의 fromObject.handler 와 toObject.handler 로 인해 setter 함수가 불린 이후인데요
			해당 setter 의 결과로 각각 컬럼의 data 들이 바뀌었으리라고 예상했지만,setQuestionNumber 에서 바뀐 값으로 update 되지 않습니다. useState 로 인해 반환되는 state setter 함수가 바로 반영되는게 아닌것 같은데...(마치 비동기처럼) 바뀐 state 를 바로 사용할 수 있는 방법이 없을까요..? 
			가령 현재 moderationData 가 [{질문1},{질문2}] 이고 newQuestionData 가 [{질문3}] 이었는데
			handler 로 인해 setModerationData([{질문1}]) setNewQuestionData([{질문2},{질문3}])
			와 같이 불려도 질문의 length 를 재보면 여전히 moderationData가 2 newQuestionData가 1인 상황입니다... 이렇게 변경한 state를 바로 사용하고 싶을때는 어떻게 하나요?


			Q2:
			현재 setQuestionNumber([modeartionDatas.questions.length, newQuestionDatas.questions.length, newQuestionDatas.questions.length, completeQuestionDatas.questions.length]) 와 같이 set 함수 안에 어마어마한 길이의(읽기싫은 형태의...) 배열이 인자로 들어갑니다... 처음에는
			setQuestionNumber([
				modeartionDatas.questions.length,
				newQuestionDatas.questions.length,
				newQuestionDatas.questions.length,
				completeQuestionDatas.questions.length]) 
			와 같은 느낌으로 작성하였는데 lint 의 권장사항이 , 뒤에 개행하지 말고 붙여서 쓰라는것이었습니다...
			하지만 한줄로 써버리면 한줄에 100자를 넘는다고 또 lint의 수정 권고를 받는 상황입니다.
			아예
			const moderationLength = modeartionDatas.questions.length; 와 같이 변수로 선언해서
			변수들만 list 에 넣을까 하는 생각도 했는데, 4개의 변수를 다 따로 빼는게 더 지저분한가 싶어서 어떤 방법이 좋을지 고민이 됩니다! 리뷰어님은 이런 경우 어떻게 처리하시는지 궁금합니다.

		*/

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
	const {loading, error, data} = useQueryQuestions();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			<Inner data={data.newData} event={event} option={data.newOption}/>
		</>
	);
}

export default Content;
