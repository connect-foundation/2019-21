import models from "../models";

// todo: 더 좋은 이름
export async function findHostByAuthId(oauthId) {
	const host = await models.Host.findOne({where: {oauthId}});

	return host ? host.dataValues : false;
}

export async function createHost(oauthId, name, image, email) {
	const host = await models.Host.create({
		oauthId,
		name,
		email,
		image,
		emailFeedBack: false,
	});

	return host ? host.dataValues : false;
}
