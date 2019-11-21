const should = require("should");
const httpMocks = require("node-mocks-http");
const Sequelize = require("sequelize");
const queries = require("../DB/queries/event");

const req = httpMocks.createRequest();
const res = httpMocks.createResponse();
const models = require("../DB/models");

// middleware 테스트 해야 한다면 아래와 같이 mockhttp 사용
// const test1 = await SOME_MIDDLE_WARE.index(req, res);

async function eventQuestionChecker(eventCode){
	const questions = await queries.prototype.getQuestionsInEvent(eventCode);
	const parsedQuestion = JSON.parse(JSON.stringify(questions));
	return parsedQuestion[0].Questions.map(elem => elem.id);
}

describe("DB_TEST", () => {
	it("get question Id from EventCode k9me", async () => {
		const compare = await eventQuestionChecker("k9me");
		new Set(compare).should.be.eql(new Set([]));
	});
	it("get question Id from EventCode u0xn", async () => {
		const compare = await eventQuestionChecker("u0xn");
		new Set(compare).should.be.eql(new Set([119]));
	});
	it("get question Id from EventCode 1cfs", async () => {
		const compare = await eventQuestionChecker("1cfs");
		new Set(compare).should.be.eql(new Set([27, 50, 96, 279, 298]));
	});
	it("get question Id from EventCode dutu", async () => {
		const compare = await eventQuestionChecker("dutu");
		new Set(compare).should.be.eql(new Set([212, 220]));
	});
	it("get question Id from EventCode uomf", async () => {
		const compare = await eventQuestionChecker("uomf");
		new Set(compare).should.be.eql(new Set([172, 228]));
	});
});

