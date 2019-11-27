import { Sequelize } from "sequelize";
import faker from "faker";
import moment from "moment";

faker.seed(1234);

function makeQuestionDummy(number = 100) {
    const bulkQuestion = [];

    for (let i = 0; i < number; ++i) {
        const content = faker.lorem.sentence();
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const state = "active";
        const EventId = faker.random.number({ min: 1, max: 200 });
        const GuestId = faker.random.number({ min: 1, max: 200 });
        const QuestionId = null;
        const isStared = false;

        bulkQuestion.push({
            content,
            createdAt,
            state,
            updatedAt,
            EventId,
            GuestId,
            QuestionId,
            isStared,
        });
    }
    return bulkQuestion;
}
function makeEmojiDummy(number = 50) {
    const bulkEmoji = [];

    for (let i = 0; i < number; ++i) {
        const name = faker.name.lastName();
        const url = faker.image.avatar();
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;

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
    const bulkHost = [];

    for (let i = 0; i < number; ++i) {
        const oauthId = faker.internet.userName();
        const email = faker.internet.email();
        const name = faker.name.firstName();
        const emailFeedBack = faker.random.boolean();
        const createdAt = faker.date.past(10);
        const updatedAt = createdAt;

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
    const bulkGuest = [];

    for (let i = 0; i < number; ++i) {
        const name = faker.name.firstName();
        const guestSid = faker.random.uuid();
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const EventId = faker.random.number({ min: 1, max: 200 });
        const isAnonymous = false;

        bulkGuest.push({
            name,
            createdAt,
            updatedAt,
            EventId,
            guestSid,
            isAnonymous,
        });
    }
    return bulkGuest;
}

function makeReplyDummy(number = 200) {
    const bulkQuestion = [];

    for (let i = 0; i < number; ++i) {
        const content = faker.lorem.sentence();
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const state = "active";
        const EventId = faker.random.number({ min: 1, max: 200 });
        const GuestId = faker.random.number({ min: 1, max: 200 });
        const QuestionId = faker.random.number({ min: 1, max: 100 });

        bulkQuestion.push({
            content,
            createdAt,
            state,
            updatedAt,
            EventId,
            GuestId,
            QuestionId,
        });
    }
    return bulkQuestion;
}

function makePollDummy(number = 200) {
    const bulkPoll = [];

    for (let i = 0; i < number; ++i) {
        const name = faker.lorem.sentence();
        const pollType = faker.random.number(1);
        const duplicateOption = faker.random.boolean();
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const EventId = faker.random.number({ min: 1, max: 200 });

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
    const bulkHashTag = [];

    for (let i = 0; i < number; ++i) {
        const name = faker.hacker.ingverb();
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;

        bulkHashTag.push({ name, createdAt, updatedAt });
    }
    return bulkHashTag;
}

function makeVoterDummy(number = 100) {
    const bulkVoter = [];

    for (let i = 0; i < number; ++i) {
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const GuestId = faker.random.number({ min: 1, max: 200 });

        bulkVoter.push({ createdAt, updatedAt, GuestId });
    }

    return bulkVoter;
}

function makeEventDummy(number = 200) {
    const bulkEvent = [];
    const filter = {};

    for (let i = 0; i < number; ++i) {
        let alphaNum = faker.random.alphaNumeric(4);

        while (filter[alphaNum]) {
            alphaNum = faker.random.alphaNumeric(4);
        }
        const code = alphaNum;

        filter[code] = 1;
        const moderationOption = faker.random.boolean();
        const replyOption = faker.random.boolean();
        const createdAt = faker.date.past(10);
        const updatedAt = createdAt;
        const endAt = moment(createdAt)
            .add(faker.random.number({ min: 1, max: 24 }), "h")
            .toDate();
        const HostId = faker.random.number({ min: 1, max: 100 });

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
    const bulkEmojiReply = [];

    for (let i = 0; i < number; ++i) {
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const GuestId = i + 1;
        const ReplyId = faker.random.number({ min: 1, max: 300 });
        const EmojiId = faker.random.number({ min: 1, max: 50 });

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

function makeLikeDummy(number = 100) {
    const bulkLike = [];

    for (let i = 0; i < number; ++i) {
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const feeling = faker.random.number({ min: 0, max: 1 });
        const GuestId = faker.random.number({ min: 1, max: 200 });
        const QuestionId = faker.random.number({ min: 1, max: 100 });
        bulkLike.push({ createdAt, updatedAt, feeling, GuestId, QuestionId });
    }
    return bulkLike;
}

function makeCandadateDummy() {
    const dummy = require("./dummy");
    const bulkCandidate = [];

    dummy.forEach(elem => {
        if (elem.pollType === 0) {
            for (
                let candadateNumber = 1;
                candadateNumber <= 5;
                candadateNumber++
            ) {
                const number = candadateNumber;
                const content = faker.lorem.sentence();
                const createdAt = faker.date.past(1);
                const updatedAt = createdAt;
                const PollId = elem.id;

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
                const number = candadateNumber;
                const content = candadateNumber === 1 ? "O" : "X";
                const createdAt = faker.date.past(1);
                const updatedAt = createdAt;
                const PollId = elem.id;

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
    const bulkEventHashtag = [];

    for (let i = 0; i < number; ++i) {
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const HashtagId = i + 1;
        const EventId = faker.random.number({ min: 1, max: 200 });

        bulkEventHashtag.push({ createdAt, updatedAt, HashtagId, EventId });
    }
    return bulkEventHashtag;
}

function makeSelectionDummy(number = 100) {
    const bulkSelection = [];

    for (let i = 0; i < number; ++i) {
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const VoterId = i + 1;
        const CandidateId = faker.random.number({ min: 1, max: 694 });

        bulkSelection.push({ createdAt, updatedAt, VoterId, CandidateId });
    }
    return bulkSelection;
}

function makeEmojiQuestionDummy(number = 100) {
    const bulkEmojiQuestion = [];

    for (let i = 0; i < number; ++i) {
        const createdAt = faker.date.past(1);
        const updatedAt = createdAt;
        const GuestId = faker.random.number({ min: 1, max: 200 });
        const QuestionId = faker.random.number({ min: 1, max: 100 });
        const EmojiId = faker.random.number({ min: 1, max: 50 });

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
	constraints.forEach(({attributes, options}) => {
		queryInterface.addConstraint(tableName, attributes, options);
	});
}

async function loadSequelize(config) {
	const sequelize = new Sequelize(
		config.scheme,
		config.user,
		config.password,
		config,
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
