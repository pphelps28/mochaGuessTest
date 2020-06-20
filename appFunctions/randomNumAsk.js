const ask = require("./ask");

function randomNumAsk(num) {
	return ask(`is your number ${num}?`);
}

module.exports = randomNumAsk;
