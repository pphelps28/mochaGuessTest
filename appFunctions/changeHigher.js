const smartguess = require("../appFunctions/smartGuess");
function changeHigher(min, max, guess) {
	min = guess;
	let newGuess = smartguess(min, max);
	return newGuess;
}

module.exports = changeHigher;
