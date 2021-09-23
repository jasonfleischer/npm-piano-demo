
const piano = require("@jasonfleischer/piano")
const log = require("@jasonfleischer/log")
const musicKit = require("@jasonfleischer/music-model-kit");

piano.init({
	range: '10',
	interactive: false,
	width: 700
});

document.getElementById("note_button").onclick = function() { 
	midiValue = 45 // A2
	piano.drawNote(midiValue);
};

document.getElementById("chord_button").onclick = function() {
	midiValue = 60 // C4
	piano.drawChord(midiValue)
}

document.getElementById("scale_button").onclick = function() {
	log.i('todo')
}

document.getElementById("clear_button").onclick = function() {
	piano.clear();
}