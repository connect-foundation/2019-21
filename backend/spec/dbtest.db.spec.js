const should = require("should");
const httpMocks = require("node-mocks-http");
const Sequelize = require("sequelize");
const queries = require("../DB/queries/event");
const req = httpMocks.createRequest();
const res = httpMocks.createResponse();
const models = require("../DB/models");

// middleware 테스트 해야 한다면 아래와 같이 mockhttp 사용
// const test1 = await SOME_MIDDLE_WARE.index(req, res);

describe("DB_TEST", () => {
	it("get question Id from EventCode k9me", async () => {
		const questions = await queries.prototype.getQuestionsInEvent("k9me");
		const parsedQuestion = JSON.parse(JSON.stringify(questions));
		const compare = [];

		parsedQuestion[0].Questions.forEach(elem => compare.push(elem.id));
		compare.should.be.eql([]);
	});
	it("get question Id from EventCode u0xn", async () => {
		const questions = await queries.prototype.getQuestionsInEvent("u0xn");
		const parsedQuestion = JSON.parse(JSON.stringify(questions));
		const compare = [];

		parsedQuestion[0].Questions.forEach(elem => compare.push(elem.id));
		compare.should.be.eql([119]);
	});
	it("get question Id from EventCode 1cfs", async () => {
		const questions = await queries.prototype.getQuestionsInEvent("1cfs");
		const parsedQuestion = JSON.parse(JSON.stringify(questions));
		const compare = [];

		parsedQuestion[0].Questions.forEach(elem => compare.push(elem.id));
		compare.should.be.eql([27, 50, 96, 279, 298]);
	});
	it("get question Id from EventCode dutu", async () => {
		const questions = await queries.prototype.getQuestionsInEvent("dutu");
		const parsedQuestion = JSON.parse(JSON.stringify(questions));
		const compare = [];

		parsedQuestion[0].Questions.forEach(elem => compare.push(elem.id));
		compare.should.be.eql([212, 220]);
	});
	it("get question Id from EventCode uomf", async () => {
		const questions = await queries.prototype.getQuestionsInEvent("uomf");
		const parsedQuestion = JSON.parse(JSON.stringify(questions));
		const compare = [];

		parsedQuestion[0].Questions.forEach(elem => compare.push(elem.id));
		compare.should.be.eql([172, 228]);
	});
});
