
//import { simplePiano } from "../node_modules/simple-piano/index.js";

const { log, logE, turnOffNonErrorLogs } = require("../node_modules/simple-log-kit/index")

log("This is a normal log message")
logE("This is an error log message")

turnOffNonErrorLogs()
log("? ")


/*simplePiano({
	range: '10',
	interactive: false,
	width: 700
});*/

document.getElementById("note_button").onclick = function() { 
	logE("tests")
};

function drawNote() {
	logE('testhvhgvhg')
}

function drawChord() {
	log('testhgbhgv 2')
}

function drawScale() {
	alert('TODO')
}