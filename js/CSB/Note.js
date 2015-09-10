var Note = (function () {
    function Note(note) {
        this.setNote(note);
        this.highlightOff();
    }
    // only takes "#" sharp as a standard, it doesn't take "b"
    Note.prototype.setNote = function (note) {
        this._note = Note.normalize(note);
    };
    Note.prototype.getNote = function () { return this._note; };
    Note.prototype.highlightOn = function () { this._highlight = true; };
    Note.prototype.highlightOff = function () { this._highlight = false; };
    Note.prototype.getHighlight = function () { return this._highlight; };
    // Normalize a note. For example, notes like "B#, E#..." will be all normalized to "C, F...".
    Note.normalize = function (note) {
        if (typeof note !== "string" && !(note instanceof String)) {
            throw new TypeError("argument note is not type of string: " + note);
        }
        if (!Note.testNote(note)) {
            throw "note: " + note + " is not an acceptable pattern.";
        }
        note = note.toUpperCase();
        if (note === "B#") {
            return "C";
        }
        else if (note === "E#") {
            return "F";
        }
        return note;
    };
    Note.testNote = function (note) {
        if (typeof note !== "string" && !(note instanceof String)) {
            throw new TypeError("argument note is not type of string: " + note);
        }
        return Note.NOTE_REGEXP.test(note);
    };
    Object.defineProperty(Note, "NOTE_REGEXP", {
        get: function () { return /^[a-g|A-G]#?/; },
        enumerable: true,
        configurable: true
    });
    return Note;
})();
exports.Note = Note;
