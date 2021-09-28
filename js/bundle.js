(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){const pianoKit=require("@jasonfleischer/piano");const musicKit=require("@jasonfleischer/music-model-kit");musicKit.init();let pianoView=new pianoKit.PianoBuilder({id:"display_piano",width:700});document.getElementById("note_button").onclick=function(){let midiValue=45;let note=musicKit.all_notes[midiValue];pianoView.clear();pianoView.drawNote(note)};document.getElementById("chord_button").onclick=function(){let midiValue=60;let note=musicKit.all_notes[midiValue];let chord=new musicKit.Chord(note,musicKit.Chord.TYPE.minor);pianoView.drawChord(chord)};document.getElementById("scale_button").onclick=function(){let midiValue=62;let note=musicKit.all_notes[midiValue];let scale=new musicKit.Scale(note,musicKit.Scale.TYPE.Aeolian);pianoView.drawScale(scale)};document.getElementById("clear_button").onclick=function(){pianoView.clear()};let interactivePianoView=new pianoKit.PianoBuilder({id:"interactive_piano",range:{min:60,max:72},interactive:true,width:325})},{"@jasonfleischer/music-model-kit":3,"@jasonfleischer/piano":7}],2:[function(require,module,exports){var LOG_NON_ERROR_MESSAGES=true;const log={};log.i=function(msg){if(LOG_NON_ERROR_MESSAGES)console.log(msg)};log.e=function(msg){console.log("%c ERROR: "+msg,"background: red; color: white; display: block;")};log.turnOffNonErrorLogs=function(){LOG_NON_ERROR_MESSAGES=false};module.exports=log},{}],3:[function(require,module,exports){const Note=require("./lib/note.js");const Chord=require("./lib/chord.js");const Scale=require("./lib/scale.js");const ALL_NOTE_NAME_TYPES=[new Note.Name(Note.Name.TYPE.C),new Note.Name(Note.Name.TYPE.C_sharp),new Note.Name(Note.Name.TYPE.D),new Note.Name(Note.Name.TYPE.D_sharp),new Note.Name(Note.Name.TYPE.E),new Note.Name(Note.Name.TYPE.F),new Note.Name(Note.Name.TYPE.F_sharp),new Note.Name(Note.Name.TYPE.G),new Note.Name(Note.Name.TYPE.G_sharp),new Note.Name(Note.Name.TYPE.A),new Note.Name(Note.Name.TYPE.A_sharp),new Note.Name(Note.Name.TYPE.B)];const piano_range={min:21,max:108};var all_notes=[];function build_all_notes(){var midi_value=0;const octaves=9;var octave=0;for(octave=-1;octave<=octaves;octave++){var j;for(j=0;j<ALL_NOTE_NAME_TYPES.length;j++){var note_name=ALL_NOTE_NAME_TYPES[j].sharp_name;var note=new Note(ALL_NOTE_NAME_TYPES[j],midi_value,octave);all_notes.push(note);midi_value++;if(midi_value==128)break}}}function generate_random_note(min,max){return all_notes[randomIntFromInterval(min,max)]}function init(){build_all_notes()}module.exports={init:init,Note:Note,Chord:Chord,Scale:Scale,all_notes:all_notes,piano_range:piano_range}},{"./lib/chord.js":4,"./lib/note.js":5,"./lib/scale.js":6}],4:[function(require,module,exports){const log=require("@jasonfleischer/log");class Chord{static TYPE=Object.freeze({Major:"Major",minor:"minor",Aug:"augmented",Dim:"diminished",Major7:"Major 7",minor7:"minor 7",Dom7:"Dominant 7"});static INVERSION_TYPE=Object.freeze({Root:"Root",First:"first inversion",Second:"second inversion",Third:"third inversion"});static PLAY_TYPE=Object.freeze({HARMONIC:"Harmonic",ARPEGGIATE:"Arpeggiate"});constructor(root_note,chord_type=Chord.TYPE.Major,play_type=Chord.PLAY_TYPE.HARMONIC,inversion=Chord.INVERSION_TYPE.Root){this.root_note=root_note;this.delay_in_ms=500;this.name=root_note.note_name.name+" "+chord_type;this.inversion=inversion;this.type=chord_type;this.play_type=play_type;switch(chord_type){case Chord.TYPE.Major:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,4,7];this.note_labels=["R","M3","5"];this.structure="Root, Major 3rd, Fifth"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-8,-5,0];this.note_labels=["M3","5","R"];this.structure="Major 3rd, Fifth, Root"}else{this.note_sequence=[-5,0,4];this.note_labels=["5","R","M3"];this.structure="Fifth, Root, Major 3rd"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/major.mp3"]);break;case Chord.TYPE.minor:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,3,7];this.note_labels=["R","m3","5"];this.structure="Root, minor 3rd, Fifth"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-9,-5,0];this.note_labels=["m3","5","R"];this.structure="minor 3rd, Fifth, Root"}else{this.note_sequence=[-5,0,3];this.note_labels=["5","R","m3"];this.structure="Fifth, Root, minor 3rd"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/minor.mp3"]);break;case Chord.TYPE.Aug:this.inversion=Chord.INVERSION_TYPE.Root;this.note_sequence=[0,4,8];this.note_labels=["R","M3","#5"];this.structure="Root, Major 3rd, Sharp Fifth";this.file_name=root_note.note_name.file_name.concat(["audio/chords/augmented.mp3"]);break;case Chord.TYPE.Dim:this.inversion=Chord.INVERSION_TYPE.Root;this.note_sequence=[0,3,6];this.note_labels=["R","m3","b5"];this.structure="Root, minor 3rd, Flat Fifth";this.file_name=root_note.note_name.file_name.concat(["audio/chords/diminished.mp3"]);break;case Chord.TYPE.Major7:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,4,7,11];this.note_labels=["R","M3","5","M7"];this.structure="Root, Major 3rd, Fifth, Major 7th"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-8,-5,-1,0];this.note_labels=["M3","5","M7","R"];this.structure="Major 3rd, Fifth, Major 7th, Root"}else if(this.inversion==Chord.INVERSION_TYPE.Second){this.note_sequence=[-5,-1,0,4];this.note_labels=["5","M7","R","M3"];this.structure="Fifth, Major 7th, Root, Major 3rd"}else{this.note_sequence=[-1,0,4,7];this.note_labels=["M7","R","M3","5"];this.structure="Major 7th, Root, Major 3rd, Fifth"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/major_seventh.mp3"]);break;case Chord.TYPE.minor7:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,3,7,10];this.note_labels=["R","m3","5","m7"];this.structure="Root, minor 3rd, Fifth, minor 7th"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-9,-5,-2,0];this.note_labels=["m3","5","m7","R"];this.structure="minor 3rd, Fifth, minor 7th, Root"}else if(this.inversion==Chord.INVERSION_TYPE.Second){this.note_sequence=[-5,-2,0,3];this.note_labels=["5","m7","R","m3"];this.structure="Fifth, minor 7th, Root, minor 3rd"}else{this.note_sequence=[-2,0,3,7];this.note_labels=["m7","R","m3","5"];this.structure="minor 7th, Root, minor 3rd, Fifth"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/minor_seventh.mp3"]);break;case Chord.TYPE.Dom7:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,4,7,10];this.note_labels=["R","M3","5","7"];this.structure="Root, Major 3rd, Fifth, 7th"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-8,-5,-2,0];this.note_labels=["M3","5","7","R"];this.structure="Major 3rd, Fifth, 7th, Root"}else if(this.inversion==Chord.INVERSION_TYPE.Second){this.note_sequence=[-5,-2,0,4];this.note_labels=["5","7","R","M3"];this.structure="Fifth, 7th, Root, Major 3rd"}else{this.note_sequence=[-2,0,4,7];this.note_labels=["7","R","M3","5"];this.structure="7th, Root, Major 3rd, Fifth"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/dominant_seventh.mp3"]);break}}to_string(){return"CHORD: "+this.name+", "+this.structure+", ",this.note_sequence}isWithinRange(range){return this.root_note.midi_value+this.note_sequence[0]>=range.min&&this.root_note.midi_value+this.note_sequence[this.note_sequence.length-1]<=range.max}getNoteArray(all_notes,range){function isNoteWithinRange(midi_number,range){return midi_number>=range.min&&midi_number<=range.max}var note_array=[];var i;for(i=0;i<this.note_sequence.length;i++){let midi_number=this.root_note.midi_value+this.note_sequence[i];if(isNoteWithinRange(midi_number,range)){note_array.push(all_notes[midi_number])}}if(note_array.length==0){log.e("no notes found for chord")}return note_array}}const ALL_CHORD_TYPES=[Chord.TYPE.Major,Chord.TYPE.minor,Chord.TYPE.Major7,Chord.TYPE.minor7];function type_is_three_notes(chord_type){return chord_type==Chord.TYPE.Major||chord_type==Chord.TYPE.minor||chord_type==Chord.TYPE.Aug||chord_type==Chord.TYPE.Dim}function generate_random_chord(min,max){var chord_array=[];if(model.chords.three_note_types.length==0&&model.chords.four_note_types.length==0){logE("fatal error: generate_random_chord")}else if(model.chords.three_note_types.length>0&&model.chords.four_note_types.length==0){chord_array=model.chords.three_note_types}else if(model.chords.three_note_types.length==0&&model.chords.four_note_types.length>0){chord_array=model.chords.four_note_types}else{chord_array=model.chords.three_note_types.concat(model.chords.four_note_types)}var random_note=generate_random_note(min,max-18);var random_chord_type=chord_array[randomIntFromInterval(0,chord_array.length-1)];var play_type=model.chords.play_types[randomIntFromInterval(0,model.chords.play_types.length-1)];var inversion=INVERSION_TYPE.Root;if(type_is_three_notes(random_chord_type)){inversion=model.chords.three_note_inversion_types[randomIntFromInterval(0,model.chords.three_note_inversion_types.length-1)]}else{inversion=model.chords.four_note_inversion_types[randomIntFromInterval(0,model.chords.four_note_inversion_types.length-1)]}var random_chord=new Chord(random_note,random_chord_type,play_type,inversion);return random_chord}function generate_chord_with_note(note_name,all_notes){var random_chord_type=ALL_CHORD_TYPES[randomIntFromInterval(0,ALL_CHORD_TYPES.length-1)];var octave=1+randomIntFromInterval(2,4);var note=all_notes[note_name.associated_midi_values[octave]];var play_type=Chord.PLAY_TYPE.HARMONIC;var inversion=Chord.INVERSION_TYPE.Root;var random_chord=new Chord(note,random_chord_type,play_type,inversion);return random_chord}module.exports=Chord},{"@jasonfleischer/log":2}],5:[function(require,module,exports){const log=require("@jasonfleischer/log");class Note{constructor(note_name,midi_value,octave){this.note_name=note_name;this.midi_value=midi_value;this.octave=octave;this.frequency=this.getEqualTemperedFrequency();if(!this.isWithinRange({min:0,max:127})){log.e("can only create notes with midi values between 0 and 127")}}to_string(){return"NOTE: "+this.note_name.type+" "+this.midi_value+" "+this.octave}getEqualTemperedFrequency(){return 440*Math.pow(2,(this.midi_value-69)/12)}isWithinRange(range){return this.midi_value>=range.min&&this.midi_value<=range.max}}Note.Name=class{static TYPE=Object.freeze({C:"C",C_sharp:"C# / Db",D:"D",D_sharp:"D# / Eb",E:"E",F:"F",F_sharp:"F# / Gb",G:"G",G_sharp:"G# / Ab",A:"A",A_sharp:"A# / Bb",B:"B"});constructor(type){function get_associated_midi_values(row){var base_array=[0,12,24,36,48,60,72,84,96,108,120];var result=[];var i;for(i=0;i<base_array.length;i++){var value=base_array[i]+row;if(value>127)break;result.push(value)}return result}this.type=type;switch(type){case Note.Name.TYPE.C:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/C.mp3"];this.color="#ff0000";this.associated_midi_values=get_associated_midi_values(0);break;case Note.Name.TYPE.C_sharp:this.is_sharp_or_flat=true;this.sharp_name="C#";this.flat_name="Db";this.file_name=["audio/notes/C_sharp.mp3","audio/notes/or.mp3","audio/notes/D_flat.mp3"];this.color="#ff8000";this.associated_midi_values=get_associated_midi_values(1);break;case Note.Name.TYPE.D:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/D.mp3"];this.color="#ffff00";this.associated_midi_values=get_associated_midi_values(2);break;case Note.Name.TYPE.D_sharp:this.is_sharp_or_flat=true;this.sharp_name="D#";this.flat_name="Eb";this.file_name=["audio/notes/D_sharp.mp3","audio/notes/or.mp3","audio/notes/E_flat.mp3"];this.color="#7fff00";this.associated_midi_values=get_associated_midi_values(3);break;case Note.Name.TYPE.E:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/E.mp3"];this.color="#00ff00";this.associated_midi_values=get_associated_midi_values(4);break;case Note.Name.TYPE.F:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/F.mp3"];this.color="#00ff80";this.associated_midi_values=get_associated_midi_values(5);break;case Note.Name.TYPE.F_sharp:this.is_sharp_or_flat=true;this.sharp_name="F#";this.flat_name="Gb";this.file_name=["audio/notes/F_sharp.mp3","audio/notes/or.mp3","audio/notes/G_flat.mp3"];this.color="#00ffff";this.associated_midi_values=get_associated_midi_values(6);break;case Note.Name.TYPE.G:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/G.mp3"];this.color="#007fff";this.associated_midi_values=get_associated_midi_values(7);break;case Note.Name.TYPE.G_sharp:this.is_sharp_or_flat=true;this.sharp_name="G#";this.flat_name="Ab";this.file_name=["audio/notes/G_sharp.mp3","audio/notes/or.mp3","audio/notes/A_flat.mp3"];this.color="#0000ff";this.associated_midi_values=get_associated_midi_values(8);break;case Note.Name.TYPE.A:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/A.mp3"];this.color="#8000ff";this.associated_midi_values=get_associated_midi_values(9);break;case Note.Name.TYPE.A_sharp:this.is_sharp_or_flat=true;this.sharp_name="A#";this.flat_name="Bb";this.file_name=["audio/notes/A_sharp.mp3","audio/notes/or.mp3","audio/notes/B_flat.mp3"];this.color="#ff00ff";this.associated_midi_values=get_associated_midi_values(10);break;case Note.Name.TYPE.B:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/B.mp3"];this.color="#ff007f";this.associated_midi_values=get_associated_midi_values(11);break}}};module.exports=Note},{"@jasonfleischer/log":2}],6:[function(require,module,exports){const log=require("@jasonfleischer/log");class Scale{static TYPE=Object.freeze({Ionian:"Ionian",Aeolian:"Aeolian",minor_Pentatonic:"minor pentatonic",Major_Pentatonic:"Major pentatonic"});constructor(root_note,scale_type=Scale.TYPE.Major){this.root_note=root_note;this.type=scale_type;switch(scale_type){case Scale.TYPE.Ionian:this.note_sequence=[0,2,4,5,7,9,11];this.note_labels=["R","M2","M3","P4","P5","M6","M7"];this.structure="Root, Major 2nd, Major 3rd, Fourth, Fifth, Major 6th, Major 7th";this.file_name=root_note.note_name.file_name.concat(["audio/scale/ionian.mp3"]);break;case Scale.TYPE.Aeolian:this.note_sequence=[0,2,3,5,7,8,10];this.note_labels=["R","M2","m3","P4","P5","m6","m7"];this.structure="Root, Major 2nd, minor 3rd, Fourth, Fifth, minor 6th, minor 7th";this.file_name=root_note.note_name.file_name.concat(["audio/scale/aeolian.mp3"]);break}}getNoteArray(all_notes,range){var note_names=this.getUniqueNoteName(all_notes,range);var note_array=[];var i;for(i=range.min;i<=range.max;i++){var note=all_notes[i];if(note_names.has(note.note_name.type)){note_array.push(note)}}if(note_array.length==0){log.e("no notes found for scale")}return note_array}getUniqueNoteName(all_notes,range){function isNoteWithinRange(midi_number,range){return midi_number>=range.min&&midi_number<=range.max}const noteNames=new Set;var i;for(i=0;i<this.note_sequence.length;i++){let midi_number=this.root_note.midi_value+this.note_sequence[i];if(isNoteWithinRange(midi_number,range)){noteNames.add(all_notes[midi_number].note_name.type)}}for(i=this.note_sequence.length-1;i>=0;i--){let midi_number=this.root_note.midi_value-(12-this.note_sequence[i]);if(isNoteWithinRange(midi_number,range)){noteNames.add(all_notes[midi_number].note_name.type)}}return noteNames}to_string(){return"SCALE: "+this.root_note.note_name.type+": "+this.structure}}module.exports=Scale},{"@jasonfleischer/log":2}],7:[function(require,module,exports){const PianoView=require("./lib/piano_view.js");const log=require("@jasonfleischer/log");class PianoBuilder{constructor(options){this.id=options.id;if(this.id===undefined){log.e("id not provided for piano");return}this.pianoView=document.getElementById(this.id);if(this.pianoView===undefined){log.e("not piano exists with id: "+this.id);return}function isInt(value){var x=parseFloat(value);return!isNaN(value)&&(x|0)===x}this.range=options.range;if(this.range===undefined){this.range={min:21,max:108}}else{if(options.range.min!==undefined&&options.range.max!==undefined){if(isInt(options.range.min)){this.range.min=Math.min(Math.max(this.range.min,options.range.min),this.range.max)}if(isInt(options.range.max)){this.range.max=Math.min(Math.max(this.range.min,options.range.max),this.range.max)}}}this.width=1e3;if(options.width!==undefined){this.width=options.width}this.interactive=false;if(options.interactive!==undefined){this.interactive=options.interactive}this.view=new PianoView(this.id,this.width,this.range,this.interactive);return this.view}}module.exports={PianoBuilder:PianoBuilder}},{"./lib/piano_view.js":8,"@jasonfleischer/log":2}],8:[function(require,module,exports){const musicKit=require("@jasonfleischer/music-model-kit");const log=require("@jasonfleischer/log");class PianoView{constructor(id="piano_view_id",width=1e3,range=musicKit.piano_range,interative=true){this.id=id;this.BORDER_WIDTH=1;this.range=range;this.min_midi_value=range.min;this.max_midi_value=range.max;this.number_of_white_keys=0;this.number_of_black_keys=0;this.midi_value_to_piano_key_map={};var i;for(i=this.min_midi_value;i<=this.max_midi_value;i++){var note=musicKit.all_notes[i];if(!note.note_name.is_sharp_or_flat){this.number_of_white_keys++}else{this.number_of_black_keys++}}this.WIDTH=1e3;this.HEIGHT=this.calculateHeight(this.WIDTH,this.number_of_white_keys);this.buildCanvases();this.draw();this.resize(width);if(interative){this.addEventListener()}}buildCanvases(){let width=this.WIDTH;let height=this.HEIGHT;let pianoView=document.getElementById(this.id);this.white_keys_canvas=this.buildCanvas(pianoView,"piano_white_keys_canvas_"+this.id,width,height);this.white_keys_drawing_canvas=this.buildCanvas(pianoView,"piano_white_keys_drawing_canvas_"+this.id,width,height);this.black_keys_canvas=this.buildCanvas(pianoView,"piano_black_keys_canvas_"+this.id,width,height);this.black_keys_drawing_canvas=this.buildCanvas(pianoView,"piano_black_keys_drawing_canvas_"+this.id,width,height);pianoView.style.backgroundColor="grey";pianoView.style.position="relative";pianoView.style.width=width+"px";pianoView.style.height=height+"px";pianoView.width=width;pianoView.height=height}buildCanvas(pianoView,id,width,height){var canvas=document.createElement("canvas");canvas.id=id;canvas.style.position="absolute";canvas.style.left="0px";canvas.style.right="0px";canvas.style.width=width+"px";canvas.style.height=height+"px";canvas.width=width;canvas.height=height;pianoView.appendChild(canvas);return canvas}resize(newWidth){let pianoView=document.getElementById(this.id);var newWidth=Math.min(newWidth,this.WIDTH);var newHeight=this.calculateHeight(newWidth,this.number_of_white_keys);pianoView.style.height=newHeight+"px";this.black_keys_canvas.style.height=newHeight+"px";this.black_keys_drawing_canvas.style.height=newHeight+"px";this.white_keys_canvas.style.height=newHeight+"px";this.white_keys_drawing_canvas.style.height=newHeight+"px";pianoView.style.width=newWidth+"px";this.black_keys_canvas.style.width=newWidth+"px";this.black_keys_drawing_canvas.style.width=newWidth+"px";this.white_keys_canvas.style.width=newWidth+"px";this.white_keys_drawing_canvas.style.width=newWidth+"px"}draw(){let white_key_width=Math.floor((this.WIDTH-(this.number_of_white_keys+1)*this.BORDER_WIDTH)/this.number_of_white_keys);this.white_key_height=Math.floor(white_key_width*5);var white_keys=[];var i;var x=this.BORDER_WIDTH+(this.WIDTH-(white_key_width+this.BORDER_WIDTH)*this.number_of_white_keys)/2;for(i=this.min_midi_value;i<=this.max_midi_value;i++){var note=musicKit.all_notes[i];if(!note.note_name.is_sharp_or_flat){let key=new PianoView.Key(x,this.BORDER_WIDTH,white_key_width,this.BORDER_WIDTH+this.white_key_height,note,"#fff");white_keys.push(key);this.midi_value_to_piano_key_map[note.midi_value]=key;x=x+white_key_width+this.BORDER_WIDTH}}var ctx=this.white_keys_canvas.getContext("2d");var j;for(j=0;j<white_keys.length;j++){var white_key=white_keys[j];white_key.draw(ctx)}var black_keys=[];var black_key_width=Math.floor(white_key_width*.6);var black_key_height=Math.floor(this.white_key_height*.67);var k;for(k=this.min_midi_value;k<=this.max_midi_value;k++){var note=musicKit.all_notes[k];if(note.note_name.is_sharp_or_flat){var flat_key=this.midi_value_to_piano_key_map[note.midi_value-1];var sharp_key=this.midi_value_to_piano_key_map[note.midi_value+1];if(flat_key!=undefined&&sharp_key!=undefined){var x=flat_key.x+this.BORDER_WIDTH+white_key_width-black_key_width/2;let key=new PianoView.Key(x,this.BORDER_WIDTH,black_key_width,black_key_height,note,"#333");black_keys.push(key);this.midi_value_to_piano_key_map[note.midi_value]=key}}}ctx=this.black_keys_canvas.getContext("2d");var l;for(l=0;l<black_keys.length;l++){var black_key=black_keys[l];black_key.draw(ctx)}}calculateHeight(width,number_of_white_keys){let white_key_width=Math.floor((width-(this.number_of_white_keys+1)*this.BORDER_WIDTH)/this.number_of_white_keys);return Math.ceil(white_key_width*5+this.BORDER_WIDTH*2)+1}clear(){this.black_keys_drawing_canvas.getContext("2d").clearRect(0,0,this.WIDTH,this.HEIGHT);this.white_keys_drawing_canvas.getContext("2d").clearRect(0,0,this.WIDTH,this.HEIGHT)}drawNote(note){if(note==undefined){log.e("note is undefined");return}this.drawNoteWithColor(note)}drawNoteWithColor(note,color=note.note_name.color){if(note==undefined){log.e("note is undefined");return}if(!note.isWithinRange(this.range)){log.e("note is out of range");return}var ctx=note.note_name.is_sharp_or_flat?this.black_keys_drawing_canvas.getContext("2d"):this.white_keys_drawing_canvas.getContext("2d");let key=this.midi_value_to_piano_key_map[note.midi_value];key.draw(ctx,color)}drawInterval(interval){var play_type=interval.play_type;var first_note=play_type==INTERVAL_PLAY_TYPE.ASCENDING?interval.lower_note:interval.higher_note;this.clear();this.drawNoteWithColor(first_note);setTimeout(()=>{var second_note=play_type==INTERVAL_PLAY_TYPE.ASCENDING?interval.higher_note:interval.lower_note;this.drawNoteWithColor(second_note)},interval.play_type==INTERVAL_PLAY_TYPE.HARMONIC?0:interval.delay_in_ms)}drawChord(chord){this.clear();var note_array=chord.getNoteArray(musicKit.all_notes,this.range);var j;for(j=0;j<note_array.length;j++){var note=note_array[j];var label=chord.note_labels[j];if(label=="R"){this.drawNoteWithColor(note)}else{this.drawNoteWithColor(note,"#999")}}}drawScale(scale){this.clear();var note_array=scale.getNoteArray(musicKit.all_notes,this.range);var j;for(j=0;j<note_array.length;j++){var note=note_array[j];if(note.note_name.type==scale.root_note.note_name.type){this.drawNoteWithColor(note)}else{this.drawNoteWithColor(note,"#999")}}}addEventListener(){function getPosition(el){var xPosition=0;var yPosition=0;while(el){xPosition+=el.offsetLeft-el.scrollLeft+el.clientLeft;yPosition+=el.offsetTop-el.scrollTop+el.clientTop;el=el.offsetParent}return{x:xPosition,y:yPosition}}let pianoView=document.getElementById(this.id);pianoView.addEventListener("click",function(event){let position=getPosition(pianoView);log.e(" "+position.x-event.clientX+": "+position.y-event.clientY)},true)}}PianoView.Key=class{constructor(x,y,width,height,note,color){this.x=x;this.y=y;this.width=width;this.height=height;this.note=note;this.color=color}draw(ctx,color=this.color){ctx.beginPath();ctx.lineWidth=0;ctx.fillStyle=color;ctx.rect(this.x,this.y,this.width,this.height);ctx.fill();ctx.stroke();if(this.note.note_name.name=="C"&&this.note.octave==4){ctx.beginPath();ctx.arc(this.x+this.width/2,this.height-this.height*.1,this.width*.15,0,2*Math.PI,false);ctx.fillStyle="#666";ctx.fill()}}};module.exports=PianoView},{"@jasonfleischer/log":2,"@jasonfleischer/music-model-kit":3}]},{},[1]);