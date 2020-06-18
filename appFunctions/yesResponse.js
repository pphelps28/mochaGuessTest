function yesResponse(answer) {
	if (answer === "yes" || answer === "y") {
		process.exit();
	}
}
module.exports = yesResponse;
