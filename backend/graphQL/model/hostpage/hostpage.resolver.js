import query from "../../../DB/queries/event";

export default {
	Query: {
		events: async (_, {}, ctx) => {
			// const payload = ctx.auth;

			// if (payload.aud !== "host") {
			// 	// 에러처리
			// }
			// const host = ctx.user;

			return await query.getEventsByHostId(27);
		},
		init: async (_, {}, ctx) => {
			// const payload = ctx.auth;

			// if (payload.aud !== "host") {
			// 	// 에러처리
			// }
			// const host = ctx.user;
			const events = await query.getEventsByHostId(27);

			return { events, host };
		},
	},
};
