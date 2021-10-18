(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){const pianoKit=require("@jasonfleischer/piano");const musicKit=require("@jasonfleischer/music-model-kit");const log=require("@jasonfleischer/log");musicKit.init();let pianoView=pianoKit({id:"display_piano"});document.getElementById("note_button").onclick=function(){let midiValue=45;let note=musicKit.all_notes[midiValue];pianoView.clear();pianoView.drawNote(note)};document.getElementById("chord_button").onclick=function(){let midiValue=60;let note=musicKit.all_notes[midiValue];let chord=new musicKit.Chord(note,musicKit.Chord.TYPE.minor);pianoView.drawChord(chord)};document.getElementById("scale_button").onclick=function(){let midiValue=62;let note=musicKit.all_notes[midiValue];let scale=new musicKit.Scale(note,musicKit.Scale.TYPE.Aeolian);pianoView.drawScale(scale)};document.getElementById("clear_button").onclick=function(){pianoView.clear()};let interactivePianoView=pianoKit({id:"interactive_piano",range:{min:60,max:72},width:325,onClick:function(note,isOn){if(isOn){interactivePianoView.drawNote(note)}else{interactivePianoView.clearNote(note)}},hover:true});new musicKit.MidiListener(function(midiValue,channel,velocity){let note=musicKit.all_notes[midiValue];interactivePianoView.drawNote(note)},function(midiValue,channel,velocity){let note=musicKit.all_notes[midiValue];interactivePianoView.clearNote(note)})},{"@jasonfleischer/log":2,"@jasonfleischer/music-model-kit":3,"@jasonfleischer/piano":9}],2:[function(require,module,exports){var LOG_NON_ERROR_MESSAGES=true;const log={};log.i=function(msg){if(LOG_NON_ERROR_MESSAGES)console.log(msg)};log.e=function(msg){console.log("%c ERROR: "+msg,"background: red; color: white; display: block;")};log.turnOffNonErrorLogs=function(){LOG_NON_ERROR_MESSAGES=false};module.exports=log},{}],3:[function(require,module,exports){const Note=require("./lib/note.js");const Chord=require("./lib/chord.js");const Scale=require("./lib/scale.js");const Interval=require("./lib/interval.js");const MidiListener=require("./lib/midi_listener.js");const midi_range={min:0,max:127};const piano_range={min:21,max:108};const guitar_range={min:40,max:84};var all_notes=[];function init(){function build_all_notes(){let ALL_NOTE_NAME_TYPES=Note.ALL_NOTE_NAME_TYPES;var midi_value=0;const octaves=9;var octave=0;for(octave=-1;octave<=octaves;octave++){var j;for(j=0;j<ALL_NOTE_NAME_TYPES.length;j++){var note_name=ALL_NOTE_NAME_TYPES[j].sharp_name;var note=new Note(ALL_NOTE_NAME_TYPES[j],midi_value,octave);all_notes.push(note);midi_value++;if(midi_value>midi_range.max)break}}}build_all_notes()}module.exports={init:init,Note:Note,Chord:Chord,Scale:Scale,Interval:Interval,MidiListener:MidiListener,all_notes:all_notes,piano_range:piano_range,guitar_range:guitar_range}},{"./lib/chord.js":4,"./lib/interval.js":5,"./lib/midi_listener.js":6,"./lib/note.js":7,"./lib/scale.js":8}],4:[function(require,module,exports){const log=require("@jasonfleischer/log");class Chord{static TYPE=Object.freeze({Major:"Major",minor:"minor",Aug:"augmented",Dim:"diminished",Major7:"Major 7",minor7:"minor 7",Dom7:"Dominant 7"});static INVERSION_TYPE=Object.freeze({Root:"Root",First:"first inversion",Second:"second inversion",Third:"third inversion"});static PLAY_TYPE=Object.freeze({HARMONIC:"Harmonic",ARPEGGIATE:"Arpeggiate"});constructor(root_note,chord_type=Chord.TYPE.Major,play_type=Chord.PLAY_TYPE.HARMONIC,inversion=Chord.INVERSION_TYPE.Root){this.root_note=root_note;this.delay_in_ms=500;this.name=root_note.note_name.type+" "+chord_type;this.inversion=inversion;this.type=chord_type;this.play_type=play_type;function replaceAll(str,find,replace){return str.replace(new RegExp(find,"g"),replace)}this.file_name=root_note.note_name.file_name.concat(["audio/chords/"+replaceAll(replaceAll(this.type.toLowerCase()," ","_"),"7","seventh")+".mp3"]);switch(chord_type){case Chord.TYPE.Major:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,4,7]}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-8,-5,0]}else{this.note_sequence=[-5,0,4]}break;case Chord.TYPE.minor:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,3,7]}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-9,-5,0]}else{this.note_sequence=[-5,0,3]}break;case Chord.TYPE.Aug:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,4,8]}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-8,-4,0]}else{this.note_sequence=[-4,0,4]}break;case Chord.TYPE.Dim:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,3,6]}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-9,-6,0]}else{this.note_sequence=[-6,0,3]}break;case Chord.TYPE.Major7:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,4,7,11]}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-8,-5,-1,0]}else if(this.inversion==Chord.INVERSION_TYPE.Second){this.note_sequence=[-5,-1,0,4]}else{this.note_sequence=[-1,0,4,7]}this.file_name=root_note.note_name.file_name.concat(["audio/chords/major_seventh.mp3"]);break;case Chord.TYPE.minor7:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,3,7,10]}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-9,-5,-2,0]}else if(this.inversion==Chord.INVERSION_TYPE.Second){this.note_sequence=[-5,-2,0,3]}else{this.note_sequence=[-2,0,3,7]}this.file_name=root_note.note_name.file_name.concat(["audio/chords/minor_seventh.mp3"]);break;case Chord.TYPE.Dom7:if(this.inversion==Chord.INVERSION_TYPE.Root){this.note_sequence=[0,4,7,10]}else if(this.inversion==Chord.INVERSION_TYPE.First){this.note_sequence=[-8,-5,-2,0]}else if(this.inversion==Chord.INVERSION_TYPE.Second){this.note_sequence=[-5,-2,0,4]}else{this.note_sequence=[-2,0,4,7]}break}this.note_labels=this.getLabels();this.structure=this.getStructure()}getLabels(){let result=[];let all_labels=["R","m2","M2","m3","M3","P4","TT","P5","m6","M6","m7","M7"];var i;for(i=0;i<this.note_sequence.length;i++){var sequence=this.note_sequence[i];if(sequence<0){sequence=12+sequence}result.push(all_labels[sequence])}return result}getStructure(){let result=[];let all_labels=["Root","minor 2nd","Mahor 2nd","minor 3rd","Major 3rd","Fourth","Tritone","Fifth","minor 6th","Major 6th","minor 7th","Major 7th"];var i;for(i=0;i<this.note_sequence.length;i++){var sequence=this.note_sequence[i];if(sequence<0){sequence=12+sequence}result.push(all_labels[sequence])}return result}toString(){return"CHORD: "+this.name+", "+this.structure+", ",this.note_sequence}isWithinRange(range){return this.root_note.midi_value+this.note_sequence[0]>=range.min&&this.root_note.midi_value+this.note_sequence[this.note_sequence.length-1]<=range.max}getNoteArray(all_notes,range){function isNoteWithinRange(midi_number,range){return midi_number>=range.min&&midi_number<=range.max}var note_array=[];var i;for(i=0;i<this.note_sequence.length;i++){let midi_number=this.root_note.midi_value+this.note_sequence[i];if(isNoteWithinRange(midi_number,range)){note_array.push(all_notes[midi_number])}}if(note_array.length==0){log.i("no notes found for chord")}return note_array}static ALL_TYPES=[Chord.TYPE.Major,Chord.TYPE.minor,Chord.TYPE.Aug,Chord.TYPE.Dim,Chord.TYPE.Major7,Chord.TYPE.minor7,Chord.TYPE.Dom7];static ALL_PLAY_TYPES=[Chord.PLAY_TYPE.HARMONIC,Chord.PLAY_TYPE.ARPEGGIATE];static generateRandom(all_notes,range,types=ALL_TYPES,play_types=ALL_PLAY_TYPES,three_note_inversion_types=[Chord.INVERSION_TYPE.Root,Chord.INVERSION_TYPE.First,Chord.INVERSION_TYPE.Second],four_note_inversion_types=[Chord.INVERSION_TYPE.Root,Chord.INVERSION_TYPE.First,Chord.INVERSION_TYPE.Second,Chord.INVERSION_TYPE.Third]){let min=range.min;let max=range.max;function randomInteger(min,max){return Math.floor(Math.random()*(max-min+1)+min)}function is_type_three_notes(type){return type==Chord.TYPE.Major||type==Chord.TYPE.minor||type==Chord.TYPE.Aug||type==Chord.TYPE.Dim}var random_note=all_notes[randomInteger(min,max)];var play_type=play_types[randomInteger(0,play_types.length-1)];var random_chord_type=types[randomInteger(0,types.length-1)];var inversion=Chord.INVERSION_TYPE.Root;if(is_type_three_notes(random_chord_type)){inversion=three_note_inversion_types[randomInteger(0,three_note_inversion_types.length-1)]}else{inversion=four_note_inversion_types[randomInteger(0,four_note_inversion_types.length-1)]}var chord=new Chord(random_note,random_chord_type,play_type,inversion);var note_array=chord.getNoteArray(all_notes,range);let nunmber_of_notes=is_type_three_notes(random_chord_type)?3:4;while(note_array.length!=nunmber_of_notes){random_note=all_notes[randomInteger(min,max)];chord=new Chord(random_note,random_chord_type,play_type,inversion);note_array=chord.getNoteArray(all_notes,range)}return chord}}module.exports=Chord},{"@jasonfleischer/log":2}],5:[function(require,module,exports){class Interval{static TYPE=Object.freeze({MINOR_SECOND:"minor 2nd",MAJOR_SECOND:"Major 2nd",MINOR_THIRD:"minor 3rd",MAJOR_THIRD:"Major 3rd",PERFECT_FOURTH:"Fourth",TRITONE:"Tritone",PERFECT_FIFTH:"Fifth",MINOR_SIXTH:"minor 6th",MAJOR_SIXTH:"Major 6th",MINOR_SEVENTH:"minor 7th",MAJOR_SEVENTH:"Major 7th",OCTAVE:"Octave"});static PLAY_TYPE=Object.freeze({ASCENDING:"Ascending",DESCENDING:"Descending",HARMONIC:"Harmonic"});constructor(type,note,play_type){this.type=type;this.lower_note=note;this.delay_in_ms=500;this.play_type=play_type;function replaceAll(str,find,replace){return str.replace(new RegExp(find,"g"),replace)}this.audio_file_name="audio/intervals/"+replaceAll(this.type," ","_").toLowerCase()+".mp3";this.higher_note_midi_value=note.midi_value+this.getIntervalStep();if(this.higher_note_midi_value>128){log.e("todo: out of bounds error")}}toString(){return"INTERVAL: "+this.type+": "+this.getIntervalStep()}isWithinRange(min,max){return this.lower_note.midi_value>=min&&this.lower_note.midi_value<=max&&this.higher_note_midi_value>=min&&this.higher_note_midi_value<=max}getHigherNote(all_notes){return all_notes[this.higher_note_midi_value]}getIntervalStep=function(){switch(this.type){case Interval.TYPE.MINOR_SECOND:return 1;case Interval.TYPE.MAJOR_SECOND:return 2;case Interval.TYPE.MINOR_THIRD:return 3;case Interval.TYPE.MAJOR_THIRD:return 4;case Interval.TYPE.PERFECT_FOURTH:return 5;case Interval.TYPE.TRITONE:return 6;case Interval.TYPE.PERFECT_FIFTH:return 7;case Interval.TYPE.MINOR_SIXTH:return 8;case Interval.TYPE.MAJOR_SIXTH:return 9;case Interval.TYPE.MINOR_SEVENTH:return 10;case Interval.TYPE.MAJOR_SEVENTH:return 11;case Interval.TYPE.OCTAVE:return 12}};static ALL_TYPES=[Interval.TYPE.MINOR_SECOND,Interval.TYPE.MAJOR_SECOND,Interval.TYPE.MINOR_THIRD,Interval.TYPE.MAJOR_THIRD,Interval.TYPE.PERFECT_FOURTH,Interval.TYPE.TRITONE,Interval.TYPE.PERFECT_FIFTH,Interval.TYPE.MINOR_SIXTH,Interval.TYPE.MAJOR_SIXTH,Interval.TYPE.MINOR_SEVENTH,Interval.TYPE.MAJOR_SEVENTH,Interval.TYPE.OCTAVE];static ALL_PLAY_TYPES=[Interval.PLAY_TYPE.ASCENDING,Interval.PLAY_TYPE.DESCENDING,Interval.PLAY_TYPE.HARMONIC];static generateRandom(all_notes,range,types=ALL_TYPES,play_types=ALL_PLAY_TYPES){let min=range.min;let max=range.max;function randomInteger(min,max){return Math.floor(Math.random()*(max-min+1)+min)}var rand=randomInteger(0,types.length-1);var type=types[rand];var note=all_notes[randomInteger(min,max)];var rand=randomInteger(0,play_types.length-1);var play_type=play_types[rand];var interval=new Interval(type,note,play_type);while(!interval.isWithinRange(min,max)){note=all_notes[randomInteger(min,max)];interval=new Interval(type,note,play_type)}return interval}}module.exports=Interval},{}],6:[function(require,module,exports){const log=require("@jasonfleischer/log");class MidiListener{constructor(noteOn,noteOff){this.noteOn=noteOn;this.noteOff=noteOff;let self=this;if(!navigator.requestMIDIAccess){log.e("this browser does not support midi");return}navigator.permissions.query({name:"midi",sysex:true}).then(function(result){if(result.state=="granted"){log.i("Midi permissions granted")}else if(result.state=="prompt"){log.i("Midi permissions prompt")}else{log.i("Midi permissions denied")}});navigator.requestMIDIAccess({sysex:true}).then(function(access){if(access.inputs.size>0){self.connectToFirstDevice(Array.from(access.inputs.values()))}else{log.i("no midi devices found")}access.onstatechange=function(e){log.i("Midi state changed, number of devices: "+access.inputs.size);if(access.inputs.size>0){self.connectToFirstDevice(Array.from(access.inputs.values()))}}},function(){log.e("Midi request access failure")})}connectToFirstDevice(devices){if(devices.length>0){this.connectToDevice(devices[0])}else{log.e("connectToFirstDevice: no midi inputs")}}connectToDevice(device){if(this.connectedDevice!==undefined&&device.id==this.connectedDevice.id){log.i("Device already connected");return}log.i("Connecting to device: "+this.deviceToString(device));this.connectedDevice=device;let noteOn=this.noteOn;let noteOff=this.noteOff;let NOTE_ON=9;let NOTE_OFF=8;device.onmidimessage=function(m){const[command,message,velocity]=m.data;let midi_value=message;let channel=command&15;let opCode=(command&240)>>4;if(opCode===NOTE_ON){noteOn(midi_value,channel,velocity)}else if(opCode===NOTE_OFF){noteOff(midi_value,channel,velocity)}}}deviceToString(device){return device.name+" "+device.manufacturer}}module.exports=MidiListener},{"@jasonfleischer/log":2}],7:[function(require,module,exports){const log=require("@jasonfleischer/log");class Note{constructor(note_name,midi_value,octave){this.note_name=note_name;this.midi_value=midi_value;this.octave=octave;this.frequency=this.getEqualTemperedFrequency();if(!this.isWithinRange({min:0,max:127})){log.e("can only create notes with midi values between 0 and 127")}}toString(){return"NOTE: "+this.note_name.type+" "+this.midi_value+" "+this.octave}getEqualTemperedFrequency(){return 440*Math.pow(2,(this.midi_value-69)/12)}isWithinRange(range){return this.midi_value>=range.min&&this.midi_value<=range.max}static getRandom(all_notes,range){function randomInteger(min,max){return Math.floor(Math.random()*(max-min+1)+min)}return all_notes[randomInteger(range.min,range.max)]}}Note.Name=class{static TYPE=Object.freeze({C:"C",C_sharp:"C# / Db",D:"D",D_sharp:"D# / Eb",E:"E",F:"F",F_sharp:"F# / Gb",G:"G",G_sharp:"G# / Ab",A:"A",A_sharp:"A# / Bb",B:"B"});constructor(type){function get_associated_midi_values(row){var base_array=[0,12,24,36,48,60,72,84,96,108,120];var result=[];var i;for(i=0;i<base_array.length;i++){var value=base_array[i]+row;if(value>127)break;result.push(value)}return result}this.type=type;switch(type){case Note.Name.TYPE.C:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/C.mp3"];this.color="#ff0000";this.associated_midi_values=get_associated_midi_values(0);break;case Note.Name.TYPE.C_sharp:this.is_sharp_or_flat=true;this.sharp_name="C#";this.flat_name="Db";this.file_name=["audio/notes/C_sharp.mp3",,"audio/notes/or.mp3","audio/notes/D_flat.mp3"];this.color="#ff8000";this.associated_midi_values=get_associated_midi_values(1);break;case Note.Name.TYPE.D:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/D.mp3"];this.color="#ffff00";this.associated_midi_values=get_associated_midi_values(2);break;case Note.Name.TYPE.D_sharp:this.is_sharp_or_flat=true;this.sharp_name="D#";this.flat_name="Eb";this.file_name=["audio/notes/D_sharp.mp3","audio/notes/or.mp3","audio/notes/E_flat.mp3"];this.color="#7fff00";this.associated_midi_values=get_associated_midi_values(3);break;case Note.Name.TYPE.E:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/E.mp3"];this.color="#00ff00";this.associated_midi_values=get_associated_midi_values(4);break;case Note.Name.TYPE.F:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/F.mp3"];this.color="#00ff80";this.associated_midi_values=get_associated_midi_values(5);break;case Note.Name.TYPE.F_sharp:this.is_sharp_or_flat=true;this.sharp_name="F#";this.flat_name="Gb";this.file_name=["audio/notes/F_sharp.mp3","audio/notes/or.mp3","audio/notes/G_flat.mp3"];this.color="#00ffff";this.associated_midi_values=get_associated_midi_values(6);break;case Note.Name.TYPE.G:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/G.mp3"];this.color="#007fff";this.associated_midi_values=get_associated_midi_values(7);break;case Note.Name.TYPE.G_sharp:this.is_sharp_or_flat=true;this.sharp_name="G#";this.flat_name="Ab";this.file_name=["audio/notes/G_sharp.mp3","audio/notes/or.mp3","audio/notes/A_flat.mp3"];this.color="#0000ff";this.associated_midi_values=get_associated_midi_values(8);break;case Note.Name.TYPE.A:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/A.mp3"];this.color="#8000ff";this.associated_midi_values=get_associated_midi_values(9);break;case Note.Name.TYPE.A_sharp:this.is_sharp_or_flat=true;this.sharp_name="A#";this.flat_name="Bb";this.file_name=["audio/notes/A_sharp.mp3","audio/notes/or.mp3","audio/notes/B_flat.mp3"];this.color="#ff00ff";this.associated_midi_values=get_associated_midi_values(10);break;case Note.Name.TYPE.B:this.is_sharp_or_flat=false;this.sharp_name=this.type;this.flat_name=this.type;this.file_name=["audio/notes/B.mp3"];this.color="#ff007f";this.associated_midi_values=get_associated_midi_values(11);break}}};Note.ALL_NOTE_NAME_TYPES=[new Note.Name(Note.Name.TYPE.C),new Note.Name(Note.Name.TYPE.C_sharp),new Note.Name(Note.Name.TYPE.D),new Note.Name(Note.Name.TYPE.D_sharp),new Note.Name(Note.Name.TYPE.E),new Note.Name(Note.Name.TYPE.F),new Note.Name(Note.Name.TYPE.F_sharp),new Note.Name(Note.Name.TYPE.G),new Note.Name(Note.Name.TYPE.G_sharp),new Note.Name(Note.Name.TYPE.A),new Note.Name(Note.Name.TYPE.A_sharp),new Note.Name(Note.Name.TYPE.B)];module.exports=Note},{"@jasonfleischer/log":2}],8:[function(require,module,exports){const log=require("@jasonfleischer/log");class Scale{static TYPE=Object.freeze({minor_Pentatonic:"minor pentatonic",Major_Pentatonic:"Major pentatonic",Ionian:"Ionian",Dorian:"Dorian",Phrygian:"Phrygian",Lydian:"Lydian",Mixolydian:"Mixolydian",Aeolian:"Aeolian",Locrian:"Locrian",minor_Triad:"minor triad",Major_Triad:"Major triad"});constructor(root_note,scale_type=Scale.TYPE.Major){this.root_note=root_note;this.type=scale_type;function replaceAll(str,find,replace){return str.replace(new RegExp(find,"g"),replace)}this.file_name=root_note.note_name.file_name.concat(["audio/scale/"+replaceAll(this.type.toLowerCase()," ","_")+".mp3"]);this.alternate_names="none";switch(scale_type){case Scale.TYPE.Ionian:this.note_sequence=[0,2,4,5,7,9,11];this.alternate_names="Major";break;case Scale.TYPE.Dorian:this.note_sequence=[0,2,3,5,7,9,10];break;case Scale.TYPE.Phrygian:this.note_sequence=[0,1,3,5,7,8,10];break;case Scale.TYPE.Lydian:this.note_sequence=[0,2,4,6,7,9,11];break;case Scale.TYPE.Mixolydian:this.note_sequence=[0,2,4,5,7,9,10];break;case Scale.TYPE.Aeolian:this.note_sequence=[0,2,3,5,7,8,10];this.alternate_names="minor";break;case Scale.TYPE.Locrian:this.note_sequence=[0,1,3,5,6,8,10];break;case Scale.TYPE.minor_Pentatonic:this.note_sequence=[0,3,5,7,10];break;case Scale.TYPE.Major_Pentatonic:this.note_sequence=[0,2,4,7,9];break;case Scale.TYPE.minor_Triad:this.note_sequence=[0,3,7];break;case Scale.TYPE.Major_Triad:this.note_sequence=[0,4,7];break}this.note_labels=this.getLabels();this.structure=this.getStructure()}getNoteArray(all_notes,range){var note_names=this.getUniqueNoteName(all_notes,range);var note_array=[];var i;for(i=range.min;i<=range.max;i++){var note=all_notes[i];if(note_names.has(note.note_name.type)){note_array.push(note)}}if(note_array.length==0){log.e("no notes found for scale")}return note_array}getUniqueNoteName(all_notes,range){function isNoteWithinRange(midi_number,range){return midi_number>=range.min&&midi_number<=range.max}const noteNames=new Set;var i;for(i=0;i<this.note_sequence.length;i++){let midi_number=this.root_note.midi_value+this.note_sequence[i];if(isNoteWithinRange(midi_number,range)){noteNames.add(all_notes[midi_number].note_name.type)}}for(i=this.note_sequence.length-1;i>=0;i--){let midi_number=this.root_note.midi_value-(12-this.note_sequence[i]);if(isNoteWithinRange(midi_number,range)){noteNames.add(all_notes[midi_number].note_name.type)}}return noteNames}getLabels(){let result=[];let all_labels=["R","m2","M2","m3","M3","P4","TT","P5","m6","M6","m7","M7"];var i;for(i=0;i<=this.note_sequence.length;i++){result.push(all_labels[this.note_sequence[i]])}return result}getLabel(note){let all_labels=["R","m2","M2","m3","M3","P4","TT","P5","m6","M6","m7","M7"];if(note.midi_value>=this.root_note.midi_value){return all_labels[(note.midi_value-this.root_note.midi_value)%12]}else{return all_labels[(12-(this.root_note.midi_value-note.midi_value))%12]}}getStructure(){let result=[];let all_labels=["Root","minor 2nd","Mahor 2nd","minor 3rd","Major 3rd","Fourth","Tritone","Fifth","minor 6th","Major 6th","minor 7th","Major 7th"];var i;for(i=0;i<=this.note_sequence.length;i++){result.push(all_labels[this.note_sequence[i]])}return result}toString(){return"SCALE: "+this.root_note.note_name.type+": "+this.structure}}module.exports=Scale},{"@jasonfleischer/log":2}],9:[function(require,module,exports){const PianoView=require("./lib/piano_view.js");const log=require("@jasonfleischer/log");function pianoBuilder(options){this.id=options.id;if(this.id===undefined){log.e("id not provided for piano");return}this.pianoView=document.getElementById(this.id);if(this.pianoView===undefined){log.e("not piano exists with id: "+this.id);return}function isInt(value){var x=parseFloat(value);return!isNaN(value)&&(x|0)===x}this.range=options.range;if(this.range===undefined){this.range={min:21,max:108}}else{if(options.range.min!==undefined&&options.range.max!==undefined){if(isInt(options.range.min)){this.range.min=Math.min(Math.max(this.range.min,options.range.min),this.range.max)}if(isInt(options.range.max)){this.range.max=Math.min(Math.max(this.range.min,options.range.max),this.range.max)}}}this.width=1e3;if(options.width!==undefined){this.width=options.width}this.hover=false;if(options.hover!==undefined){this.hover=options.hover}let backgroundColor="#00000000";if(options.backgroundColor!==undefined){backgroundColor=options.backgroundColor}this.view=new PianoView(this.id,this.width,this.range,options.onClick,this.hover,backgroundColor);return this.view}module.exports=pianoBuilder},{"./lib/piano_view.js":10,"@jasonfleischer/log":2}],10:[function(require,module,exports){const musicKit=require("@jasonfleischer/music-model-kit");const log=require("@jasonfleischer/log");class PianoView{constructor(id="piano_view_id",width=1e3,range=musicKit.piano_range,onClick,hover=false,backgroundColor="#00000000"){this.id=id;this.BORDER_WIDTH=1;this.range=range;this.min_midi_value=range.min;this.max_midi_value=range.max;this.number_of_white_keys=0;this.number_of_black_keys=0;this.midi_value_to_piano_key_map={};this.hover=hover;this.backgroundColor=backgroundColor;var i;for(i=this.min_midi_value;i<=this.max_midi_value;i++){var note=musicKit.all_notes[i];if(!note.note_name.is_sharp_or_flat){this.number_of_white_keys++}else{this.number_of_black_keys++}}this.WIDTH=1e3;this.width=width;this.HEIGHT=this.calculateHeight(this.WIDTH,this.number_of_white_keys);this.buildCanvases();this.draw();this.resize(width);if(onClick!==undefined){this.addClickEventListeners(onClick)}if(this.hover){this.addHoverEventListeners()}}buildCanvases(){let width=this.WIDTH;let height=this.HEIGHT;let pianoView=document.getElementById(this.id);this.white_keys_canvas=this.buildCanvas(pianoView,"piano_white_keys_canvas_"+this.id,width,height);this.white_keys_drawing_canvas=this.buildCanvas(pianoView,"piano_white_keys_drawing_canvas_"+this.id,width,height);if(this.hover){this.white_keys_drawing_hover_canvas=this.buildCanvas(pianoView,"piano_white_keys_drawing_hover_canvas_"+this.id,width,height)}this.black_keys_canvas=this.buildCanvas(pianoView,"piano_black_keys_canvas_"+this.id,width,height);this.black_keys_drawing_canvas=this.buildCanvas(pianoView,"piano_black_keys_drawing_canvas_"+this.id,width,height);if(this.hover){this.black_keys_drawing_hover_canvas=this.buildCanvas(pianoView,"piano_black_keys_drawing_hover_canvas_"+this.id,width,height)}pianoView.style.backgroundColor=this.backgroundColor;pianoView.style.position="relative";pianoView.style.width=width+"px";pianoView.style.height=height+"px";pianoView.width=width;pianoView.height=height}buildCanvas(pianoView,id,width,height){var canvas=document.createElement("canvas");canvas.id=id;canvas.style.position="absolute";canvas.style.left="0px";canvas.style.right="0px";canvas.style.width=width+"px";canvas.style.height=height+"px";canvas.width=width;canvas.height=height;pianoView.appendChild(canvas);return canvas}resize(newWidth){let pianoView=document.getElementById(this.id);var newWidth=Math.min(newWidth,this.WIDTH);var newHeight=this.calculateHeight(newWidth,this.number_of_white_keys);pianoView.style.height=newHeight+"px";this.black_keys_canvas.style.height=newHeight+"px";this.black_keys_drawing_canvas.style.height=newHeight+"px";this.white_keys_canvas.style.height=newHeight+"px";this.white_keys_drawing_canvas.style.height=newHeight+"px";pianoView.style.width=newWidth+"px";this.black_keys_canvas.style.width=newWidth+"px";this.black_keys_drawing_canvas.style.width=newWidth+"px";this.white_keys_canvas.style.width=newWidth+"px";this.white_keys_drawing_canvas.style.width=newWidth+"px";if(this.hover){this.black_keys_drawing_hover_canvas.style.height=newHeight+"px";this.black_keys_drawing_hover_canvas.style.width=newWidth+"px";this.white_keys_drawing_hover_canvas.style.height=newHeight+"px";this.white_keys_drawing_hover_canvas.style.width=newWidth+"px"}}draw(){let white_key_width=Math.floor((this.WIDTH-(this.number_of_white_keys+1)*this.BORDER_WIDTH)/this.number_of_white_keys);this.white_key_height=Math.floor(white_key_width*5);var white_keys=[];var i;var x=this.BORDER_WIDTH+(this.WIDTH-(white_key_width+this.BORDER_WIDTH)*this.number_of_white_keys)/2;for(i=this.min_midi_value;i<=this.max_midi_value;i++){var note=musicKit.all_notes[i];if(!note.note_name.is_sharp_or_flat){let key=new PianoView.Key(x,this.BORDER_WIDTH,white_key_width,this.BORDER_WIDTH+this.white_key_height,note,"#fff");white_keys.push(key);this.midi_value_to_piano_key_map[note.midi_value]=key;x=x+white_key_width+this.BORDER_WIDTH}}var ctx=this.white_keys_canvas.getContext("2d");var j;for(j=0;j<white_keys.length;j++){var white_key=white_keys[j];white_key.draw(ctx)}var black_keys=[];var black_key_width=Math.floor(white_key_width*.6);var black_key_height=Math.floor(this.white_key_height*.67);var k;for(k=this.min_midi_value;k<=this.max_midi_value;k++){var note=musicKit.all_notes[k];if(note.note_name.is_sharp_or_flat){var flat_key=this.midi_value_to_piano_key_map[note.midi_value-1];var sharp_key=this.midi_value_to_piano_key_map[note.midi_value+1];if(flat_key!=undefined&&sharp_key!=undefined){var x=flat_key.x+this.BORDER_WIDTH+white_key_width-black_key_width/2;let key=new PianoView.Key(x,this.BORDER_WIDTH,black_key_width,black_key_height,note,"#333",true);black_keys.push(key);this.midi_value_to_piano_key_map[note.midi_value]=key}}}ctx=this.black_keys_canvas.getContext("2d");var l;for(l=0;l<black_keys.length;l++){var black_key=black_keys[l];black_key.draw(ctx)}}calculateHeight(width,number_of_white_keys){let white_key_width=Math.floor((width-(this.number_of_white_keys+1)*this.BORDER_WIDTH)/this.number_of_white_keys);return Math.ceil(white_key_width*5+this.BORDER_WIDTH*2)+1}clear(){this.black_keys_drawing_canvas.getContext("2d").clearRect(0,0,this.WIDTH,this.HEIGHT);this.white_keys_drawing_canvas.getContext("2d").clearRect(0,0,this.WIDTH,this.HEIGHT);var i;for(i=this.range.min;i<=this.range.max;i++){this.midi_value_to_piano_key_map[i].isOn=false}}clearNote(note){if(note==undefined){log.e("note is undefined");return}if(!note.isWithinRange(this.range)){log.i("note is out of range");return}let ctx=note.note_name.is_sharp_or_flat?this.black_keys_drawing_canvas.getContext("2d"):this.white_keys_drawing_canvas.getContext("2d");let key=this.midi_value_to_piano_key_map[note.midi_value];ctx.clearRect(key.x,key.y,key.width,key.height);key.isOn=false}clearHoverNote(note){let ctx=note.note_name.is_sharp_or_flat?this.black_keys_drawing_hover_canvas.getContext("2d"):this.white_keys_drawing_hover_canvas.getContext("2d");let key=this.midi_value_to_piano_key_map[note.midi_value];ctx.clearRect(key.x,key.y,key.width,key.height)}drawNote(note){if(note==undefined){log.e("note is undefined");return}this.drawNoteWithColor(note)}drawNoteWithColor(note,color=note.note_name.color){if(note==undefined){log.e("note is undefined");return}if(!note.isWithinRange(this.range)){log.i("note is out of range");return}var ctx=note.note_name.is_sharp_or_flat?this.black_keys_drawing_canvas.getContext("2d"):this.white_keys_drawing_canvas.getContext("2d");let key=this.midi_value_to_piano_key_map[note.midi_value];key.draw(ctx,color)}drawHoverNote(note){if(note==undefined){log.e("note is undefined");return}if(!note.isWithinRange(this.range)){log.i("note is out of range");return}var ctx=note.note_name.is_sharp_or_flat?this.black_keys_drawing_hover_canvas.getContext("2d"):this.white_keys_drawing_hover_canvas.getContext("2d");let color=note.note_name.is_sharp_or_flat?"#aaaaaaaa":"#33333333";let key=this.midi_value_to_piano_key_map[note.midi_value];key.draw(ctx,color)}drawInterval(interval){var play_type=interval.play_type;let higher_note=interval.getHigherNote(musicKit.all_notes);var first_note=play_type==musicKit.Interval.PLAY_TYPE.ASCENDING?interval.lower_note:higher_note;this.clear();this.drawNoteWithColor(first_note);setTimeout(()=>{var second_note=play_type==musicKit.Interval.PLAY_TYPE.ASCENDING?higher_note:interval.lower_note;this.drawNoteWithColor(second_note)},interval.play_type==musicKit.Interval.PLAY_TYPE.HARMONIC?0:interval.delay_in_ms)}drawChord(chord){this.clear();var note_array=chord.getNoteArray(musicKit.all_notes,this.range);var j;for(j=0;j<note_array.length;j++){var note=note_array[j];var label=chord.note_labels[j];if(label=="R"){this.drawNoteWithColor(note)}else{this.drawNoteWithColor(note,"#999")}}}drawScale(scale){this.clear();var note_array=scale.getNoteArray(musicKit.all_notes,this.range);var j;for(j=0;j<note_array.length;j++){var note=note_array[j];if(note.note_name.type==scale.root_note.note_name.type){this.drawNoteWithColor(note)}else{this.drawNoteWithColor(note,"#999")}}}addClickEventListeners(onClick){let pianoView=document.getElementById(this.id);pianoView.style.cursor="pointer";let range=this.range;let key_map=this.midi_value_to_piano_key_map;let width=this.width;let WIDTH=this.WIDTH;let self=this;pianoView.addEventListener("click",function(event){let position=self.getPosition(pianoView);let x=(event.clientX-position.x)*(WIDTH/width);let y=(event.clientY-position.y)*(WIDTH/width);var foundKey=self.findKey(key_map,range,x,y);if(foundKey==undefined){log.e("No key found on click")}else{foundKey.isOn=!foundKey.isOn;onClick(foundKey.note,foundKey.isOn)}})}addHoverEventListeners(){let pianoView=document.getElementById(this.id);pianoView.style.cursor="pointer";let range=this.range;let key_map=this.midi_value_to_piano_key_map;let width=this.width;let WIDTH=this.WIDTH;let self=this;var previousKey;pianoView.addEventListener("mouseover",event=>{previousKey=undefined});pianoView.addEventListener("mousemove",function(event){let position=self.getPosition(pianoView);let x=(event.clientX-position.x)*(WIDTH/width);let y=(event.clientY-position.y)*(WIDTH/width);var foundKey=self.findKey(key_map,range,x,y);if(foundKey!==undefined){if(previousKey===undefined){previousKey=foundKey;self.drawHoverNote(foundKey.note)}if(previousKey.note.midi_value!==foundKey.note.midi_value){self.clearHoverNote(previousKey.note);previousKey=foundKey;self.drawHoverNote(foundKey.note)}}});pianoView.addEventListener("mouseout",event=>{self.clearHoverNote(previousKey.note)})}getPosition(element){const rect=element.getBoundingClientRect();return{x:rect.left,y:rect.top}}findKey(key_map,range,x,y){var foundKey;var i;for(i=range.min;i<=range.max;i++){var key=key_map[i];if(key.isWithinBounds({x:x,y:y})){foundKey=key;if(key.isBlack){break}}}return foundKey}}PianoView.Key=class{constructor(x,y,width,height,note,color,isBlack=false){this.x=x;this.y=y;this.width=width;this.height=height;this.note=note;this.color=color;this.isBlack=isBlack;this.isOn=false}draw(ctx,color=this.color){ctx.beginPath();ctx.lineWidth=0;ctx.fillStyle=color;ctx.rect(this.x,this.y,this.width,this.height);ctx.fill();ctx.stroke();if(this.note.note_name.name=="C"&&this.note.octave==4){ctx.beginPath();ctx.arc(this.x+this.width/2,this.height-this.height*.1,this.width*.15,0,2*Math.PI,false);ctx.fillStyle="#666";ctx.fill()}}isWithinBounds(position){return position.x>=this.x&&position.x<=this.width+this.x&&position.y>=this.y&&position.y<=this.height+this.y}};module.exports=PianoView},{"@jasonfleischer/log":2,"@jasonfleischer/music-model-kit":3}]},{},[1]);