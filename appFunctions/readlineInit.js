function initReadlineMock() {
	return {
		readline: require("readline"),
		stdin: require("mock-stdin").stdin(),
	};
}
function createInterface(input, output) {
	return {
		rl: readline.createInterface(input, output),
	};
}

let { readline, stdin } = initReadlineMock();
let { rl } = createInterface(stdin, process.stdout);
