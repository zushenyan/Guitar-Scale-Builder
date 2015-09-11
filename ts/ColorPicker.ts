import {MusicConst} from "./MusicConst";

export class ColorPicker {
	DOM_ID;
	COLOR_CLASS;

	_eventRegister;
	_colorList;

	constructor(id = "color-picker", eventRegister, colorList){
		this.DOM_ID = id;
		this._eventRegister = eventRegister;
		this._colorList = colorList;

		this.createUI();
		this.registerEvent();
	}

	createUI(){
		let uiCpContainer = document.getElementById(this.DOM_ID),
				uiCpPalette = document.createElement("ul"),
				uiCpSelector = document.createElement("ul"),
				uiNoColorLi = document.createElement("li"),
				uiLi, uiSpan;

		uiCpPalette.classList.add("cp-palette");
		uiCpSelector.classList.add("cp-selector");

		uiNoColorLi.style.backgroundColor = "white";
		uiNoColorLi.classList.add("color-disabled");
		uiCpSelector.appendChild(uiNoColorLi);

		for(let i = 0; i < MusicConst.KEYS.length; i++){
			uiLi = document.createElement("li");
			uiSpan = document.createElement("span");

			uiSpan.innerHTML = MusicConst.KEYS[i];
			uiLi.classList.add("color-disabled");
			uiLi.appendChild(uiSpan);
			uiCpPalette.appendChild(uiLi);
		}

		for(let i = 0; i < this._colorList.length; i++){
			uiLi = document.createElement("li");
			uiLi.style.backgroundColor = this._colorList[i];
			uiLi.classList.add("color-enabled");
			uiCpSelector.appendChild(uiLi);
		}

		uiCpContainer.appendChild(uiCpPalette);
		uiCpContainer.appendChild(uiCpSelector);
	}

	registerEvent(){
		let uiCpPaletteLi = document.querySelectorAll("#" + this.DOM_ID + " .cp-palette li"),
				uiCpSelectorLi = document.querySelectorAll("#" + this.DOM_ID + " .cp-selector li");

		for(let i = 0; i < uiCpPaletteLi.length; i++){
			uiCpPaletteLi[i].addEventListener("click", function(e){
				if(e.currentTarget.classList.contains("active-color")){
					e.currentTarget.classList.remove("active-color");
				}
				else{
					for(let i = 0; i < uiCpPaletteLi.length; i++){
						uiCpPaletteLi[i].classList.remove("active-color");
					}
					e.currentTarget.classList.add("active-color");
				}
			});
		}

		for(let i = 0; i < uiCpSelectorLi.length; i++){
			var that = this;
			uiCpSelectorLi[i].addEventListener("click", function(e){
				let currentActive = document.querySelector("#" + that.DOM_ID + " .active-color");
				currentActive.style.backgroundColor = e.currentTarget.style.backgroundColor;
				currentActive.className = "";
				currentActive.classList.add("active-color");
				currentActive.classList.add(e.currentTarget.className);
				if(that._eventRegister){
					that._eventRegister.colorPickerRun(that.getCurrentColorset());
				}
			});
		}
	}

	getCurrentColorset(){
		let uiCpPaletteLi = document.querySelectorAll("#" + this.DOM_ID + " .cp-palette li"),
				colorset = [];

		for(let i = 0; i < uiCpPaletteLi.length; i++){
			let classList = uiCpPaletteLi[i].classList,
					colorDisabled = false;
			for(let j = 0; j < classList.length; j++){
				if(classList[j] === ColorPicker.COLOR_DISABLED){
					colorDisabled = true;
					break;
				}
			}
			let result = colorDisabled ? ColorPicker.COLOR_DISABLED : uiCpPaletteLi[i].style.backgroundColor;
			colorset.push(result);
		}

		return colorset;
	}

	static get COLOR_DISABLED(){ return "color-disabled"; }
}
