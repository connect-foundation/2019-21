import models from "../models";

// noinspection JSUnresolvedVariable
const Host = models.Host;

// todo: 더 좋은 이름
// todo refactoring
export async function findHostByAuthId(oauthId) {
	const host = await Host.findOne({where: {oauthId}});

	return host ? host.dataValues : false;
}

// todo refactoring
export async function createHost(oauthId, name, image, email) {
	const host = await Host.create({
		oauthId,
		name,
		email,
		image,
		emailFeedBack: false,
	});

	return host ? host.dataValues : false;
}
