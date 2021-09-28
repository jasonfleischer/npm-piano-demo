
const pianoKit = require("@jasonfleischer/piano")
//const log = require("@jasonfleischer/log")
const musicKit = require("@jasonfleischer/music-model-kit");
musicKit.init();

{
	let pianoView = new pianoKit.PianoBuilder({
		id: 'display_piano'
		,width: 700
	});

	document.getElementById("note_button").onclick = function() { 
		let midiValue = 45; // A2
		let note = musicKit.all_notes[midiValue];
		pianoView.clear();
		pianoView.drawNote(note);
	};
	document.getElementById("chord_button").onclick = function() {
		let midiValue = 60 // C4
		let note = musicKit.all_notes[midiValue];
		let chord = new musicKit.Chord(note, musicKit.Chord.TYPE.minor);
		pianoView.drawChord(chord);
	}
	document.getElementById("scale_button").onclick = function() {
		let midiValue = 60 // C
		let note = musicKit.all_notes[midiValue];
		let scale = new musicKit.Scale(note, musicKit.Scale.TYPE.Aeolian);
		pianoView.drawScale(scale);
	}
	document.getElementById("clear_button").onclick = function() {
		pianoView.clear();
	}
}

{
	let interactivePianoView = new pianoKit.PianoBuilder({
		id: 'interactive_piano',
		range: {
			min: 60, // midi value = C3
			max: 72  // midi value = C4
		},
		interactive: true,
		width: 325
	});
}


// interactivePianoView.listen
