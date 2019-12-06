import {getLikesByGuestId} from "../../../DB/queries/like.js";

const didILikeResolver = async GuestId => getLikesByGuestId(GuestId);

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		didILikes: (_, {GuestId}) => didILikeResolver(GuestId),
	},
};
