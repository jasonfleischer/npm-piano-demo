
const pianoKit = require("@jasonfleischer/piano")
//const log = require("@jasonfleischer/log")
const musicKit = require("@jasonfleischer/music-model-kit");
musicKit.init();

let pianoView = pianoKit.buildView({
	id: 'display_piano',
	width: 700
});

document.getElementById("note_button").onclick = function() { 
	let midiValue = 45; // A2
	let note = musicKit.all_notes[midiValue];
	pianoView.drawNote(note);
};
document.getElementById("chord_button").onclick = function() {
	let midiValue = 60 // C4
	let note = musicKit.all_notes[midiValue];
	let chord = musicKit.all_notes[midiValue];
	pianoView.drawChord(new musicKit.Chord(note, musicKit.Chord.TYPE.minor))
}
document.getElementById("scale_button").onclick = function() {
	alert('todo')
}
document.getElementById("clear_button").onclick = function() {
	pianoView.clear();
}

let interactivePianoView = pianoKit.buildView({
	id: 'interactive_piano',
	range: {
		min: 48, // midi value = C3
		max: 60  // midi value = C4
	},
	interactive: true,
	width: 300
});


// interactivePianoView.listen
