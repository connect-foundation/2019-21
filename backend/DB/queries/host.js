import models from "../models";

async function findHostById(oAuthid) {
	const host = await models.Host.findOne({ where: { oauthId: oAuthid } });
	const result = host ? host.dataValues : false;
	return result;
}

async function createHost(oAuthid, name, image, email) {
	const host = await models.Host.create({
		oauthId: oAuthid,
		name: name,
		email: email,
		image: image,
		emailFeedBack: 0,
	});
	const result = host ? host.dataValues : false;
	return result;
}

export { createHost, findHostById };
