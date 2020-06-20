const ask = require("./ask");

function cheatCheck(min, max) {
	return max - min === 1 ? true : false;
}
module.exports = cheatCheck;
