import {deleteVoteBy} from "../../../DB/queries/vote";
import updateVoters from "./updateVoters";
import logger from "../../logger.js";

const voteOffSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, poll} = data;

		await deleteVoteBy({GuestId, CandidateId});

		await updateVoters(poll);

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

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: voteOffSocketHandler,
};
