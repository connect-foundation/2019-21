import {getEventById} from "../DB/queries/event.js";
import RedisJSONCache from "../redis/redisJSONCache.js";
import redisClient from "../redis/redisClient.js";

const onMiss = async eventId =>
	(await getEventById(eventId)).get({plain: true});

const eventCache = new RedisJSONCache("EventId", onMiss, redisClient);

export default eventCache;
