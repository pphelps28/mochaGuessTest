function cheatResponse(answer, cheating) {
	if ((answer === "no" || answer === "n") && cheating) {
		console.log("Cheater!");
		process.exit();
	}
}
module.exports = cheatResponse;
