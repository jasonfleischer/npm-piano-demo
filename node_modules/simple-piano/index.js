///

// util
function $(id){
	return document.getElementById(id);
}

///

var LOG_NON_ERROR_MESSAGES = true;

function log(msg){
	if (LOG_NON_ERROR_MESSAGES)
		console.log(msg);
}
function logE(msg){
	console.log("%c ERROR: " + msg, "background: red; color: white; display: block;");
}


////


class Note {
  constructor(note_name, note_value, octave) {
    this.note_name = note_name;
    this.note_value  = note_value;
    this.octave = octave;
  }

  to_string() {
    return  "NOTE: " + this.note_name.name + " " + this.note_value + " " + this.octave;
  }
}


const NOTE_TYPE = Object.freeze({
	C: "C",
	C_sharp: "C# / Db",
	D: "D",
	D_sharp: "D# / Eb",
	E: "E",
	F: "F",
	F_sharp: "F# / Gb",
  	G: "G",
  	G_sharp: "G# / Ab",
  	A: "A",
  	A_sharp: "A# / Bb",
  	B: "B"
});
class NoteName {
	constructor(type) {


		function get_associated_note_values(row){
			var base_array = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
			var result = [];

			var i;
			for(i=0; i<base_array.length; i++){
				var value = base_array[i]+row;
				if (value > 127 ) break;
				result.push(value);
			}
			return result;
		}

    	this.name = type;
    	switch(type){
    		case NOTE_TYPE.C:
	    		this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = ["audio/notes/C.mp3"];
	    		this.color = "#ff0000";
	    		this.zodiac = "aries";
	    		this.associated_note_values = get_associated_note_values(0);
    			break;
    		case NOTE_TYPE.C_sharp:
    			this.is_sharp_or_flat = true;
	    		this.sharp_name = "C#";
	    		this.flat_name = "Db";
	    		this.file_name = ["audio/notes/C_sharp.mp3", "audio/notes/or.mp3","audio/notes/D_flat.mp3"];
	    		this.color = "#ff8000";
	    		this.zodiac = "taurus";
	    		this.associated_note_values = get_associated_note_values(1);
    			break;
    		case NOTE_TYPE.D:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = ["audio/notes/D.mp3"];
	    		this.color = "#ffff00";
	    		this.zodiac = "gemini";
	    		this.associated_note_values = get_associated_note_values(2);
    			break;
    		case NOTE_TYPE.D_sharp:
    			this.is_sharp_or_flat = true;
	    		this.sharp_name = "D#";
	    		this.flat_name = "Eb";
	    		this.file_name = ["audio/notes/D_sharp.mp3", "audio/notes/or.mp3","audio/notes/E_flat.mp3"];
	    		this.color = "#7fff00";
	    		this.zodiac = "cancer";
	    		this.associated_note_values = get_associated_note_values(3);
    			break;
    		case NOTE_TYPE.E:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = ["audio/notes/E.mp3"];
	    		this.color = "#00ff00";
	    		this.zodiac = "leo";
	    		this.associated_note_values = get_associated_note_values(4);
    			break;
    		case NOTE_TYPE.F:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = ["audio/notes/F.mp3"];
	    		this.color = "#00ff80";
	    		this.zodiac = "virgo";
	    		this.associated_note_values = get_associated_note_values(5);
    			break;
    		case NOTE_TYPE.F_sharp:
    			this.is_sharp_or_flat = true;
	    		this.sharp_name = "F#";
	    		this.flat_name = "Gb";
	    		this.file_name = ["audio/notes/F_sharp.mp3", "audio/notes/or.mp3","audio/notes/G_flat.mp3"];
	    		this.color = "#00ffff";
	    		this.zodiac = "libra";
	    		this.associated_note_values = get_associated_note_values(6);
    			break;
    		case NOTE_TYPE.G:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = ["audio/notes/G.mp3"];
	    		this.color = "#007fff";
	    		this.zodiac = "scorpio";
	    		this.associated_note_values = get_associated_note_values(7);
    			break;
    		case NOTE_TYPE.G_sharp:
    			this.is_sharp_or_flat = true;
	    		this.sharp_name = "G#";
	    		this.flat_name = "Ab";
	    		this.file_name = ["audio/notes/G_sharp.mp3", "audio/notes/or.mp3","audio/notes/A_flat.mp3"];
	    		this.color = "#0000ff";
	    		this.zodiac = "sagittarius";
	    		this.associated_note_values = get_associated_note_values(8);
    			break;
    		case NOTE_TYPE.A:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = ["audio/notes/A.mp3"];
	    		this.color = "#8000ff";
	    		this.zodiac = "capricorn";
	    		this.associated_note_values = get_associated_note_values(9);
    			break;
    		case NOTE_TYPE.A_sharp:
    		this.is_sharp_or_flat = true;
	    		this.sharp_name = "A#";
	    		this.flat_name = "Bb";
	    		this.file_name = ["audio/notes/A_sharp.mp3", "audio/notes/or.mp3","audio/notes/B_flat.mp3"];
	    		this.color = "#ff00ff";
	    		this.zodiac = "aquarius";
	    		this.associated_note_values = get_associated_note_values(10);
    			break;
    		case NOTE_TYPE.B:
    			this.is_sharp_or_flat = false;
	    		this.sharp_name = this.name;
	    		this.flat_name = this.name;
	    		this.file_name = ["audio/notes/B.mp3"];
	    		this.color = "#ff007f";
	    		this.zodiac = "pisces";
	    		this.associated_note_values = get_associated_note_values(11);
    			break;
    	}
  	}
}
const ALL_NOTE_TYPES = [new NoteName(NOTE_TYPE.C), new NoteName(NOTE_TYPE.C_sharp), new NoteName(NOTE_TYPE.D), 
						new NoteName(NOTE_TYPE.D_sharp), new NoteName(NOTE_TYPE.E), new NoteName(NOTE_TYPE.F),
						new NoteName(NOTE_TYPE.F_sharp), new NoteName(NOTE_TYPE.G), new NoteName(NOTE_TYPE.G_sharp),
						new NoteName(NOTE_TYPE.A), new NoteName(NOTE_TYPE.A_sharp), new NoteName(NOTE_TYPE.B)];


var all_notes = [];
function build_all_notes(){
	var note_value = 0; // 0 -127
	
	const octaves = 9;
	var octave = 0;
	for(octave = -1 ; octave <= octaves; octave++){
		var j;
		for(j = 0 ; j < ALL_NOTE_TYPES.length; j++){
			var note_name = ALL_NOTE_TYPES[j].sharp_name;
			var note = new Note(ALL_NOTE_TYPES[j], note_value, octave);

			all_notes.push(note);

			note_value++;

			if(note_value == 128) break;
		}
	}
}

function generate_random_note(min, max) {
	return all_notes[randomIntFromInterval(min, max)];
}


////

var piano_view = {

	WIDTH: 1000,
	HEIGHT: 93,
	BORDER_WIDTH: 1,

	min_note_value: 21,
	max_note_value: 108,

	note_value_to_piano_key_map: {},

	black_keys_canvas: {},
	white_keys_canvas: {},
	canvas_background: {}
}

class PianoKey {
	constructor(x, y, width, height, note, color){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.note = note;
		this.color = color;
	}

	draw(ctx, color = this.color) {
		ctx.beginPath();
		ctx.lineWidth = 0;
		ctx.fillStyle = color;
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fill();
		ctx.stroke();
    	
    	if (this.note.note_name.name == 'C' && this.note.octave == 4) {
			ctx.beginPath();
			ctx.arc(this.x + (this.width)/2, this.height - this.height*0.10, this.width * 0.15, 0, 2 * Math.PI, false);
			ctx.fillStyle = '#666';
			ctx.fill();
    	}
	}
}

piano_view.init = function(){

	piano_view.black_keys_canvas = document.getElementById("piano_black_keys_canvas");
	piano_view.black_keys_canvas.width=piano_view.WIDTH;
	piano_view.black_keys_canvas.height=piano_view.HEIGHT;

	piano_view.white_keys_canvas = document.getElementById("piano_white_keys_canvas");
	piano_view.white_keys_canvas.width=piano_view.WIDTH;
	piano_view.white_keys_canvas.height=piano_view.HEIGHT;

	piano_view.canvas_background = document.getElementById("piano_background_canvas");
	piano_view.canvas_background.width=piano_view.WIDTH;
	piano_view.canvas_background.height=piano_view.HEIGHT;

	this.draw_background();
}

piano_view.resize = function(newWidth) {
	var newWidth = Math.min(newWidth, piano_view.WIDTH);

	var newHeight = newWidth * (piano_view.HEIGHT/piano_view.WIDTH);
	$("piano").style.height = newHeight + "px";
	piano_view.canvas_background.style.height = newHeight + "px";
	piano_view.black_keys_canvas.style.height = newHeight + "px";
	piano_view.white_keys_canvas.style.height = newHeight + "px";

	$("piano").style.width = newWidth + "px";
	piano_view.canvas_background.style.width = newWidth + "px";
	piano_view.black_keys_canvas.style.width = newWidth + "px";
	piano_view.white_keys_canvas.style.width = newWidth + "px";
}

piano_view.draw_background = function(){

	var ctx = piano_view.canvas_background.getContext("2d");

	let number_of_white_keys = 0;
	let number_of_black_keys = 0;

	for(i = piano_view.min_note_value; i <= piano_view.max_note_value; i++){
		var note = all_notes[i];
		if(!note.note_name.is_sharp_or_flat){
			number_of_white_keys++;
		} else {
			number_of_black_keys++;
		}
	}

	let white_key_width = Math.floor((piano_view.WIDTH - ((number_of_white_keys+1)*piano_view.BORDER_WIDTH) )/ number_of_white_keys);
	let white_key_height =  Math.floor(white_key_width * 5);

	var white_keys = [];
	
	var i;
	var x = piano_view.BORDER_WIDTH + (piano_view.WIDTH - ((white_key_width + piano_view.BORDER_WIDTH ) * number_of_white_keys))/2;//.WIDTH - ((number_of_white_keys+1)*piano_view.BORDER_WIDTH) )/2;
	for(i = piano_view.min_note_value; i <= piano_view.max_note_value; i++){
		var note = all_notes[i];
		if(!note.note_name.is_sharp_or_flat){

			let key = new PianoKey(x, piano_view.BORDER_WIDTH, 
				white_key_width, piano_view.BORDER_WIDTH+white_key_height, note, "#fff")
			white_keys.push(key)

			piano_view.note_value_to_piano_key_map[note.note_value] = key
			x = x + white_key_width + piano_view.BORDER_WIDTH;
		}
	}

	var j;
	for(j = 0; j < white_keys.length; j++){	
		var white_key = white_keys[j];
		white_key.draw(ctx);
	}

	var black_keys = [];
	var black_key_width = Math.floor(white_key_width * 0.6);
	var black_key_height = Math.floor(white_key_height * 0.67);
	var k;
	for(k = piano_view.min_note_value; k <= piano_view.max_note_value; k++){
		var note = all_notes[k];
		if(note.note_name.is_sharp_or_flat){

			var flat_key = piano_view.note_value_to_piano_key_map[note.note_value-1];
			var sharp_key = piano_view.note_value_to_piano_key_map[note.note_value+1];
			if( flat_key != undefined && sharp_key != undefined) {

				var x = flat_key.x + piano_view.BORDER_WIDTH + white_key_width - black_key_width/2;
				let key = new PianoKey(x, piano_view.BORDER_WIDTH, black_key_width, black_key_height, note, "#333")
				black_keys.push(key)
				piano_view.note_value_to_piano_key_map[note.note_value] = key
			}
		}
	}

	var l;
	for(l = 0; l < black_keys.length; l++){	
		var black_key = black_keys[l];
		black_key.draw(ctx);
	}
}

piano_view.clearCanvases = function(){

	piano_view.black_keys_canvas.getContext("2d").clearRect(0, 0, piano_view.WIDTH, piano_view.HEIGHT);
	piano_view.white_keys_canvas.getContext("2d").clearRect(0, 0, piano_view.WIDTH, piano_view.HEIGHT);
}


piano_view.drawNote = function(note){

	piano_view.clearCanvases();
	piano_view.drawNoteWithColor(note);
}

piano_view.drawNoteWithColor = function(note, color=note.note_name.color){

	var ctx = note.note_name.is_sharp_or_flat ? piano_view.black_keys_canvas.getContext("2d") : 
												piano_view.white_keys_canvas.getContext("2d");

	let key = piano_view.note_value_to_piano_key_map[note.note_value];
	key.draw(ctx, color);
	if (!note.note_name.is_sharp_or_flat){

		var flat_key = piano_view.note_value_to_piano_key_map[note.note_value-1];
		var sharp_key = piano_view.note_value_to_piano_key_map[note.note_value+1];
		if (flat_key != undefined && flat_key.note.note_name.is_sharp_or_flat) {
			flat_key.draw(ctx);
		}
		if (sharp_key != undefined && sharp_key.note.note_name.is_sharp_or_flat) {
			sharp_key.draw(ctx);
		}
	}
}

piano_view.drawInterval = function(interval){

	var play_type = interval.play_type;
	var first_note = (play_type == INTERVAL_PLAY_TYPE.ASCENDING) ? interval.lower_note : interval.higher_note;

	piano_view.clearCanvases();
	piano_view.drawNoteWithColor(first_note);
	setTimeout(() => {
		var second_note = (play_type == INTERVAL_PLAY_TYPE.ASCENDING) ? interval.higher_note : interval.lower_note;
		piano_view.drawNoteWithColor(second_note);
	}, (interval.play_type == INTERVAL_PLAY_TYPE.HARMONIC) ? 0 : interval.delay_in_ms);	
}

piano_view.drawChord = function(chord){

	piano_view.clearCanvases();

	var j;
	for(j=0; j<chord.note_array.length; j++) {
		var note = chord.note_array[j];
		var label = chord.note_labels[j];
		if (label == 'R'){
			piano_view.drawNoteWithColor(note);
		} else {
			piano_view.drawNoteWithColor(note, "#999");
		}
	}
}


function simplePiano(options) {

	let pianoViews = document.querySelectorAll('.simple-piano')

	if (options.range === undefined){

	}

	if (options.interactive === undefined){

	}

	if (options.width === undefined){
		options.width = 1000
	}


	pianoViews.forEach( pianoView => {

		let height = "230px"

		var canvas = document.createElement('canvas'); 
        canvas.id = "piano_background_canvas";
        canvas.style.position = "absolute"
        canvas.style.left = "0px"
        canvas.style.right = "0px"
        canvas.style.width = options.width + "px";
		canvas.style.height = height;
        pianoView.appendChild(canvas);

        var canvas = document.createElement('canvas'); 
        canvas.id = "piano_white_keys_canvas";
        canvas.style.position = "absolute"
        canvas.style.left = "0px"
        canvas.style.right = "0px"
        canvas.style.width = options.width + "px";
		canvas.style.height = height;
        pianoView.appendChild(canvas);

        var canvas = document.createElement('canvas'); 
        canvas.id = "piano_black_keys_canvas";
        canvas.style.position = "absolute"
        canvas.style.left = "0px"
        canvas.style.right = "0px"
        canvas.style.width = options.width + "px";
		canvas.style.height = height;
        pianoView.appendChild(canvas);


		//pianoView.style.backgroundColor = "grey";
		pianoView.id = "piano"
		pianoView.style.position = "relative"
		pianoView.style.width = options.width + "px";
		pianoView.style.height = height;

		build_all_notes();
		piano_view.init();

		piano_view.resize(options.width)
	}) 
}
module.exports.simplePiano = simplePiano;

