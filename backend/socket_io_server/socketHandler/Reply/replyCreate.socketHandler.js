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
	status = "active",
	QuestionId,
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
		status,
		QuestionId,
		isStared,
	};
}

const replyCreateSocketHandler = async (data, emit, socket, server) => {
	try {
		const newQuestion = getNewQuestion(data);
		const {
			EventId,
			content,
			GuestId,
			guestName,
			QuestionId,
			isAnonymous,
		} = newQuestion;

		logger.debug(data);

		const event = await eventCache.get(EventId);
		const currentModerationOption = event.moderationOption;
		const reqData = newQuestion;
		let newData;

		// todo 성능 개선: 위해 여러개의 DB query를 promise.all 처리해야함
		if (currentModerationOption) {
			reqData.status = QUESTION_STATE_MODERATION;
			newData = await createQuestion(
				EventId,
				content,
				GuestId,
				QuestionId,
				QUESTION_STATE_MODERATION,
			);
		} else {
			newData = await createQuestion(
				EventId,
				content,
				GuestId,
				QuestionId,
			);
		}

		await updateGuestById({
			id: GuestId,
			name: guestName,
			isAnonymous,
		});
		reqData.id = newData.get({plain: true}).id;
		reqData.QuestionId = QuestionId;
		emit(reqData);
	} catch (e) {
		logger.error(`${e.toString()}\n${e.stack}`);
		socket.send({status: "error", error: e});
	}
};

const eventName = "reply/create";

export default {
	eventName,
	handler: replyCreateSocketHandler,
};
