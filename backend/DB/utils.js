import { Sequelize } from "sequelize";
import faker from "faker";
import moment from "moment";

faker.seed(1234);

function makeQuestionDummy(number = 100) {
    let bulkQuestion = [];
    for (let i = 0; i < number; ++i) {
        let content = faker.lorem.sentence();
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let EventId = faker.random.number({ min: 1, max: 200 });
        let GuestId = faker.random.number({ min: 1, max: 200 });
        bulkQuestion.push({
            content,
            createdAt,
            updatedAt,
            EventId,
            GuestId,
        });
    }
    return bulkQuestion;
}
function makeEmojiDummy(number = 50) {
    let bulkEmoji = [];
    for (let i = 0; i < number; ++i) {
        let name = faker.name.lastName();
        let url = faker.image.avatar();
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        bulkEmoji.push({
            name,
            url,
            createdAt,
            updatedAt,
        });
    }
    return bulkEmoji;
}

function makeHostDummy(number = 100) {
    let bulkHost = [];
    for (let i = 0; i < number; ++i) {
        let oauthId = faker.internet.userName();
        let email = faker.internet.email();
        let name = faker.name.firstName();
        let emailFeedBack = faker.random.boolean();
        let createdAt = faker.date.past(10);
        let updatedAt = createdAt;
        bulkHost.push({
            oauthId,
            email,
            name,
            emailFeedBack,
            createdAt,
            updatedAt,
        });
    }
    return bulkHost;
}

function makeGuestDummy(number = 200) {
    let bulkGuest = [];
    for (let i = 0; i < number; ++i) {
        let name = faker.name.firstName();
        let guestSid = faker.random.uuid();
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let EventId = faker.random.number({ min: 1, max: 200 });
        bulkGuest.push({
            name,
            createdAt,
            updatedAt,
            EventId,
            guestSid,
        });
    }
    return bulkGuest;
}

function makeReplyDummy(number = 300) {
    let bulkReply = [];
    for (let i = 0; i < number; ++i) {
        let content = faker.lorem.sentence();
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let GuestId = faker.random.number({ min: 1, max: 200 });
        let QuestionId = faker.random.number({ min: 1, max: 100 });
        bulkReply.push({
            content,
            createdAt,
            updatedAt,
            GuestId,
            QuestionId,
        });
    }
    return bulkReply;
}

function makePollDummy(number = 200) {
    let bulkPoll = [];
    for (let i = 0; i < number; ++i) {
        let name = faker.lorem.sentence();
        let pollType = faker.random.number(1);
        let duplicateOption = faker.random.boolean();
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let EventId = faker.random.number({ min: 1, max: 200 });
        bulkPoll.push({
            name,
            pollType,
            duplicateOption,
            createdAt,
            updatedAt,
            EventId,
        });
    }

    return bulkPoll;
}

function makeHashTagDummy(number = 100) {
    let bulkHashTag = [];
    for (let i = 0; i < number; ++i) {
        let name = faker.hacker.ingverb();
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        bulkHashTag.push({ name, createdAt, updatedAt });
    }
    return bulkHashTag;
}

function makeVoterDummy(number = 100) {
    let bulkVoter = [];
    for (let i = 0; i < number; ++i) {
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let GuestId = faker.random.number({ min: 1, max: 200 });
        bulkVoter.push({ createdAt, updatedAt, GuestId });
    }

    return bulkVoter;
}

function makeEventDummy(number = 200) {
    let bulkEvent = [];
    let filter = {};
    for (let i = 0; i < number; ++i) {
        let alphaNum = faker.random.alphaNumeric(4);
        while (filter[alphaNum]) {
            alphaNum = faker.random.alphaNumeric(4);
        }
        let code = alphaNum;
        filter[code] = 1;
        let moderationOption = faker.random.boolean();
        let replyOption = faker.random.boolean();
        let createdAt = faker.date.past(10);
        let updatedAt = createdAt;
        let endAt = moment(createdAt)
            .add(faker.random.number({ min: 1, max: 24 }), "h")
            .toDate();
        let HostId = faker.random.number({ min: 1, max: 100 });

        bulkEvent.push({
            code,
            moderationOption,
            replyOption,
            createdAt,
            updatedAt,
            endAt,
            HostId,
        });
    }
    return bulkEvent;
}

function makeEmojiReplyDummy(number = 200) {
    let bulkEmojiReply = [];
    for (let i = 0; i < number; ++i) {
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let GuestId = i + 1;
        let ReplyId = faker.random.number({ min: 1, max: 300 });
        let EmojiId = faker.random.number({ min: 1, max: 50 });

        bulkEmojiReply.push({
            createdAt,
            updatedAt,
            GuestId,
            ReplyId,
            EmojiId,
        });
    }
    return bulkEmojiReply;
}

function makeLikeDummy(number = 200) {
    let bulkLike = [];
    for (let i = 0; i < number; ++i) {
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let GuestId = i + 1;
        let QuestionId = faker.random.number({ min: 1, max: 100 });
        bulkLike.push({ createdAt, updatedAt, GuestId, QuestionId });
    }
    return bulkLike;
}

function makeCandadateDummy() {
    const dummy = require("./dummy");
    let bulkCandidate = [];
    dummy.forEach(elem => {
        if (elem.pollType === 0) {
            for (
                let candadateNumber = 1;
                candadateNumber <= 5;
                candadateNumber++
            ) {
                let number = candadateNumber;
                let content = faker.lorem.sentence();
                let createdAt = faker.date.past(1);
                let updatedAt = createdAt;
                let PollId = elem.id;
                bulkCandidate.push({
                    number,
                    content,
                    createdAt,
                    updatedAt,
                    PollId,
                });
            }
        } else {
            for (
                let candadateNumber = 1;
                candadateNumber <= 2;
                candadateNumber++
            ) {
                let number = candadateNumber;
                let content = candadateNumber === 1 ? "O" : "X";
                let createdAt = faker.date.past(1);
                let updatedAt = createdAt;
                let PollId = elem.id;
                bulkCandidate.push({
                    number,
                    content,
                    createdAt,
                    updatedAt,
                    PollId,
                });
            }
        }
    });
    return bulkCandidate;
}

function makeEventHashTagDummy(number = 100) {
    let bulkEventHashtag = [];
    for (let i = 0; i < number; ++i) {
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let HashtagId = i + 1;
        let EventId = faker.random.number({ min: 1, max: 200 });
        bulkEventHashtag.push({ createdAt, updatedAt, HashtagId, EventId });
    }
    return bulkEventHashtag;
}

function makeSelectionDummy(number = 100) {
    let bulkSelection = [];
    for (let i = 0; i < number; ++i) {
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let VoterId = i + 1;
        let CandidateId = faker.random.number({ min: 1, max: 694 });
        bulkSelection.push({ createdAt, updatedAt, VoterId, CandidateId });
    }
    return bulkSelection;
}

function makeEmojiQuestionDummy(number = 100) {
    let bulkEmojiQuestion = [];
    for (let i = 0; i < number; ++i) {
        let createdAt = faker.date.past(1);
        let updatedAt = createdAt;
        let GuestId = faker.random.number({ min: 1, max: 200 });
        let QuestionId = faker.random.number({ min: 1, max: 100 });
        let EmojiId = faker.random.number({ min: 1, max: 50 });
        bulkEmojiQuestion.push({
            createdAt,
            updatedAt,
            GuestId,
            QuestionId,
            EmojiId,
        });
    }

    return bulkEmojiQuestion;
}

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

module.exports = {
    applyAllConstraint,
    loadSequelize,
    makeHostDummy,
    makeEventDummy,
    makeGuestDummy,
    makePollDummy,
    makeHashTagDummy,
    makeQuestionDummy,
    makeEmojiDummy,
    makeVoterDummy,
    makeReplyDummy,
    makeEmojiQuestionDummy,
    makeLikeDummy,
    makeEmojiReplyDummy,
    makeEventHashTagDummy,
    makeSelectionDummy,
    makeCandadateDummy,
};
