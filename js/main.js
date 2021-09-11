import {log, logE} from "../node_modules/simple-log-kit/index.js";
import { simplePiano } from "../node_modules/simple-piano/index.js";

simplePiano({
	range: '10',
	interactive: false,
	width: 700
});

log("test")


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