const ask = require("../appFunctions/ask");
function noResponse(response) {
	if (response === "no" || response === "n") {
		return ask("is your number higher or lower?");
	}
}
module.exports = noResponse;
