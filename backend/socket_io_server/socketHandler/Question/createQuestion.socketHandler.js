import {createQuestion} from "../../../DB/queries/question";
import {updateGuestById} from "../../../DB/queries/guest";
import eventCache from "../../EventCache.js";
import logger from "../../logger.js";

const QUESTION_STATE_MODERATION = "moderation";

function getNewQuestion({
	EventId,
	GuestId,
	guestName,
	content,
	emojis = [],
	isAnonymous = false,
	createdAt = new Date().getTime()
		.toString(),
	isShowEditButton = true,
	didILike = false,
	likeCount = 0,
	state = "active",
	QuestionId = null,
	isStared = false,
}) {
	return {
		guestName,
		EventId,
		GuestId,
		emojis,
		createdAt,
		content,
		isShowEditButton,
		isAnonymous,
		didILike,
		likeCount,
		state,
		QuestionId,
		isStared,
	};
}

const createQuestionSocketHandler = async (data, emit, socket) => {
	try {
		const newQuestion = getNewQuestion(data);
		const {
			EventId,
			content,
			GuestId,
			guestName,
			isAnonymous,
			QuestionId,
		} = newQuestion;

		logger.debug(data);

		const event = await eventCache.get(EventId);
		const currentModerationOption = event.moderationOption;
		const reqData = newQuestion;
		let state;

		if (currentModerationOption) {
			reqData.state = QUESTION_STATE_MODERATION;
			state = QUESTION_STATE_MODERATION;
		}

		// todo 성능 개선: 위해 여러개의 DB query를 promise.all 처리해야함
		const newData = await createQuestion({
			EventId,
			content,
			GuestId,
			QuestionId,
			state,
		});

		await updateGuestById({
			id: GuestId,
			name: guestName,
			isAnonymous,
		});

		reqData.id = newData.id;
		if (QuestionId) {
			reqData.QuestionId = QuestionId;
		} else {
			reqData.QuestionId = null;
		}

		// todo 성능 개선: moderation기능이 on인경우 host에만 send 하도록 수정
		emit(reqData);
	} catch (e) {
		logger.error(`${e.toString()}\n${e.stack}`);
		socket.send({status: "error", error: e});
	}
};

const eventName = "question/create";

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: createQuestionSocketHandler,
};
