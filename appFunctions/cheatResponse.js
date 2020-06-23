function cheatResponse(answer, cheating) {
	if (answer === "no" || answer === "n") {
		console.log("Cheater!");
		process.exit();
	}
}
module.exports = cheatResponse;
