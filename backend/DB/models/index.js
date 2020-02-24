"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// change config setting *.json to *.config.js
const config = require(path.resolve(__dirname, "../sequelize.config.js"))[env];

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
		config,
	);
}

// import es6 base sequelize model
// ref https://codewithhugo.com/using-es6-classes-for-sequelize-4-models/
// pass your sequelize config here
import Host from "./host.js";
import Emoji from "./emoji.js";
import Event from "./event.js";
import Guest from "./guest.js";
import Hashtag from "./hashtag.js";
import Like from "./like.js";
import Poll from "./poll.js";
import Question from "./question.js";
import Vote from "./vote.js";
import Candidate from "./candidate.js";

// init all sequelize model
const models = {
	Host: Host.init(sequelize, Sequelize),
	Event: Event.init(sequelize, Sequelize),
	Emoji: Emoji.init(sequelize, Sequelize),
	Guest: Guest.init(sequelize, Sequelize),
	Hashtag: Hashtag.init(sequelize, Sequelize),
	Like: Like.init(sequelize, Sequelize),
	Poll: Poll.init(sequelize, Sequelize),
	Question: Question.init(sequelize, Sequelize),
	Vote: Vote.init(sequelize, Sequelize),
	Candidate: Candidate.init(sequelize, Sequelize),
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
	.filter(model => typeof model.associate === "function")
	.forEach(model => model.associate(models));

const db = {
	...models,
	sequelize,
};

module.exports = db;
