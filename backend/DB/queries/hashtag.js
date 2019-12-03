import models from "../models";

const Hashtag = models.Hashtag;

export async function createHashtag({name, EventId}) {
	return Hashtag.create(
		{name, EventId},
		{default: {updateAt: new Date(), createAt: new Date()}},
	);
}

export async function updateHashtagById({name, id}) {
	return Hashtag.update({name}, {where: {id}});
}

export async function deleteHashTagById(id) {
	return Hashtag.destroy({where: {id}});
}

export async function getHashtagByEventId(EventId) {
	return Hashtag.findAll({where: {EventId}});
}
