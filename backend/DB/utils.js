import { Sequelize } from "sequelize";

function applyAllConstraint(queryInterface, tableName, constraints) {
    constraints.forEach(({ attributes, options }) => {
        queryInterface.addConstraint(tableName, attributes, options);
    });
}

async function loadSequelize(config) {
    const sequelize = new Sequelize(
        config.scheme,
        config.user,
        config.password,
        config
    );

    await sequelize.authenticate();

    return sequelize;
}

module.exports = { applyAllConstraint, loadSequelize };
