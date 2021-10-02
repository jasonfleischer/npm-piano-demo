const Note = require("./lib/note.js");
const Chord = require("./lib/chord.js");
const Scale = require("./lib/scale.js");
const MidiListener = require("./lib/midi_listener.js");

const ALL_NOTE_NAME_TYPES = [new Note.Name(Note.Name.TYPE.C), new Note.Name(Note.Name.TYPE.C_sharp), new Note.Name(Note.Name.TYPE.D), 
						new Note.Name(Note.Name.TYPE.D_sharp), new Note.Name(Note.Name.TYPE.E), new Note.Name(Note.Name.TYPE.F),
						new Note.Name(Note.Name.TYPE.F_sharp), new Note.Name(Note.Name.TYPE.G), new Note.Name(Note.Name.TYPE.G_sharp),
						new Note.Name(Note.Name.TYPE.A), new Note.Name(Note.Name.TYPE.A_sharp), new Note.Name(Note.Name.TYPE.B)];

const piano_range = { min: 21, max: 108 };

var all_notes = [];
function build_all_notes(){
	var midi_value = 0; // 0 -127
	
	const octaves = 9;
	var octave = 0;
	for(octave = -1 ; octave <= octaves; octave++){
		var j;
		for(j = 0 ; j < ALL_NOTE_NAME_TYPES.length; j++){
			var note_name = ALL_NOTE_NAME_TYPES[j].sharp_name;
			var note = new Note(ALL_NOTE_NAME_TYPES[j], midi_value, octave);

			all_notes.push(note);

			midi_value++;

			if(midi_value == 128) break;
		}
	}
}

function generate_random_note(min, max) {
	return all_notes[randomIntFromInterval(min, max)];
}

function init(){
	build_all_notes();
}

module.exports = {init, Note, Chord, Scale, MidiListener, all_notes, piano_range};

