const ask = require("./ask");

function humanGuess(answer, secretNumber = 53) {
	if (+answer === secretNumber) {
		console.log(`You did it! My number was ${secretNumber}`);
		process.exit();
	} else {
		return ask("nope! try again!");
	}
}
module.exports = humanGuess;
