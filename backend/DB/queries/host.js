import models from "../models";

// noinspection JSUnresolvedVariable
const Host = models.Host;

// todo: 더 좋은 이름
// todo refactoring
export async function findHostByAuthId(oauthId) {
	const host = await Host.findOne({where: {oauthId}});

	return host ? host.dataValues : false;
}

/**
 *
 * @param oauthId {string}
 * @param name {string|undefined}
 * @param image {string|undefined}
 * @param email {string|undefined}
 * @returns {Promise<object>}
 */
export async function findOrCreateHostByOAuth({oauthId, name, image, email}) {
	const res = await Host.findOrCreate({
		where: {oauthId},
		defaults: {name, image, email, emailFeedBack: false},
	});

	return res[0].get({plain: true});
}
