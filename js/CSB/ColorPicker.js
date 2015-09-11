define(["require", "exports", "./MusicConst"], function (require, exports, MusicConst_1) {
    var ColorPicker = (function () {
        function ColorPicker(id, eventRegister, colorList) {
            if (id === void 0) { id = "color-picker"; }
            this.DOM_ID = id;
            this._eventRegister = eventRegister;
            this._colorList = colorList;
            this.createUI();
            this.registerEvent();
        }
        ColorPicker.prototype.createUI = function () {
            var uiCpContainer = document.getElementById(this.DOM_ID), uiCpPalette = document.createElement("ul"), uiCpSelector = document.createElement("ul"), uiNoColorLi = document.createElement("li"), uiLi, uiSpan;
            uiCpPalette.classList.add("cp-palette");
            uiCpSelector.classList.add("cp-selector");
            uiNoColorLi.style.backgroundColor = "white";
            uiNoColorLi.classList.add("color-disabled");
            uiCpSelector.appendChild(uiNoColorLi);
            for (var i = 0; i < MusicConst_1.MusicConst.KEYS.length; i++) {
                uiLi = document.createElement("li");
                uiSpan = document.createElement("span");
                uiSpan.innerHTML = MusicConst_1.MusicConst.KEYS[i];
                uiLi.classList.add("color-disabled");
                uiLi.appendChild(uiSpan);
                uiCpPalette.appendChild(uiLi);
            }
            for (var i = 0; i < this._colorList.length; i++) {
                uiLi = document.createElement("li");
                uiLi.style.backgroundColor = this._colorList[i];
                uiLi.classList.add("color-enabled");
                uiCpSelector.appendChild(uiLi);
            }
            uiCpContainer.appendChild(uiCpPalette);
            uiCpContainer.appendChild(uiCpSelector);
        };
        ColorPicker.prototype.registerEvent = function () {
            var uiCpPaletteLi = document.querySelectorAll("#" + this.DOM_ID + " .cp-palette li"), uiCpSelectorLi = document.querySelectorAll("#" + this.DOM_ID + " .cp-selector li");
            for (var i = 0; i < uiCpPaletteLi.length; i++) {
                uiCpPaletteLi[i].addEventListener("click", function (e) {
                    if (e.currentTarget.classList.contains("active-color")) {
                        e.currentTarget.classList.remove("active-color");
                    }
                    else {
                        for (var i_1 = 0; i_1 < uiCpPaletteLi.length; i_1++) {
                            uiCpPaletteLi[i_1].classList.remove("active-color");
                        }
                        e.currentTarget.classList.add("active-color");
                    }
                });
            }
            for (var i = 0; i < uiCpSelectorLi.length; i++) {
                var that = this;
                uiCpSelectorLi[i].addEventListener("click", function (e) {
                    var currentActive = document.querySelector("#" + that.DOM_ID + " .active-color");
                    currentActive.style.backgroundColor = e.currentTarget.style.backgroundColor;
                    currentActive.className = "";
                    currentActive.classList.add("active-color");
                    currentActive.classList.add(e.currentTarget.className);
                    if (that._eventRegister) {
                        that._eventRegister.colorPickerRun(that.getCurrentColorset());
                    }
                });
            }
        };
        ColorPicker.prototype.getCurrentColorset = function () {
            var uiCpPaletteLi = document.querySelectorAll("#" + this.DOM_ID + " .cp-palette li"), colorset = [];
            for (var i = 0; i < uiCpPaletteLi.length; i++) {
                var classList = uiCpPaletteLi[i].classList, colorDisabled = false;
                for (var j = 0; j < classList.length; j++) {
                    if (classList[j] === ColorPicker.COLOR_DISABLED) {
                        colorDisabled = true;
                        break;
                    }
                }
                var result = colorDisabled ? ColorPicker.COLOR_DISABLED : uiCpPaletteLi[i].style.backgroundColor;
                colorset.push(result);
            }
            return colorset;
        };
        Object.defineProperty(ColorPicker, "COLOR_DISABLED", {
            get: function () { return "color-disabled"; },
            enumerable: true,
            configurable: true
        });
        return ColorPicker;
    })();
    exports.ColorPicker = ColorPicker;
});
