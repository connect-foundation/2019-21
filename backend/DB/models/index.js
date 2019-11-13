const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// change config setting *.json to *.config.js
let config = require(path.resolve(__dirname, "../sequelize.config.js"))[env];
const db = {};

let sequelize;

let a = require(path.resolve(__dirname, "../sequelize.config.js"));

// noinspection JSUnresolvedVariable
config = a.development;
sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));

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
