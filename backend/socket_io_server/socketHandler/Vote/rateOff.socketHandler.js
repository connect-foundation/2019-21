import {deleteVoteBy} from "../../../DB/queries/vote";

const rateOffSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, poll, index} = data;

		console.log("vote/off handler", data);
		await deleteVoteBy({GuestId, CandidateId});

		emit({
			GuestId,
			poll,
			index,
		});
	} catch (e) {
		console.error(e);
		emit({status: "error(rate/off)", e});
	}
};

const eventName = "rate/off";

export default {
	eventName,
	handler: rateOffSocketHandler,
};
