import { findHostById } from "../../../DB/queries/host";
import { getEventsByHostId } from "../../../DB/queries/event.js";

export default {
	Query: {
		events: async (_, {}, ctx) => {
			// const payload = ctx.auth;

			// if (payload.aud !== "host") {
			// 	// 에러처리
			// }
			// const host = ctx.user;
			return getEventsByHostId(27);
		},


		init: async (_, {}, ctx) => {
			// const payload = ctx.auth;

			// if (payload.aud !== "host") {
			// 	// 에러처리
			// }
			// const host = ctx.user;
			const events = await getEventsByHostId(27);
			const host = await findHostById("Claude_Kunze");

			return { events, host };
		},
	},
};
