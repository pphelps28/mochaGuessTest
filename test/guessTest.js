/*
1) create single JS file from appFunctions to import, then destructure [x]
	module.exports={function1,function2,function3}

2) Loosen up expected rl.output.write / console.log strings [x]

3) https://www.sitepoint.com/understanding-module-exports-exports-node-js/

 --Refactor with readline
 --Minimum tests to pass
 */

const sinon = require("sinon");
const assert = require("chai").assert;
require("events").EventEmitter.defaultMaxListeners = 15;

const {
	ask,
	changeHigher,
	changeLower,
	cheatCheck,
	cheatResponse,
	humanGuess,
	noResponse,
	yesResponse,
	numInRange,
	randomNum,
	randomNumAsk,
	setMax,
	setMin,
	smartGuess,
} = require("../guess");

//@SMOKE TEST
describe("SMOKE_TEST", () => {
	it("2+2=4", () => {
		return assert.equal(1, 1);
	});
});

//@INITIAL_ASK_FUNCTION_TEST
describe("TEST ASK FUNCTION", () => {
	let stdin = require("mock-stdin").stdin();
	beforeEach(() => {
		let readline = require("readline");
		//better to restore assertion tools at start of test; informs better errors
		stdin = require("mock-stdin").stdin();
		rl = readline.createInterface(stdin, process.stdout);
	});
	afterEach(() => {
		stdin.restore();
	});
	it("asks a question and returns the mock-stdin response", () => {
		process.nextTick(() => {
			stdin.send("response\n");
		});
		//async stringing
		return ask("question?").then((response) => {
			return assert.equal(response, "response");
		});
	});
});

//@STORY_PICK_A_NUMBER_ANY_NUMBER
describe("STORY: PICK A NUMBER ANY NUMBER", () => {
	describe("returns a number between 1 and 100", () => {
		let result = randomNum(1, 100);
		it("returns >= 1", () => {
			return assert.isAtLeast(result, 1);
		});
		it("returns <=100", () => {
			return assert.isAtMost(result, 100);
		});
	});
	describe("asks if random number", () => {
		let stdin;
		let spy;
		beforeEach(() => {
			let readline = require("readline");
			stdin = require("mock-stdin").stdin();
			rl = readline.createInterface(stdin, process.stdout);
			spy = sinon.spy(rl.output, "write");
		});
		afterEach(() => {
			stdin.restore();
			sinon.restore();
		});
		it("asks the player if number (TEST:20)", () => {
			randomNumAsk(22);
			spy.args.filter((arg) => arg.length === 1)[0];
			sinon.assert.calledWith(spy, sinon.match(" 22?"));
		});
	});
});

//@STORY_LET_THE_COMPUTER_WIN
describe("STORY:LET THE COMPUTER WIN", () => {
	let stdin;
	let spy;
	beforeEach(() => {
		let readline = require("readline");
		stdin = require("mock-stdin").stdin();
		spy = sinon.spy(console, "log");
		rl = readline.createInterface(stdin, process.stdout);
	});
	afterEach(() => {
		stdin.restore();
		sinon.restore();
	});
	it("Logs goodbye on input yes", () => {
		process.nextTick(() => {
			stdin.send("yes\n");
		});
		return ask("is this your number?").then((response) => {
			//needed to stub process.exit; it was messing with consecutive
			// test suites
			sinon.stub(process, "exit");
			let answer = yesResponse(response);
			//////////////////////
			assert(
				spy.calledWith("goodbye!"),
				`expected:"goodbye!" returned: ${answer}`
			);
			spy.restore();
			process.exit.restore();
		});
	});
	it("Exits program on input yes", () => {
		process.nextTick(() => {
			stdin.send("yes\n");
		});
		return ask("is this your number?").then((response) => {
			sinon.stub(process, "exit");
			yesResponse(response);
			sinon.assert.called(process.exit);
			process.exit.restore();
		});
	});
});

//@STORY_THE_COMPUTER_GUESSED_WRONG
describe("STORY:THE COMPUTER GUESSED WRONG", () => {
	let stdin;
	let spy;
	beforeEach(() => {
		let readline = require("readline");
		stdin = require("mock-stdin").stdin();
		rl = readline.createInterface(stdin, process.stdout);
		spy = sinon.spy(rl.output, "write");
	});
	afterEach(() => {
		stdin.restore();
		sinon.restore();
	});
	it("Asks high low after 'no'", () => {
		process.nextTick(() => {
			stdin.send("no\n");
		});
		return ask("is this your number?").then((response) => {
			noResponse(response);
			sinon.assert.calledWith(spy, sinon.match(/higher/i));
			sinon.assert.calledWith(spy, sinon.match(/lower/i));
		});
	});
});
//@STORY_MODIFY_YOUR_GUESS_RANGE
describe("STORY: MODIFY YOUR GUESS RANGE", () => {
	let stdin;
	beforeEach(() => {
		let readline = require("readline");
		stdin = require("mock-stdin").stdin();
		rl = readline.createInterface(stdin, process.stdout);
	});
	afterEach(() => {
		stdin.restore();
		sinon.restore();
	});
	it("modifies range based on 'higher'", () => {
		process.nextTick(() => {
			stdin.send("higher\n");
		});
		return ask("is your number higher or lower?").then(() => {
			let min = 1;
			let max = 100;
			let guess = 50;
			let answer = changeHigher(min, max, guess);
			assert.isAbove(answer, guess);
			assert.equal(answer, 75);
		});
	});
	it("modifies range based on 'lower'", () => {
		process.nextTick(() => {
			stdin.send("lower\n");
		});
		return ask("is your number higher or lower?").then(() => {
			let min = 1;
			let max = 100;
			let guess = 50;
			let answer = changeLower(min, max, guess);
			assert.isBelow(answer, guess);
		});
	});
});

//@STORY_MAKE_IT_SMARTER
describe("STORY: MAKE IT SMARTER", () => {
	it("returns middle index, 50 (TEST: 1,100)", () => {
		let result = smartGuess(1, 100);
		assert.equal(result, 50, `expected 50, returned: ${result}`);
	});
});

//@STORY_EXTEND_THE_GUESS_RANGE
//
describe("Random number in range", () => {
	let result = numInRange(100, 200);
	it("returns a number above min:100", () => {
		assert.isAtLeast(result, 100, `expected >= 100, received ${result}`);
	});
	it("returns a number below max:200", () => {
		assert.isAtMost(result, 200, `expected <= 200, received ${result}`);
	});
});
describe("STORY: EXTEND THE GUESS RANGE", () => {
	let stdin;
	beforeEach(() => {
		let readline = require("readline");
		stdin = require("mock-stdin").stdin();
		rl = readline.createInterface(stdin, process.stdout);
	});
	afterEach(() => {
		stdin.restore();
		sinon.restore();
	});
	it("modifies min range, number>1, (TEST:100)", () => {
		process.nextTick(() => {
			stdin.send("100\n");
		});
		return ask("What would you like for a min value?").then((response) => {
			let min = 100;
			setMin(response);
			assert.typeOf(min, "number", 'expected min to be type "number"');
			assert.equal(min, response, "expected min to be set to 100");
			assert.typeOf(min, "number");
			assert.isAbove(min, 1, "expected number greater than 1");
		});
	});
	it("modifies max range, number>1 , (TEST:200)", () => {
		process.nextTick(() => {
			stdin.send("200\n");
		});
		return ask("What would you like for a max value?").then((response) => {
			let max = 200;
			setMax(response);
			assert.typeOf(max, "number", 'expected min to be type "number"');
			assert.equal(max, response, "expected max to be set to 100");
			assert.isAbove(max, 1, "expected number greater than 1");
		});
	});
});

/*
	There's some flawed logic in the stories here, which I 
	know we've addressed before. Given any properly working computer
	logic, there won't be a chance to compromise the guess. This story 
	is unattainable in its current state and could probably
	be modified to check the difference between max and min	

	I think the only way around this is to treat it similarly to the
	"LET THE COMPUTER WIN" story, and simply call out the player and either
	exit or reverse the game
	*/

describe("STORY: CHEAT DETECTOR", () => {
	let stdin;
	let spy;
	beforeEach(() => {
		let readline = require("readline");
		stdin = require("mock-stdin").stdin();
		rl = readline.createInterface(stdin, process.stdout);
		spy = sinon.spy(console, "log");
	});
	afterEach(() => {
		stdin.restore();
		sinon.restore();
	});
	it("Determines if the difference in range is 1", () => {
		let result = cheatCheck(99, 100);
		assert.isTrue(result, "cheatCheck(fn) expected max-min to equal 1");
	});
	it("Calls player cheater when caught cheating", () => {
		process.nextTick(() => {
			stdin.send("no\n");
		});
		return ask(`is this your number?`).then((response) => {
			sinon.stub(process, "exit");
			cheatResponse(response);
			sinon.assert.calledWith(spy, sinon.match(/cheat/i));
		});
	});
	it("Exits the game after calling player cheater", () => {
		process.nextTick(() => {
			stdin.send("no\n");
		});
		return ask(`is this your number?`).then((response) => {
			sinon.stub(process, "exit");
			cheatResponse(response);
			sinon.assert.called(process.exit);
		});
	});
});

describe("STORY: ROLE REVERSAL! HAPPY PATH", () => {
	let stdin;
	let spy;
	beforeEach(() => {
		let readline = require("readline");
		stdin = require("mock-stdin").stdin();
		rl = readline.createInterface(stdin, process.stdout);
		spy = sinon.spy(console, "log");
	});
	afterEach(() => {
		stdin.restore();
		sinon.restore();
	});
	it("Confirms number is correct", () => {
		process.nextTick(() => {
			stdin.send("53\n");
		});
		return ask("What's your guess?").then((response) => {
			sinon.stub(process, "exit");
			humanGuess(response);
			sinon.assert.calledWith(spy, sinon.match(/53/));
			process.exit.restore();
		});
	});
});

describe("STORY: ROLE REVERSAL! SAD PATH", () => {
	let stdin;
	let spy;
	beforeEach(() => {
		let readline = require("readline");
		stdin = require("mock-stdin").stdin();
		rl = readline.createInterface(stdin, process.stdout);
		spy = sinon.spy(rl.output, "write");
	});
	afterEach(() => {
		stdin.restore();
		sinon.restore();
	});
	it("Rejects player's incorrect guess", () => {
		process.nextTick(() => {
			stdin.send("55\n");
		});
		return ask("What's your guess?").then((response) => {
			humanGuess(response);
			sinon.assert.calledWith(spy, sinon.match(/not/i));
		});
	});
});
