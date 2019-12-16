import {deleteVoteBy} from "../../../DB/queries/vote";
import logger from "../../logger.js";

const rateOffSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, poll, index} = data;

		await deleteVoteBy({GuestId, CandidateId});

		emit({
			status: "ok",
			GuestId,
			poll,
			index,
		});
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "rate/off";

export default {
	eventName,
	handler: rateOffSocketHandler,
};
