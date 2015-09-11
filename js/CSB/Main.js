define(["require", "exports", "./GuitarFretboard", "./ColorPicker", "./MusicConst", "./Note"], function (require, exports, GuitarFretboard_1, ColorPicker_1, MusicConst_1, Note_1) {
    var Main = (function () {
        function Main() {
            var scale = [
                new Note_1.Note("A"),
                new Note_1.Note("B"),
                new Note_1.Note("C"),
                new Note_1.Note("D"),
                new Note_1.Note("E"),
                new Note_1.Note("F"),
                new Note_1.Note("G")
            ];
            this._guitarFretboard = new GuitarFretboard_1.GuitarFretboard(MusicConst_1.MusicConst.STANDARD_TUNING, 14);
            this._colorPicker1 = new ColorPicker_1.ColorPicker("color-picker1", this, ["white", "aqua", "orange", "coral", "brown", "beige"]);
        }
        Main.prototype.colorPickerRun = function (colorset) {
            var scale = [];
            for (var i = 0; i < colorset.length; i++) {
                if (colorset[i] !== ColorPicker_1.ColorPicker.COLOR_DISABLED) {
                    scale.push(new Note_1.Note(MusicConst_1.MusicConst.KEYS[i], colorset[i]));
                }
            }
            this._guitarFretboard.highlightScale(scale);
        };
        return Main;
    })();
    new Main();
});
