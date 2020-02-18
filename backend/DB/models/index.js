"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// change config setting *.json to *.config.js
const config = require(path.resolve(__dirname, "../sequelize.config.js"))[env];
const db = {};

let sequelize;
// noinspection JSUnresolvedVariable
if (config.use_env_variable) {
	// noinspection JSValidateTypes,JSCheckFunctionSignatures
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	if (process.env.IS_DOCKER_CONTAINER) {
		config.host = config.containerName;
	}

	// noinspection JSValidateTypes
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
		);
	})
	.forEach(file => {
		const model = sequelize["import"](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	// noinspection JSUnresolvedVariable
	if (db[modelName].associate) {
		// noinspection JSUnresolvedVariable
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
