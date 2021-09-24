const musicKit = require("@jasonfleischer/music-model-kit");
const piano_view = require("./lib/piano_view.js");


const piano = {

};

piano.init = function(options) {

	let pianoViews = document.querySelectorAll('.piano')

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

		musicKit.init();
		//build_all_notes();
		piano_view.init();

		piano_view.resize(options.width)
	}) 
}

piano.drawNote = function(midiValue) {
	piano_view.drawNote(musicKit.all_notes[midiValue]);
}

piano.drawChord = function(midiValue) {
	piano_view.drawChord(new musicKit.Chord.Chord(musicKit.all_notes[midiValue], musicKit.all_notes));
}

piano.clear = function(midiValue) {
	piano_view.clearCanvases();
}

module.exports = piano;

