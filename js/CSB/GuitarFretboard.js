define(["require", "exports", "./MusicConst", "./Fretboard"], function (require, exports, MusicConst_1, Fretboard_1) {
    var GuitarFretboard = (function () {
        function GuitarFretboard(tuning, fretNumber, scale) {
            if (tuning === void 0) { tuning = MusicConst_1.MusicConst.STANDARD_TUNING; }
            if (fretNumber === void 0) { fretNumber = 14; }
            if (scale === void 0) { scale = []; }
            this.DOM_ID = "gf-fretboard";
            this._fretboard = new Fretboard_1.Fretboard(tuning, fretNumber);
            this.highlightScale(scale);
        }
        GuitarFretboard.prototype.createUI = function () {
            var uiFretboard = document.getElementById(this.DOM_ID), fretNumber = this._fretboard.getFretNumber(), strings = this._fretboard.getTuning().length;
            uiFretboard.innerHTML = ""; // clear all elements
            for (var currentFretRow = 0; currentFretRow < fretNumber; currentFretRow++) {
                var uiFretRow = document.createElement("ul");
                uiFretRow.classList.add("gf-fret-row");
                for (var currentString = 0; currentString < strings; currentString++) {
                    var uiNote = document.createElement("div");
                    var uiNoteChar = document.createElement("span");
                    var note = this._fretboard.getFretboard()[currentString][currentFretRow];
                    uiNoteChar.innerHTML = note.getNoteName();
                    uiNote.classList.add("gf-note");
                    if (!note.isHighlighted()) {
                        uiNote.classList.toggle("hide");
                    }
                    uiNote.style.backgroundColor = note.getColor();
                    uiNote.appendChild(uiNoteChar);
                    var uiFret = document.createElement("li");
                    uiFret.appendChild(uiNote);
                    var shiftRow = currentFretRow - 1; // shifting the frets because the first row is an open row.
                    if ((shiftRow === 11) &&
                        (currentString === 0 || currentString === 4)) {
                        uiFret.classList.add("gf-dot-mark");
                    }
                    else if ((shiftRow !== 0) &&
                        (shiftRow !== 10) &&
                        (shiftRow !== 12) &&
                        (shiftRow % 2 === 0) &&
                        (currentString === 2)) {
                        uiFret.classList.add("gf-dot-mark");
                    }
                    uiFretRow.appendChild(uiFret);
                }
                uiFretboard.appendChild(uiFretRow);
            }
        };
        GuitarFretboard.prototype.adjustFretboard = function (tuning, number, scale) {
            if (tuning === void 0) { tuning = MusicConst_1.MusicConst.STANDARD_TUNING; }
            if (number === void 0) { number = 14; }
            if (scale === void 0) { scale = []; }
            this._fretboard.generateFretboard(tuning, number);
            this.highlightScale(scale);
        };
        GuitarFretboard.prototype.highlightScale = function (scale) {
            this._fretboard.highlightNotes(scale);
            this.createUI();
        };
        return GuitarFretboard;
    })();
    exports.GuitarFretboard = GuitarFretboard;
});
