(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){const pianoKit=require("@jasonfleischer/piano");const musicKit=require("@jasonfleischer/music-model-kit");let pianoView=pianoKit.buildView({id:"display_piano",width:700});document.getElementById("note_button").onclick=function(){let midiValue=45;let note=musicKit.all_notes[midiValue];pianoView.drawNote(note)};document.getElementById("chord_button").onclick=function(){let midiValue=60;let note=musicKit.all_notes[midiValue];let chord=musicKit.all_notes[midiValue];pianoView.drawChord(new musicKit.Chord(note,musicKit.all_notes))};document.getElementById("scale_button").onclick=function(){alert("todo")};document.getElementById("clear_button").onclick=function(){pianoView.clear()};let interactivePianoView=pianoKit.buildView({id:"interactive_piano",range:{min:47,max:60},interactive:true,width:300})},{"@jasonfleischer/music-model-kit":3,"@jasonfleischer/piano":6}],2:[function(require,module,exports){var LOG_NON_ERROR_MESSAGES=true;const log={};log.i=function(msg){if(LOG_NON_ERROR_MESSAGES)console.log(msg)};log.e=function(msg){console.log("%c ERROR: "+msg,"background: red; color: white; display: block;")};log.turnOffNonErrorLogs=function(){LOG_NON_ERROR_MESSAGES=false};module.exports=log},{}],3:[function(require,module,exports){const Note=require("./lib/note.js");const Chord=require("./lib/chord.js");const Scale=require("./lib/chord.js");const ALL_NOTE_NAME_TYPES=[new Note.Name(Note.Name.TYPE.C),new Note.Name(Note.Name.TYPE.C_sharp),new Note.Name(Note.Name.TYPE.D),new Note.Name(Note.Name.TYPE.D_sharp),new Note.Name(Note.Name.TYPE.E),new Note.Name(Note.Name.TYPE.F),new Note.Name(Note.Name.TYPE.F_sharp),new Note.Name(Note.Name.TYPE.G),new Note.Name(Note.Name.TYPE.G_sharp),new Note.Name(Note.Name.TYPE.A),new Note.Name(Note.Name.TYPE.A_sharp),new Note.Name(Note.Name.TYPE.B)];const piano_range={min:21,max:108};var all_notes=[];function build_all_notes(){var note_value=0;const octaves=9;var octave=0;for(octave=-1;octave<=octaves;octave++){var j;for(j=0;j<ALL_NOTE_NAME_TYPES.length;j++){var note_name=ALL_NOTE_NAME_TYPES[j].sharp_name;var note=new Note(ALL_NOTE_NAME_TYPES[j],note_value,octave);all_notes.push(note);note_value++;if(note_value==128)break}}}function generate_random_note(min,max){return all_notes[randomIntFromInterval(min,max)]}function init(){build_all_notes()}module.exports={init:init,Note:Note,Chord:Chord,Scale:Scale,all_notes:all_notes,piano_range:piano_range}},{"./lib/chord.js":4,"./lib/note.js":5}],4:[function(require,module,exports){class Chord{static TYPE=Object.freeze({Major:"Major",minor:"minor",Aug:"augmented",Dim:"diminished",Major7:"Major 7",minor7:"minor 7",Dom7:"Dominant 7"});static INVERSION_TYPE=Object.freeze({Root:"Root",First:"first inversion",Second:"second inversion",Third:"third inversion"});static PLAY_TYPE=Object.freeze({HARMONIC:"Harmonic",ARPEGGIATE:"Arpeggiate"});constructor(root_note,all_notes,chord_type=Chord.TYPE.Major,play_type=Chord.PLAY_TYPE.HARMONIC,inversion=Chord.INVERSION_TYPE.Root){this.delay_in_ms=500;this.name=root_note.note_name.name+" "+chord_type;this.inversion=inversion;this.type=chord_type;this.play_type=play_type;switch(chord_type){case Chord.TYPE.Major:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_array=[root_note,all_notes[root_note.note_value+4],all_notes[root_note.note_value+7]];this.note_labels=["R","M3","5"];this.structure="Root, Major 3rd, Fifth"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_array=[all_notes[root_note.note_value+4],all_notes[root_note.note_value+7],all_notes[root_note.note_value+12]];this.note_labels=["M3","5","R"];this.structure="Major 3rd, Fifth, Root"}else{this.note_array=[all_notes[root_note.note_value+7],all_notes[root_note.note_value+12],all_notes[root_note.note_value+16]];this.note_labels=["5","R","M3"];this.structure="Fifth, Root, Major 3rd"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/major.mp3"]);break;case Chord.TYPE.minor:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_array=[root_note,all_notes[root_note.note_value+3],all_notes[root_note.note_value+7]];this.note_labels=["R","m3","5"];this.structure="Root, minor 3rd, Fifth"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_array=[all_notes[root_note.note_value+3],all_notes[root_note.note_value+7],all_notes[root_note.note_value+12]];this.note_labels=["m3","5","R"];this.structure="minor 3rd, Fifth, Root"}else{this.note_array=[all_notes[root_note.note_value+7],all_notes[root_note.note_value+12],all_notes[root_note.note_value+15]];this.note_labels=["5","R","m3"];this.structure="Fifth, Root, minor 3rd"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/minor.mp3"]);break;case Chord.TYPE.Aug:this.inversion=Chord.INVERSION_TYPE.Root;this.note_array=[root_note,all_notes[root_note.note_value+4],all_notes[root_note.note_value+8]];this.note_labels=["R","M3","#5"];this.structure="Root, Major 3rd, Sharp Fifth";this.file_name=root_note.note_name.file_name.concat(["audio/chords/augmented.mp3"]);break;case Chord.TYPE.Dim:this.inversion=Chord.INVERSION_TYPE.Root;this.note_array=[root_note,all_notes[root_note.note_value+3],all_notes[root_note.note_value+6]];this.note_labels=["R","m3","b5"];this.structure="Root, minor 3rd, Flat Fifth";this.file_name=root_note.note_name.file_name.concat(["audio/chords/diminished.mp3"]);break;case Chord.TYPE.Major7:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_array=[root_note,all_notes[root_note.note_value+4],all_notes[root_note.note_value+7],all_notes[root_note.note_value+11]];this.note_labels=["R","M3","5","M7"];this.structure="Root, Major 3rd, Fifth, Major 7th"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_array=[all_notes[root_note.note_value+4],all_notes[root_note.note_value+7],all_notes[root_note.note_value+11],all_notes[root_note.note_value+12]];this.note_labels=["M3","5","M7","R"];this.structure="Major 3rd, Fifth, Major 7th, Root"}else if(this.inversion==Chord.INVERSION_TYPE.Second){this.note_array=[all_notes[root_note.note_value+7],all_notes[root_note.note_value+11],all_notes[root_note.note_value+12],all_notes[root_note.note_value+16]];this.note_labels=["5","M7","R","M3"];this.structure="Fifth, Major 7th, Root, Major 3rd"}else{this.note_array=[all_notes[root_note.note_value+11],all_notes[root_note.note_value+12],all_notes[root_note.note_value+16],all_notes[root_note.note_value+19]];this.note_labels=["M7","R","M3","5"];this.structure="Major 7th, Root, Major 3rd, Fifth"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/major_seventh.mp3"]);break;case Chord.TYPE.minor7:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_array=[root_note,all_notes[root_note.note_value+3],all_notes[root_note.note_value+7],all_notes[root_note.note_value+10]];this.note_labels=["R","m3","5","m7"];this.structure="Root, minor 3rd, Fifth, minor 7th"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_array=[all_notes[root_note.note_value+3],all_notes[root_note.note_value+7],all_notes[root_note.note_value+10],all_notes[root_note.note_value+12]];this.note_labels=["m3","5","m7","R"];this.structure="minor 3rd, Fifth, minor 7th, Root"}else if(this.inversion==Chord.INVERSION_TYPE.Second){this.note_array=[all_notes[root_note.note_value+7],all_notes[root_note.note_value+10],all_notes[root_note.note_value+12],all_notes[root_note.note_value+15]];this.note_labels=["5","m7","R","m3"];this.structure="Fifth, minor 7th, Root, minor 3rd"}else{this.note_array=[all_notes[root_note.note_value+10],all_notes[root_note.note_value+12],all_notes[root_note.note_value+15],all_notes[root_note.note_value+19]];this.note_labels=["m7","R","m3","5"];this.structure="minor 7th, Root, minor 3rd, Fifth"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/minor_seventh.mp3"]);break;case Chord.TYPE.Dom7:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_array=[root_note,all_notes[root_note.note_value+4],all_notes[root_note.note_value+7],all_notes[root_note.note_value+10]];this.note_labels=["R","M3","5","7"];this.structure="Root, Major 3rd, Fifth, 7th"}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_array=[all_notes[root_note.note_value+4],all_notes[root_note.note_value+7],all_notes[root_note.note_value+10],all_notes[root_note.note_value+12]];this.note_labels=["M3","5","7","R"];this.structure="Major 3rd, Fifth, 7th, Root"}else if(this.inversion==Chord.INVERSION_TYPE.Second){this.note_array=[all_notes[root_note.note_value+7],all_notes[root_note.note_value+10],all_notes[root_note.note_value+12],all_notes[root_note.note_value+16]];this.note_labels=["5","7","R","M3"];this.structure="Fifth, 7th, Root, Major 3rd"}else{this.note_array=[all_notes[root_note.note_value+10],all_notes[root_note.note_value+12],all_notes[root_note.note_value+16],all_notes[root_note.note_value+19]];this.note_labels=["7","R","M3","5"];this.structure="7th, Root, Major 3rd, Fifth"}this.file_name=root_note.note_name.file_name.concat(["audio/chords/dominant_seventh.mp3"]);break}}to_string(){return"CHORD: "+this.name+", "+this.structure+", ",this.note_array}}const ALL_CHORD_TYPES=[Chord.TYPE.Major,Chord.TYPE.minor,Chord.TYPE.Major7,Chord.TYPE.minor7];function type_is_three_notes(chord_type){return chord_type==Chord.TYPE.Major||chord_type==Chord.TYPE.minor||chord_type==Chord.TYPE.Aug||chord_type==Chord.TYPE.Dim}function generate_random_chord(min,max){var chord_array=[];if(model.chords.three_note_types.length==0&&model.chords.four_note_types.length==0){logE("fatal error: generate_random_chord")}else if(model.chords.three_note_types.length>0&&model.chords.four_note_types.length==0){chord_array=model.chords.three_note_types}else if(model.chords.three_note_types.length==0&&model.chords.four_note_types.length>0){chord_array=model.chords.four_note_types}else{chord_array=model.chords.three_note_types.concat(model.chords.four_note_types)}var random_note=generate_random_note(min,max-18);var random_chord_type=chord_array[randomIntFromInterval(0,chord_array.length-1)];var play_type=model.chords.play_types[randomIntFromInterval(0,model.chords.play_types.length-1)];var inversion=INVERSION_TYPE.Root;if(type_is_three_notes(random_chord_type)){inversion=model.chords.three_note_inversion_types[randomIntFromInterval(0,model.chords.three_note_inversion_types.length-1)]}else{inversion=model.chords.four_note_inversion_types[randomIntFromInterval(0,model.chords.four_note_inversion_types.length-1)]}var random_chord=new Chord(random_note,random_chord_type,play_type,inversion);return random_chord}function generate_chord_with_note(note_name){var random_chord_type=ALL_CHORD_TYPES[randomIntFromInterval(0,ALL_CHORD_TYPES.length-1)];var octave=1+randomIntFromInterval(2,4);var note=all_notes[note_name.associated_note_values[octave]];var play_type=Chord.PLAY_TYPE.HARMONIC;var inversion=Chord.INVERSION_TYPE.Root;var random_chord=new Chord(note,random_chord_type,play_type,inversion);return random_chord}module.exports=Chord},{}],5:[function(require,module,exports){class Note{constructor(note_name,note_value,octave){this.note_name=note_name;this.note_value=note_value;this.octave=octave}to_string(){return"NOTE: "+this.note_name.name+" "+this.note_value+" "+this.octave}}Note.Name=class{static TYPE=Object.freeze({C:"C",C_sharp:"C# / Db",D:"D",D_sharp:"D# / Eb",E:"E",F:"F",F_sharp:"F# / Gb",G:"G",G_sharp:"G# / Ab",A:"A",A_sharp:"A# / Bb",B:"B"});constructor(type){function get_associated_note_values(row){var base_array=[0,12,24,36,48,60,72,84,96,108,120];var result=[];var i;for(i=0;i<base_array.length;i++){var value=base_array[i]+row;if(value>127)break;result.push(value)}return result}this.name=type;switch(type){case Note.Name.TYPE.C:this.is_sharp_or_flat=false;this.sharp_name=this.name;this.flat_name=this.name;this.file_name=["audio/notes/C.mp3"];this.color="#ff0000";this.zodiac="aries";this.associated_note_values=get_associated_note_values(0);break;case Note.Name.TYPE.C_sharp:this.is_sharp_or_flat=true;this.sharp_name="C#";this.flat_name="Db";this.file_name=["audio/notes/C_sharp.mp3","audio/notes/or.mp3","audio/notes/D_flat.mp3"];this.color="#ff8000";this.zodiac="taurus";this.associated_note_values=get_associated_note_values(1);break;case Note.Name.TYPE.D:this.is_sharp_or_flat=false;this.sharp_name=this.name;this.flat_name=this.name;this.file_name=["audio/notes/D.mp3"];this.color="#ffff00";this.zodiac="gemini";this.associated_note_values=get_associated_note_values(2);break;case Note.Name.TYPE.D_sharp:this.is_sharp_or_flat=true;this.sharp_name="D#";this.flat_name="Eb";this.file_name=["audio/notes/D_sharp.mp3","audio/notes/or.mp3","audio/notes/E_flat.mp3"];this.color="#7fff00";this.zodiac="cancer";this.associated_note_values=get_associated_note_values(3);break;case Note.Name.TYPE.E:this.is_sharp_or_flat=false;this.sharp_name=this.name;this.flat_name=this.name;this.file_name=["audio/notes/E.mp3"];this.color="#00ff00";this.zodiac="leo";this.associated_note_values=get_associated_note_values(4);break;case Note.Name.TYPE.F:this.is_sharp_or_flat=false;this.sharp_name=this.name;this.flat_name=this.name;this.file_name=["audio/notes/F.mp3"];this.color="#00ff80";this.zodiac="virgo";this.associated_note_values=get_associated_note_values(5);break;case Note.Name.TYPE.F_sharp:this.is_sharp_or_flat=true;this.sharp_name="F#";this.flat_name="Gb";this.file_name=["audio/notes/F_sharp.mp3","audio/notes/or.mp3","audio/notes/G_flat.mp3"];this.color="#00ffff";this.zodiac="libra";this.associated_note_values=get_associated_note_values(6);break;case Note.Name.TYPE.G:this.is_sharp_or_flat=false;this.sharp_name=this.name;this.flat_name=this.name;this.file_name=["audio/notes/G.mp3"];this.color="#007fff";this.zodiac="scorpio";this.associated_note_values=get_associated_note_values(7);break;case Note.Name.TYPE.G_sharp:this.is_sharp_or_flat=true;this.sharp_name="G#";this.flat_name="Ab";this.file_name=["audio/notes/G_sharp.mp3","audio/notes/or.mp3","audio/notes/A_flat.mp3"];this.color="#0000ff";this.zodiac="sagittarius";this.associated_note_values=get_associated_note_values(8);break;case Note.Name.TYPE.A:this.is_sharp_or_flat=false;this.sharp_name=this.name;this.flat_name=this.name;this.file_name=["audio/notes/A.mp3"];this.color="#8000ff";this.zodiac="capricorn";this.associated_note_values=get_associated_note_values(9);break;case Note.Name.TYPE.A_sharp:this.is_sharp_or_flat=true;this.sharp_name="A#";this.flat_name="Bb";this.file_name=["audio/notes/A_sharp.mp3","audio/notes/or.mp3","audio/notes/B_flat.mp3"];this.color="#ff00ff";this.zodiac="aquarius";this.associated_note_values=get_associated_note_values(10);break;case Note.Name.TYPE.B:this.is_sharp_or_flat=false;this.sharp_name=this.name;this.flat_name=this.name;this.file_name=["audio/notes/B.mp3"];this.color="#ff007f";this.zodiac="pisces";this.associated_note_values=get_associated_note_values(11);break}}};module.exports=Note},{}],6:[function(require,module,exports){const musicKit=require("@jasonfleischer/music-model-kit");const PianoView=require("./lib/piano_view.js");const log=require("@jasonfleischer/log");const piano={};piano.buildView=function(options){let id=options.id;if(id===undefined){log.e("id not provided for piano");return}let pianoView=document.getElementById(id);if(pianoView===undefined){log.e("not piano exists with id: "+id);return}let range=musicKit.piano_range;if(options.range!==undefined){if(options.range.min!==undefined&&options.range.max!==undefined){if(isInt(options.range.min)){range.min=Math.min(Math.max(range.min,options.range.min),range.max)}if(isInt(options.range.max)){range.max=Math.min(Math.max(range.min,options.range.max),range.max)}}}let width=1e3;if(options.width!==undefined){width=options.width}let interactive=false;if(options.interactive!==undefined){interactive=options.interactive}musicKit.init();let view=new PianoView(id,width,range,interactive);view.resize(width);return view};function isInt(value){var x=parseFloat(value);return!isNaN(value)&&(x|0)===x}module.exports=piano},{"./lib/piano_view.js":7,"@jasonfleischer/log":2,"@jasonfleischer/music-model-kit":3}],7:[function(require,module,exports){const musicKit=require("@jasonfleischer/music-model-kit");class PianoView{constructor(id="piano_view_id",width=1e3,range=musicKit.piano_range,interative=true){this.id=id;this.WIDTH=width;this.HEIGHT=93;this.BORDER_WIDTH=1;this.min_note_value=range.min;this.max_note_value=range.max;this.note_value_to_piano_key_map={};this.buildCanvases();this.black_keys_canvas=document.getElementById("piano_black_keys_canvas_"+id);this.black_keys_canvas.width=this.WIDTH;this.black_keys_canvas.height=this.HEIGHT;this.white_keys_canvas=document.getElementById("piano_white_keys_canvas_"+id);this.white_keys_canvas.width=this.WIDTH;this.white_keys_canvas.height=this.HEIGHT;this.canvas_background=document.getElementById("piano_background_canvas_"+id);this.canvas_background.width=this.WIDTH;this.canvas_background.height=this.HEIGHT;this.draw_background();this.resize(width)}buildCanvases(){let width="1000px";let height="230px";let pianoView=document.getElementById(this.id);var canvas=document.createElement("canvas");canvas.id="piano_background_canvas_"+this.id;canvas.style.position="absolute";canvas.style.left="0px";canvas.style.right="0px";canvas.style.width=width;canvas.style.height=height;pianoView.appendChild(canvas);var canvas=document.createElement("canvas");canvas.id="piano_white_keys_canvas_"+this.id;canvas.style.position="absolute";canvas.style.left="0px";canvas.style.right="0px";canvas.style.width=width;canvas.style.height=height;pianoView.appendChild(canvas);var canvas=document.createElement("canvas");canvas.id="piano_black_keys_canvas_"+this.id;canvas.style.position="absolute";canvas.style.left="0px";canvas.style.right="0px";canvas.style.width=width;canvas.style.height=height;pianoView.appendChild(canvas);pianoView.style.backgroundColor="grey";pianoView.style.position="relative";pianoView.style.width=width;pianoView.style.height=height}resize(newWidth){var newWidth=Math.min(newWidth,this.WIDTH);var newHeight=newWidth*(this.HEIGHT/this.WIDTH);document.getElementById(this.id).style.height=newHeight+"px";this.canvas_background.style.height=newHeight+"px";this.black_keys_canvas.style.height=newHeight+"px";this.white_keys_canvas.style.height=newHeight+"px";document.getElementById(this.id).style.width=newWidth+"px";this.canvas_background.style.width=newWidth+"px";this.black_keys_canvas.style.width=newWidth+"px";this.white_keys_canvas.style.width=newWidth+"px"}draw_background(){var ctx=this.canvas_background.getContext("2d");let number_of_white_keys=0;let number_of_black_keys=0;for(i=this.min_note_value;i<=this.max_note_value;i++){var note=musicKit.all_notes[i];if(!note.note_name.is_sharp_or_flat){number_of_white_keys++}else{number_of_black_keys++}}let white_key_width=Math.floor((this.WIDTH-(number_of_white_keys+1)*this.BORDER_WIDTH)/number_of_white_keys);let white_key_height=Math.floor(white_key_width*5);var white_keys=[];var i;var x=this.BORDER_WIDTH+(this.WIDTH-(white_key_width+this.BORDER_WIDTH)*number_of_white_keys)/2;for(i=this.min_note_value;i<=this.max_note_value;i++){var note=musicKit.all_notes[i];if(!note.note_name.is_sharp_or_flat){let key=new PianoView.Key(x,this.BORDER_WIDTH,white_key_width,this.BORDER_WIDTH+white_key_height,note,"#fff");white_keys.push(key);this.note_value_to_piano_key_map[note.note_value]=key;x=x+white_key_width+this.BORDER_WIDTH}}var j;for(j=0;j<white_keys.length;j++){var white_key=white_keys[j];white_key.draw(ctx)}var black_keys=[];var black_key_width=Math.floor(white_key_width*.6);var black_key_height=Math.floor(white_key_height*.67);var k;for(k=this.min_note_value;k<=this.max_note_value;k++){var note=musicKit.all_notes[k];if(note.note_name.is_sharp_or_flat){var flat_key=this.note_value_to_piano_key_map[note.note_value-1];var sharp_key=this.note_value_to_piano_key_map[note.note_value+1];if(flat_key!=undefined&&sharp_key!=undefined){var x=flat_key.x+this.BORDER_WIDTH+white_key_width-black_key_width/2;let key=new PianoView.Key(x,this.BORDER_WIDTH,black_key_width,black_key_height,note,"#333");black_keys.push(key);this.note_value_to_piano_key_map[note.note_value]=key}}}var l;for(l=0;l<black_keys.length;l++){var black_key=black_keys[l];black_key.draw(ctx)}}clear(){this.black_keys_canvas.getContext("2d").clearRect(0,0,this.WIDTH,this.HEIGHT);this.white_keys_canvas.getContext("2d").clearRect(0,0,this.WIDTH,this.HEIGHT)}drawNote(note){this.clear();this.drawNoteWithColor(note)}drawNoteWithColor(note,color=note.note_name.color){var ctx=note.note_name.is_sharp_or_flat?this.black_keys_canvas.getContext("2d"):this.white_keys_canvas.getContext("2d");let key=this.note_value_to_piano_key_map[note.note_value];key.draw(ctx,color);if(!note.note_name.is_sharp_or_flat){var flat_key=this.note_value_to_piano_key_map[note.note_value-1];var sharp_key=this.note_value_to_piano_key_map[note.note_value+1];if(flat_key!=undefined&&flat_key.note.note_name.is_sharp_or_flat){flat_key.draw(ctx)}if(sharp_key!=undefined&&sharp_key.note.note_name.is_sharp_or_flat){sharp_key.draw(ctx)}}}drawInterval(interval){var play_type=interval.play_type;var first_note=play_type==INTERVAL_PLAY_TYPE.ASCENDING?interval.lower_note:interval.higher_note;this.clear();this.drawNoteWithColor(first_note);setTimeout(()=>{var second_note=play_type==INTERVAL_PLAY_TYPE.ASCENDING?interval.higher_note:interval.lower_note;this.drawNoteWithColor(second_note)},interval.play_type==INTERVAL_PLAY_TYPE.HARMONIC?0:interval.delay_in_ms)}drawChord(chord){this.clear();var j;for(j=0;j<chord.note_array.length;j++){var note=chord.note_array[j];var label=chord.note_labels[j];if(label=="R"){this.drawNoteWithColor(note)}else{this.drawNoteWithColor(note,"#999")}}}}PianoView.Key=class{constructor(x,y,width,height,note,color){this.x=x;this.y=y;this.width=width;this.height=height;this.note=note;this.color=color}draw(ctx,color=this.color){ctx.beginPath();ctx.lineWidth=0;ctx.fillStyle=color;ctx.rect(this.x,this.y,this.width,this.height);ctx.fill();ctx.stroke();if(this.note.note_name.name=="C"&&this.note.octave==4){ctx.beginPath();ctx.arc(this.x+this.width/2,this.height-this.height*.1,this.width*.15,0,2*Math.PI,false);ctx.fillStyle="#666";ctx.fill()}}};module.exports=PianoView},{"@jasonfleischer/music-model-kit":3}]},{},[1]);