define(["require", "exports", "./Note", "./MusicConst"], function (require, exports, Note_1, MusicConst_1) {
    var Fretboard = (function () {
        function Fretboard(tuning, fretNumber) {
            this.generateFretboard(tuning, fretNumber);
        }
        Fretboard.prototype.setFretNumber = function (fretNumber) {
            if (fretNumber === void 0) { fretNumber = 14; }
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
            if (tuning === void 0) { tuning = MusicConst_1.MusicConst.STANDARD_TUNING; }
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
        Fretboard.prototype.generateFretboard = function (tuning, fretNumber) {
            this.setTuning(tuning);
            this.setFretNumber(fretNumber);
            this._fretboard = [];
            for (var stringIndex = 0; stringIndex < this._tuning.length; stringIndex++) {
                var string = [], startingNoteIndex = MusicConst_1.MusicConst.KEYS.indexOf(this._tuning[stringIndex].getNoteName()), currentIndex = void 0, counter = void 0;
                for (counter = 0; counter < this.getFretNumber(); counter++) {
                    currentIndex = (startingNoteIndex + counter) % MusicConst_1.MusicConst.KEYS.length;
                    string.push(new Note_1.Note(MusicConst_1.MusicConst.KEYS[currentIndex]));
                }
                this._fretboard.push(string);
            }
            return this.getFretboard();
        };
        Fretboard.prototype.getFretboard = function () {
            return this._fretboard;
        };
        // specifiy what notes should be hightlighted.
        // pass array in.
        // array patter - [new Node("E", "blue"), new Node("G", "yellow"), new Node("F")...]
        Fretboard.prototype.highlightNotes = function (scale) {
            if (!(scale instanceof Array)) {
                throw new TypeError("scale should be type of array: " + scale);
            }
            this.resetHighlight();
            for (var i = 0; i < this._fretboard.length; i++) {
                for (var j = 0; j < this._fretboard[i].length; j++) {
                    for (var ni = 0; ni < scale.length; ni++) {
                        if (this._fretboard[i][j].getNoteName() === scale[ni].getNoteName()) {
                            this._fretboard[i][j].highlightOn();
                            this._fretboard[i][j].setColor(scale[ni].getColor());
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
});
