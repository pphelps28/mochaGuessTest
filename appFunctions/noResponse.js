const ask = require("../appFunctions/ask");
function noResponse(response) {
	if (response === "no" || response === "n") {
		return ask("is your number higher or lower?");
	}
}
module.exports = noResponse;

// let noResObj = {
// 	noResponse: function (response) {
// 		if (response === "no" || response === "n") {
// 			return ask("is your number higher or lower?");
// 		}
// 	},
// 	ask: ask,
// };
