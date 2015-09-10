import {Note} from "./Note";
import {MusicConst} from "./MusicConst";

export class Fretboard {
	_fretNumber;
	_fretboard;
	_tuning;

	constructor(tuning, fretNumber){
		this.setTuning(tuning);
		this.setFretNumber(fretNumber);
	}

	setFretNumber(fretNumber){
		if(typeof fretNumber !== "number"){
			throw new TypeError("fretNumber should be type of number: "+ fretNumber);
		}
		else if(fretNumber < 0){
			throw "fretNumber can not be negtive: " + fretNumber;
		}
		this._fretNumber = fretNumber;
	}

	getFretNumber(){ return this._fretNumber; }

	setTuning(tuning){
		if(!(tuning instanceof Array)){
			throw new TypeError("tuning should be type of array: " + tuning);
		}
		this._tuning = [];
		for(let i = 0; i < tuning.length; i++){
			let note = new Note(tuning[i]);
			this._tuning.push(note);
		}
	}

	getTuning(){ return this._tuning; }

	generateFretboard(){
		if(!this._tuning){ throw "tuning is not initiated: " + this._tuning; }
		if(!this._fretNumber){ throw "fretNumber is not initiated: " + this._fretNumber; }

		this._fretboard = [];

		for(let stringIndex = 0; stringIndex < this._tuning.length; stringIndex++){
			let string = [],
					startingNoteIndex = MusicConst.MAJOR_SCALE.indexOf(this._tuning[stringIndex].getNote()),
					currentIndex,
					counter;
			for(counter = 0; counter < this.getFretNumber(); counter++){
				currentIndex = (startingNoteIndex + counter) % MusicConst.MAJOR_SCALE.length;
				string.push(new Note(MusicConst.MAJOR_SCALE[currentIndex]));
			}
			this._fretboard.push(string);
		}
	}

	getFretboard(){
		return this._fretboard;
	}

	// specifiy what notes should be hightlighted.
	// pass array in.
	// array patter - ["E", "C#", "D"...]
	highlightNotes(notes){
		if(!this._fretboard){
			throw "_fretboard is not initiated: " + this.getFretboard();
		}
		if(!(notes instanceof Array)){
			throw new TypeError("notes should be type of array: " + notes);
		}
		this.resetHighlight();
		for(let i = 0; i < notes.length; i++){
			notes[i] = Note.normalize(notes[i]);
		}

		for(let i = 0; i < this._fretboard.length; i++){
			for(let j = 0; j < this._fretboard[i].length; j++){
				for(let ni = 0; ni < notes.length; ni++){
					if(this._fretboard[i][j].getNote() === notes[ni]){
						this._fretboard[i][j].highlightOn();
					}
				}
			}
		}
	}

	resetHighlight(){
		for(let i = 0; i < this._fretboard.length; i++){
			for(let j = 0; j < this._fretboard[i].length; j++){
				this._fretboard[i][j].highlightOff();
			}
		}
	}
}
