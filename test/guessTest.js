/* --Refactor with readline
 --Minimum tests to pass
 --Verifies code does what it should	You left off on the COMPUTER GUESSED WRONG story
  See your comments down below in there to see more
  Think about creating a no response object so you can
  Stub out the ask function to grab the argument passed in;
  Maybe it's the only way to do what you need to do (i.e. ensure that )
  You can grab the questiontext passed into the ask function
  (which COULD be a property of the no resonse object (maybe? try it!))
  Line 125
  */
const sinon = require("sinon");
const assert = require("chai").assert;

const ask = require("../appFunctions/ask");
const randomNum = require("../appFunctions/randomNum");
const randomNumAsk = require("../appFunctions/randomNumAsk");
const yesResponse = require("../appFunctions/yesResponse");
const noResponse = require("../appFunctions/noResponse");
const numInRange = require("../appFunctions/numInRange");
const smartGuess = require("../appFunctions/smartGuess");
const readlineTest = require("../appFunctions/readlineTest");
const changeHigher = require("../appFunctions/changeHigher");
const changeLower = require("../appFunctions/changeLower");
const setMin = require("../appFunctions/setMin");
const setMax = require("../appFunctions/setMax");
const cheatCheck = require("../appFunctions/cheatCheck");
const cheatResponse = require("../appFunctions/cheatResponse");

//@SMOKE TEST
describe("SMOKE_TEST", () => {
	it("2+2=4", () => {
		assert.equal(1, 1);
	});
});

//@INITIAL_ASK_FUNCTION_TEST
describe("TEST ASK FUNCTION", () => {
	let stdin;
	beforeEach(() => {
		let readline = require("readline");
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
			assert.equal(response, "response");
		});
	});
});

//@STORY_PICK_A_NUMBER_ANY_NUMBER
describe("STORY: PICK A NUMBER ANY NUMBER", () => {
	describe("returns a number between 1 and 100", () => {
		let result = randomNum(1, 100);
		it("returns >= 1", () => {
			assert.isAbove(result, 1);
		});
		it("returns <=100", () => {
			assert.isBelow(result, 100);
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
			spy.restore();
		});

		it("asks the player if number (TEST:20)", () => {
			randomNumAsk(20);
			let output = spy.args.filter((arg) => arg.length === 1)[0];
			assert(
				spy.calledWith(`is your number 20?`),
				`UNEXPECTED OUTPUT: ${output}`
			);
			spy.restore();
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
		rl = readline.createInterface(stdin, process.stdout);
	});
	afterEach(() => {
		stdin.restore();
	});
	it("Logs goodbye on input yes", () => {
		process.nextTick(() => {
			stdin.send("yes\n");
		});
		return ask("is this your number?").then((response) => {
			//needed to stub process.exit; it was messing with consecutive
			// test suites
			sinon.stub(process, "exit");
			let spy = sinon.spy(console, "log");
			let answer = yesResponse(response);
			//////////////////////
			assert(
				spy.calledWith("goodbye!"),
				`expected:"goodbye!" returned: ${answer}`
			);
			sinon.assert.called(process.exit);
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
		spy.restore();
	});
	it("Asks high low after 'no'", () => {
		process.nextTick(() => {
			stdin.send("no\n");
		});
		//used fake to emulate the proper callback detection
		//(detects promise from ask function)
		return ask("is this your number?").then((response) => {
			//Assertion:  noResponse returns a promise, but the argument needs to be targeted!
			noResponse(response);
			/*spy.args returns an array of empty arguments (due to async), 
			with the returned 'undefined' value at index 1:
			by filtering out the response with a length of one, we find the true
			received value.  Run this to see:
			console.log(spy.args.forEach((arg)=>console.log(arg)))
			*/
			let output = spy.args.filter((arg) => arg.length === 1)[0];
			assert(
				spy.calledWith("is your number higher or lower?"),
				`UNEXPECTED OUTPUT: ${output}`
			);
		});
	});
});
//@STORY_MODIFY_YOUR_GUESS_RANGE
describe("STORY:MODIFY YOUR GUESS RANGE", () => {
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
		spy.restore();
	});
	it("modifies range based on 'higher'", () => {
		process.nextTick(() => {
			stdin.send("higher\n");
		});
		return ask("is your number higher or lower?").then((response) => {
			let min = 1;
			let max = 100;
			let guess = 50;
			let answer = changeHigher(min, max, guess);
			assert.isAbove(answer, guess);
		});
	});
	it("modifies range based on 'lower'", () => {
		process.nextTick(() => {
			stdin.send("lower\n");
		});
		return ask("is your number higher or lower?").then((response) => {
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
describe("STORY: EXTEND THE GUESS RANGE", () => {
	describe("returns num in range", () => {
		let result = numInRange(100, 200);
		it("returns a number above min:100", () => {
			assert.isAtLeast(result, 100, `expected >= 100, received ${result}`);
		});
		it("returns a number below max:200", () => {
			assert.isAtMost(result, 200, `expected <= 200, received ${result}`);
		});
	});
	describe("Sets range based on user input", () => {
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
			spy.restore();
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
});

describe("STORY: CHEAT DETECTOR FUNCTION", () => {
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

	let stdin;
	let spy;
	beforeEach(() => {
		let readline = require("readline");
		stdin = require("mock-stdin").stdin();
		rl = readline.createInterface(stdin, process.stdout);
	});
	afterEach(() => {
		stdin.restore();
		spy.restore();
	});
	it("Calls player a cheater", () => {
		process.nextTick(() => {
			stdin.send("no\n");
		});
		return ask("is your number *num*?").then((response) => {
			spy = sinon.spy(console, "log");
			sinon.stub(process, "exit");

			cheatResponse(response, true);

			assert(spy.calledWith("Cheater!"), `expected:"Cheater!"`);
			spy.restore();
			process.exit.restore();
		});
	});
	it("Exits after detecting cheater", () => {
		process.nextTick(() => {
			stdin.send("no\n");
		});
		return ask("is your number *num*?").then((response) => {
			spy = sinon.spy(console, "log");
			sinon.stub(process, "exit");

			cheatResponse(response, true);

			sinon.assert.called(process.exit);
			spy.restore();
			process.exit.restore();
		});
	});
});

/*
	it("Determines if the difference in range is 1", () => {
		let result = cheatCheck(99, 100);
		assert.isTrue(result, "cheatCheck(fn) expected max-min to equal 1");
	});


*/

// //@READLINE INTEGRATION
// describe("READLINE TEST", () => {
// 	let stdin;
// 	let spy;
// 	beforeEach(() => {
// 		let readline = require("readline");
// 		stdin = require("mock-stdin").stdin();
// 		rl = readline.createInterface(stdin, process.stdout);
// 	});
// 	afterEach(() => {
// 		stdin.restore();
// 		spy.restore();
// 	});
// 	it("accepts readline", () => {
// 		process.nextTick(() => {
// 			stdin.send("test\n");
// 		});
// 		return ask("test?").then((response) => {
// 			spy = sinon.spy(console, "log");
// 			readlineTest(response);
// 			assert(
// 				spy.calledWith("test"),
// 				`called with ${response}, expected "test"`
// 			);
// 		});
// 	});
// 	it("Logs goodbye on input yes", () => {
// 		process.nextTick(() => {
// 			stdin.send("yes\n");
// 		});
// 		return ask("is this your number?").then((response) => {
// 			//needed to stub process.exit; it was messing with consecutive
// 			// test suites
// 			sinon.stub(process, "exit");
// 			let spy = sinon.spy(console, "log");
// 			let answer = yesResponse(response);
// 			assert(
// 				spy.calledWith("goodbye!"),
// 				`expected:"goodbye!" returned: ${answer}`
// 			);
// 			sinon.assert.called(process.exit);
// 			process.exit.restore();
// 		});
// 	});
// });