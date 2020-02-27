import {getEventByEventCode} from "../DB/queries/event";
import {compareCurrentDateToTarget} from "../libs/utils";

// eslint-disable-next-line import/prefer-default-export
export async function convertPathToEventId(path) {
	const eventCode = Buffer.from(path, "base64").toString();
	const event = await getEventByEventCode(eventCode);
	const diff = compareCurrentDateToTarget(event.endAt);

	if (diff <= 0) {
		throw new Error("이벤트 만료기간이 지났습니다.");
	}

	return event.id;
}
