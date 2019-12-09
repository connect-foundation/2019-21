export default class RedisJSONCache {
	constructor(type, onMiss = () => null, redisClient = undefined) {
		this.type = type;
		this.onMiss = onMiss;
		this.redisClient = redisClient;
	}

	fullKey(key) {
		return `${this.type}/${key}`;
	}

	async set(key, value) {
		return this.redisClient.set(this.fullKey(key), JSON.stringify(value));
	}

	async get(key) {
		let value = await this.redisClient.get(this.fullKey(key));

		if (value) {
			return JSON.parse(value);
		}

		try {
			value = await this.onMiss(key);
		} catch (e) {
			throw Error(`while execute onMiss callback in RedisJSONCache.get ${key}, error raised \n ${e}`);
		}

		await this.set(key, value);

		return value;
	}
}
