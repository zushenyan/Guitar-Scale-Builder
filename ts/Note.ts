export class Note {
	_noteName;
	_highlight;
	_color;

	constructor(note, color = "white"){
		this.setNoteName(note);
		this.setColor(color);
		this.highlightOff();
	}

	// only takes "#" sharp as a standard, it doesn't take "b"
	setNoteName(note) {
		this._noteName = Note.normalize(note);
	}

	getNoteName(){ return this._noteName; }

	highlightOn(){ this._highlight = true; }
	highlightOff(){ this._highlight = false; }

	isHighlighted(){ return this._highlight; }

	setColor(color){ this._color = color; }
	getColor(){ return this._color; }

	// Normalize a note. For example, notes like "B#, E#..." will be all normalized to "C, F...".
	static normalize(note){
		if(typeof note !== "string" && !(note instanceof String)){
			throw new TypeError("argument note is not type of string: " + note);
		}
		if(!Note.testNote(note)){
			throw "note: " + note + " is not an acceptable pattern.";
		}
		note = note.toUpperCase();
		if(note === "B#"){
			return "C";
		}
		else if(note === "E#"){
			return "F";
		}
		return note;
	}

	static testNote(note){
		if(typeof note !== "string" && !(note instanceof String)){
			throw new TypeError("argument note is not type of string: " + note);
		}
		return Note.NOTE_REGEXP.test(note);
	}

	static get NOTE_REGEXP(){ return /^[a-g|A-G]#?/;}
}
