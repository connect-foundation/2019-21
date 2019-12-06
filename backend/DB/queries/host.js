import models from "../models";

async function findHostByAuthId(oAuthid) {
	const host = await models.Host.findOne({where: {oauthId: oAuthid}});
	const result = host ? host.dataValues : false;

	return result;
}

async function createHost(oAuthid, name, image, email) {
	const host = await models.Host.create({
		oauthId: oAuthid,
		name,
		email,
		image,
		emailFeedBack: 0,
	});
	const result = host ? host.dataValues : false;

	return result;
}

export {createHost, findHostByAuthId};
