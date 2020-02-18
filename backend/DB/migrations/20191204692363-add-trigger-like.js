const createLikeCountIncrementTrigger = `
CREATE TRIGGER inc_likeCount
AFTER INSERT ON Likes 
FOR EACH ROW
UPDATE Questions SET Questions.likeCount = Questions.likeCount + 1 where NEW.QuestionId = id
`;

const dropLikeCountIncrementTrigger = `
drop TRIGGER inc_likeCount
`;

const createLikeCountDecrementTrigger = `
CREATE TRIGGER dec_likeCount
AFTER delete ON Likes 
FOR EACH ROW
UPDATE Questions SET Questions.likeCount = Questions.likeCount - 1 where OLD.QuestionId = id
`;

const dropLikeCountDecrementTrigger = `
drop TRIGGER dec_likeCount
`;

module.exports = {
	up: queryInterface =>
		queryInterface.sequelize
			.query(createLikeCountIncrementTrigger)
			.then(() =>
				queryInterface.sequelize.query(createLikeCountDecrementTrigger),
			),
	down: queryInterface =>
		queryInterface.sequelize
			.query(dropLikeCountIncrementTrigger)
			.then(() =>
				queryInterface.sequelize.query(dropLikeCountDecrementTrigger),
			),
};
