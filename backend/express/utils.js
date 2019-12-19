import {getEventByEventCode} from "../DB/queries/event";
import {compareCurrentDateToTarget} from "../libs/utils";

async function convertPathToEventId(path, guest) {
	const eventCode = Buffer.from(path, "base64").toString();
	let event = await getEventByEventCode(eventCode);
	event = event.get({plain: true});
	const diff = compareCurrentDateToTarget(event.endAt);
	if (diff <= 0) {
		throw new Error("이벤트 만료기간이 지났습니다.");
	}
	return event.id;
}

export {convertPathToEventId};
