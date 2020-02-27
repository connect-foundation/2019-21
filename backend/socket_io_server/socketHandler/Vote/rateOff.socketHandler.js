import {deleteVoteBy} from "../../../DB/queries/vote";
import updateVoters from "./updateVoters";
import logger from "../../logger.js";

const rateOffSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, poll, index} = data;

		await deleteVoteBy({GuestId, CandidateId});

		await updateVoters(poll);

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

// noinspection JSUnusedGlobalSymbols
export default {
	eventName,
	handler: rateOffSocketHandler,
};
