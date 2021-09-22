
const piano = require("@jasonfleischer/piano")

piano({
	range: '10',
	interactive: false,
	width: 700
});

document.getElementById("note_button").onclick = function() { 
	logE("tests")
};

document.getElementById("chord_button").onclick = function() {
	logE('testhvhgvhg')
}

document.getElementById("scale_button").onclick = function() {
	log('testhgbhgv 2')
}

document.getElementById("clear_button").onclick = function() {
	alert('TODO')
}