const getSequelizeData = function(data) {
	return JSON.parse(JSON.stringify(data));
};

const getTokenExpired = hour => new Date(new Date().getTime() + 1000 * 60 * 60 * Number(hour));

export {getSequelizeData, getTokenExpired};
