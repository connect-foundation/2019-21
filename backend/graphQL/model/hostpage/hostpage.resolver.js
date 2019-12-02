import query from "../../../DB/queries/event";

export default {
	Query: {
		events: async (_, {}, ctx) => {
			const payload = ctx.auth;

			if (payload.aud !== "host") {
				// 에러처리
			}
			const host = ctx.user;

			return await query.getEventsByHostId(host.id);
		},
		init: async (_, {}, ctx) => {
			const payload = ctx.auth;

			if (payload.aud !== "host") {
				// 에러처리
			}
			const host = ctx.user;
			const events = await query.getEventsByHostId(host.id);

			return {events, host};
		},
	},
};
