const sinon = require("sinon");
const assert = require("chai").assert;
const expect = require("chai").expect;

const ask = require("../appFunctions/ask");
const randomNum = require("../appFunctions/randomNum");
const yesResponse = require("../appFunctions/yesResponse");
const noResponse = require("../appFunctions/noResponse");
const numInRange = require("../appFunctions/numInRange");

//@INITIAL_ASK_FUNCTION_TEST
describe("asyncAskTest", function () {
	describe("ask", function () {
		let stdin;
		beforeEach(function () {
			stdin = require("mock-stdin").stdin();
		});
		it("asks a question and returns the stdin response", function () {
			process.nextTick(function mockResponse() {
				stdin.send("response");
			});
			//async stringing
			return ask("question:test").then(function (response) {
				assert.equal(response, "response");
			});
		});
	});
});

//@STORY_PICK_A_NUMBER_ANY_NUMBER
describe("Returns number between 1 and 100", function () {
	let result = randomNum();
	it("returns >= 1", function () {
		expect(result).to.be.at.least(1);
	}),
		it("returns <=100", function () {
			expect(result).to.be.at.most(100);
		});
});
//@UNIT_TEST-NUM-IN-RANGE
describe("Returns number within given range", function () {
	let result = numInRange(100, 200);
	it("returns a number above min", function () {
		assert.isAtLeast(result, 100, "value is above range minimum");
	});
	it("returns a number below max", function () {
		assert.isAtMost(result, 200, "value is below given maximum");
	});
});

//@STORY_LET_THE_COMPUTER_WIN
describe("Input 'yes':", function () {
	let stdin;
	beforeEach(function () {
		stdin = require("mock-stdin").stdin();
	});
	it("closes after 'yes'", function () {
		process.nextTick(function respondYes() {
			stdin.send("yes");
		});
		//used fake to emulate the proper callback detection
		return ask("is this your number?").then(function (response) {
			sinon.stub(process, "exit");
			yesResponse(response);
			sinon.assert.called(process.exit);
			process.exit.restore();
		});
	});
});

//@STORY_THE_COMPUTER_GUESSED_WRONG
describe("Input 'no':", function () {
	let stdin;
	beforeEach(function () {
		stdin = require("mock-stdin").stdin();
	});
	it("Asks high low after 'no'", function () {
		process.nextTick(function respondYes() {
			stdin.send("no");
		});
		//used fake to emulate the proper callback detection
		//(detects promise from ask function)
		return ask("is this your number?").then(function (response) {
			let result = noResponse(response);
			expect(result).to.be.a("promise");
		});
	});
});

//@STORY_MODIFY_YOUR_GUESS_RANGE_HIGHER
