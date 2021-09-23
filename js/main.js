
const piano = require("@jasonfleischer/piano")
const log = require("@jasonfleischer/log")
const musicKit = require("@jasonfleischer/music-model-kit");

piano.init({
	range: '10',
	interactive: false,
	width: 700
});

document.getElementById("note_button").onclick = function() { 
	midiValue = 75
	piano.drawNote(midiValue);
};

document.getElementById("chord_button").onclick = function() {
	log.e('test ' + musicKit.chord.CHORD_TYPE)
}

document.getElementById("scale_button").onclick = function() {
	log.i('testhgbhgv 2')
}

document.getElementById("clear_button").onclick = function() {
	piano.clear();
}