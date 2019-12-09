import {deleteVoteBy} from "../../../DB/queries/vote";

const voteOffSocketHandler = async (data, emit) => {
	try {
		const {GuestId, CandidateId, allowDuplication, poll} = data;

		await deleteVoteBy({GuestId, CandidateId});

		emit({
			GuestId: GuestId,
			poll: poll,
		});
	} catch (e) {
		console.error(e);
		emit({status: "error(vote/off)", e});
	}
};

const eventName = "vote/off";

export default {
	eventName,
	handler: voteOffSocketHandler,
};
