function ask(questionText) {
	return new Promise((resolve, reject) => {
		process.stdin.once("data", function (data) {
			resolve(data.toString().trim());
		});
	});
}
module.exports = ask;
