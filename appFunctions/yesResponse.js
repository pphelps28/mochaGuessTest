function yesResponse(answer) {
	if (answer === "yes" || answer === "y") {
		console.log("goodbye!");
		process.exit();
	}
}
module.exports = yesResponse;
