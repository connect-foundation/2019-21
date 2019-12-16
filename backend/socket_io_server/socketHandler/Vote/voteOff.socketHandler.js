import {deleteVoteBy} from "../../../DB/queries/vote";
import logger from "../../logger.js";

const voteOffSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, poll} = data;

		await deleteVoteBy({GuestId, CandidateId});

		emit({
			status: "ok",
			GuestId,
			poll,
		});
	} catch (e) {
		logger.error(e);
		emit({status: "error", e});
	}
};

const eventName = "vote/off";

export default {
	eventName,
	handler: voteOffSocketHandler,
};
