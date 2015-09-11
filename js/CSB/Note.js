define(["require", "exports"], function (require, exports) {
    var Note = (function () {
        function Note(note, color) {
            if (color === void 0) { color = "white"; }
            this.setNoteName(note);
            this.setColor(color);
            this.highlightOff();
        }
        // only takes "#" sharp as a standard, it doesn't take "b"
        Note.prototype.setNoteName = function (note) {
            this._noteName = Note.normalize(note);
        };
        Note.prototype.getNoteName = function () { return this._noteName; };
        Note.prototype.highlightOn = function () { this._highlight = true; };
        Note.prototype.highlightOff = function () { this._highlight = false; };
        Note.prototype.isHighlighted = function () { return this._highlight; };
        Note.prototype.setColor = function (color) { this._color = color; };
        Note.prototype.getColor = function () { return this._color; };
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
});
