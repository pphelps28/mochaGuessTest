//function ask(questionText) {
//	return new Promise((resolve, reject) => {
//		process.stdin.once("data", function (data) {
//			resolve(data.toString().trim());
//		});
//	});
//}

const readline = require("readline");
rl = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
	return new Promise((resolve, reject) => {
		rl.question(questionText, resolve);
	});
}

module.exports = ask;
