var Main = (function () {
    function Main() {
        this.KEYS = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        this.COLORS = ["color-none", "color-1", "color-2", "color-3", "color-4", "color-5", "color-6", "color-7", "color-8", "color-9", "color-10", "color-11"];
        this._idTuneSelects = ["s1", "s2", "s3", "s4", "s5", "s6"];
        this.FRETS = 15;
        this.STRINGS = 6;
        this.initUI();
    }
    Main.prototype.initUI = function () {
        this.initUITuneSelects();
        this.initUIColorPicker();
        this.initUIKeySelects();
        this.initUIFretboard();
        this.initEvents();
    };
    Main.prototype.initUITuneSelects = function () {
        for (var i = 0; i < this._idTuneSelects.length; i++) {
            this.createOptionHelper(document.getElementById(this._idTuneSelects[i]), 0);
        }
    };
    Main.prototype.initUIKeySelects = function () {
        this.createOptionHelper(document.getElementById("keys"), 0);
    };
    Main.prototype.initUIColorPicker = function () {
        var cpContainer = document.querySelector("#color-picker .csb-colorpicker-container");
        var cpSelector = document.querySelector("#color-picker .csb-colorpicker-selector");
        for (var i = 0; i < this.KEYS.length; i++) {
            var li = document.createElement("li");
            var span = document.createElement("span");
            span.innerHTML = this.KEYS[i];
            li.className = this.COLORS[0];
            li.appendChild(span);
            cpContainer.appendChild(li);
        }
        for (var i = 0; i < this.COLORS.length; i++) {
            var li = document.createElement("li");
            li.className = this.COLORS[i];
            cpSelector.appendChild(li);
        }
    };
    Main.prototype.initEvents = function () {
        var cpContainerLi = document.querySelectorAll("#color-picker .csb-colorpicker-container li");
        var cpSelectorLi = document.querySelectorAll("#color-picker .csb-colorpicker-selector li");
        for (var i = 0; i < cpSelectorLi.length; i++) {
            cpContainerLi[i].addEventListener("click", function (e) {
                if (e.currentTarget.classList.contains("active-color")) {
                    e.currentTarget.classList.remove("active-color");
                }
                else {
                    for (var i_1 = 0; i_1 < cpSelectorLi.length; i_1++) {
                        cpContainerLi[i_1].classList.remove("active-color");
                    }
                    e.currentTarget.classList.add("active-color");
                }
            });
        }
        for (var i = 0; i < cpSelectorLi.length; i++) {
            cpSelectorLi[i].addEventListener("click", function (e) {
                var activeColor = document.querySelector("#color-picker .active-color");
                activeColor.className = "";
                activeColor.classList.add("active-color");
                activeColor.classList.add(e.currentTarget.className);
            });
        }
    };
    Main.prototype.initUIFretboard = function () {
        var fretboard = document.getElementById("fretboard");
        for (var i = 0; i < this.FRETS; i++) {
            var fretRow = document.createElement("ul");
            fretRow.classList.add("gf-fret-row");
            for (var j = 0; j < this.STRINGS; j++) {
                var fret = document.createElement("li");
                if ((i === 11) &&
                    (j === 0 || j === 4)) {
                    fret.classList.add("gf-dot-mark");
                }
                else if ((i !== 0) &&
                    (i !== 10) &&
                    (i !== 12) &&
                    (i % 2 === 0) &&
                    (j === 2)) {
                    fret.classList.add("gf-dot-mark");
                }
                fretRow.appendChild(fret);
            }
            fretboard.appendChild(fretRow);
        }
    };
    Main.prototype.createOptionHelper = function (parentEle, selectedIndex) {
        for (var j = 0; j < this.KEYS.length; j++) {
            var optionEle = document.createElement("option");
            optionEle.value = j.toString();
            optionEle.innerHTML = this.KEYS[j];
            if (j === 0) {
                optionEle.setAttribute("selected", "selected");
            }
            parentEle.appendChild(optionEle);
        }
    };
    return Main;
})();
window.onload = function () { new Main(); };
