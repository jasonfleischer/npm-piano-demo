const Note = require("./lib/note.js");
const Chord = require("./lib/chord.js");
const Scale = require("./lib/chord.js");


var all_notes = [];
function build_all_notes(){
	var note_value = 0; // 0 -127
	
	const octaves = 9;
	var octave = 0;
	for(octave = -1 ; octave <= octaves; octave++){
		var j;
		for(j = 0 ; j < Note.ALL_NOTE_TYPES.length; j++){
			var note_name = Note.ALL_NOTE_TYPES[j].sharp_name;
			var note = new Note.Note(Note.ALL_NOTE_TYPES[j], note_value, octave);

			all_notes.push(note);

			note_value++;

			if(note_value == 128) break;
		}
	}
}

function generate_random_note(min, max) {
	return all_notes[randomIntFromInterval(min, max)];
}

function init(){
	build_all_notes();
}


module.exports = {init, Note, Chord, Scale, all_notes};

