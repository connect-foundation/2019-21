const should = require("should");
const httpMocks = require("node-mocks-http");

const req = httpMocks.createRequest();
const res = httpMocks.createResponse();
const models = require("../DB/models");
// middleware 테스트 해야 한다면 아래와 같이 mockhttp 사용
// const test1 = await SOME_MIDDLE_WARE.index(req, res);

describe("DB_TEST", () => {
	it("dbtest1", async () => {
		// 여기에 테스트 쿼리 문을 작성하고 그 값을 확인하면 됩니다.
		const events = await models.Event.findOne({
			attributes: ["code", "moderationOption", "replyOption"],
		});

		events.dataValues.should.be.eql({
			code: "k9me",
			moderationOption: true,
			replyOption: false,
		});
	});
	// 같은 방식으로 새로운 테스트를 시작할 수 있습니다.
	it("dbtest2", async () => {
		const newTest = "blahblah";
	});
});
