const readline = require("readline");
rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		rl.question(questionText, resolve);
	});
}

function smartGuess(min, max) {
	return Math.floor((min + max) / 2);
}

function changeHigher(min, max, guess) {
	min = guess;
	let newGuess = smartGuess(min, max);
	return newGuess;
}

function changeLower(min, max, guess) {
	max = guess;
	let newGuess = smartGuess(min, max);
	return newGuess;
}

function cheatCheck(min, max) {
	return max - min === 1 ? true : false;
}

function cheatResponse(answer, cheating) {
	if (answer === "no" || answer === "n") {
		console.log("Cheater!");
		process.exit();
	}
}

function humanGuess(answer, secretNumber = 53) {
	if (+answer === secretNumber) {
		console.log(`You did it! My number was ${secretNumber}`);
		process.exit();
	} else {
		return ask("That's not my number, try again try again!");
	}
}

function yesResponse(answer) {
	if (answer === "yes" || answer === "y") {
		console.log("goodbye!");
		process.exit();
	}
}

function noResponse(response) {
	if (response === "no" || response === "n") {
		return ask("is your number higher or lower?");
	}
}

function numInRange(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randomNum() {
	return Math.floor(Math.random() * 100 + 1);
}

function randomNumAsk(num) {
	return ask(`is your number ${num}?`);
}

function setMax(numString) {
	numString = +numString;
	return numString;
}

function setMin(numString) {
	numString = +numString;
	return numString;
}

module.exports = {
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
};
