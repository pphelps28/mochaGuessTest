const smartguess = require("../appFunctions/smartGuess");
function changeHigher(min, max, guess) {
	max = guess;
	let newGuess = smartguess(min, max);
	return newGuess;
}

module.exports = changeHigher;
