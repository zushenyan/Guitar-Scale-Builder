var Note_1 = require("./Note");
var MusicConst_1 = require("./MusicConst");
var Fretboard = (function () {
    function Fretboard(tuning, fretNumber) {
        this.setTuning(tuning);
        this.setFretNumber(fretNumber);
    }
    Fretboard.prototype.setFretNumber = function (fretNumber) {
        if (typeof fretNumber !== "number") {
            throw new TypeError("fretNumber should be type of number: " + fretNumber);
        }
        else if (fretNumber < 0) {
            throw "fretNumber can not be negtive: " + fretNumber;
        }
        this._fretNumber = fretNumber;
    };
    Fretboard.prototype.getFretNumber = function () { return this._fretNumber; };
    Fretboard.prototype.setTuning = function (tuning) {
        if (!(tuning instanceof Array)) {
            throw new TypeError("tuning should be type of array: " + tuning);
        }
        this._tuning = [];
        for (var i = 0; i < tuning.length; i++) {
            var note = new Note_1.Note(tuning[i]);
            this._tuning.push(note);
        }
    };
    Fretboard.prototype.getTuning = function () { return this._tuning; };
    Fretboard.prototype.generateFretboard = function () {
        if (!this._tuning) {
            throw "tuning is not initiated: " + this._tuning;
        }
        if (!this._fretNumber) {
            throw "fretNumber is not initiated: " + this._fretNumber;
        }
        this._fretboard = [];
        for (var stringIndex = 0; stringIndex < this._tuning.length; stringIndex++) {
            var string = [], startingNoteIndex = MusicConst_1.MusicConst.MAJOR_SCALE.indexOf(this._tuning[stringIndex].getNote()), currentIndex = void 0, counter = void 0;
            for (counter = 0; counter < this.getFretNumber(); counter++) {
                currentIndex = (startingNoteIndex + counter) % MusicConst_1.MusicConst.MAJOR_SCALE.length;
                string.push(new Note_1.Note(MusicConst_1.MusicConst.MAJOR_SCALE[currentIndex]));
            }
            this._fretboard.push(string);
        }
    };
    Fretboard.prototype.getFretboard = function () {
        return this._fretboard;
    };
    // specifiy what notes should be hightlighted.
    // pass array in.
    // array patter - ["E", "C#", "D"...]
    Fretboard.prototype.highlightNotes = function (notes) {
        if (!this._fretboard) {
            throw "_fretboard is not initiated: " + this.getFretboard();
        }
        if (!(notes instanceof Array)) {
            throw new TypeError("notes should be type of array: " + notes);
        }
        this.resetHighlight();
        for (var i = 0; i < notes.length; i++) {
            notes[i] = Note_1.Note.normalize(notes[i]);
        }
        for (var i = 0; i < this._fretboard.length; i++) {
            for (var j = 0; j < this._fretboard[i].length; j++) {
                for (var ni = 0; ni < notes.length; ni++) {
                    if (this._fretboard[i][j].getNote() === notes[ni]) {
                        this._fretboard[i][j].highlightOn();
                    }
                }
            }
        }
    };
    Fretboard.prototype.resetHighlight = function () {
        for (var i = 0; i < this._fretboard.length; i++) {
            for (var j = 0; j < this._fretboard[i].length; j++) {
                this._fretboard[i][j].highlightOff();
            }
        }
    };
    return Fretboard;
})();
exports.Fretboard = Fretboard;
var a = new Fretboard(MusicConst_1.MusicConst.STANDARD_TUNING, 12);
a.generateFretboard();
a.highlightNotes(["D", "E#", "G"]);
console.log(a.getFretboard());
console.log("meow!");
a.highlightNotes(["A", "C", "E"]);
console.log(a.getFretboard());
