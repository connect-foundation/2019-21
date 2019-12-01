import query from "../../../DB/queries/event";

export default {
	Query: {
		events: async (_, {}, ctx) => {
			const payload = ctx.auth;
			if (payload.aud !== "host") {
				//에러처리
			}
			const host = ctx.user;
			return await query.getEventsByHost(host.id);
		},
		init: async (_, {}, ctx) => {
			const payload = ctx.auth;
			if (payload.aud !== "host") {
				//에러처리
			}
			const host = ctx.user;
			const events = await query.getEventsByHost(host.id);
			return { events, host };
		},
	},
};
