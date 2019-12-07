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
	isAnonymous = false,
	createdAt = new Date().getTime(),
	isShowEditButton = true,
	didILike = false,
	likeCount = 0,
	status = "active",
	isStared = false,
}) {
	return {
		guestName,
		EventId,
		GuestId,
		createdAt,
		content,
		isShowEditButton,
		isAnonymous,
		didILike,
		likeCount,
		status,
		isStared,
	};
}

const questionCreateSocketHandler = async (data, emit, socket, server) => {
	try {
		const newQuestion = getNewQuestion(data);
		const {EventId, content, GuestId, guestName, isAnonymous} = newQuestion;

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
				QUESTION_STATE_MODERATION,
			);
		} else {
			newData = await createQuestion(EventId, content, GuestId);
		}

		await updateGuestById({
			id: GuestId,
			name: guestName,
			isAnonymous,
		});

		reqData.id = newData.get({plain: true}).id;

		// todo 성능 개선: moderation기능이 on인경우 host에만 send 하도록 수정
		emit(reqData);

	} catch (e) {
		logger.error(`${e.toString()}\n${e.stack}`);
		socket.send({status: "error", error: e});
	}
};

const eventName = "question/create";

export default {
	eventName,
	handler: questionCreateSocketHandler,
};
