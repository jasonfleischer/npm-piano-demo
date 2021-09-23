
const piano = require("@jasonfleischer/piano")
const log = require("@jasonfleischer/log")

piano.init({
	range: '10',
	interactive: false,
	width: 700
});

document.getElementById("note_button").onclick = function() { 
	log.e("tests")
	midiValue = 60
	piano.drawNote(midiValue);
};

document.getElementById("chord_button").onclick = function() {
	log.e('testhvhgvhg')
}

document.getElementById("scale_button").onclick = function() {
	log.i('testhgbhgv 2')
}

document.getElementById("clear_button").onclick = function() {
	alert('TODO')
}