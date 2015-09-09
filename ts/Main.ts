class Main {
	KEYS;
	COLORS;
	FRETS;
	STRINGS;

	_idTuneSelects;

	_uiTuneSelects;

	constructor(){
		this.KEYS = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
		this.COLORS = ["color-none", "color-1", "color-2", "color-3", "color-4", "color-5", "color-6", "color-7", "color-8", "color-9", "color-10", "color-11"];
		this._idTuneSelects = ["s1", "s2", "s3", "s4", "s5", "s6"];
		this.FRETS = 15;
		this.STRINGS = 6;

		this.initUI();
	}

	initUI(){
		this.initUITuneSelects();
		this.initUIColorPicker();
		this.initUIKeySelects();
		this.initUIFretboard();

		this.initEvents();
	}

	initUITuneSelects(){
		for(let i = 0; i < this._idTuneSelects.length; i++){
			this.createOptionHelper(document.getElementById(this._idTuneSelects[i]), 0);
		}
	}

	initUIKeySelects(){
		this.createOptionHelper(document.getElementById("keys"), 0);
	}

	initUIColorPicker(){
		let cpContainer = document.querySelector("#color-picker .csb-colorpicker-container");
		let cpSelector = document.querySelector("#color-picker .csb-colorpicker-selector");

		// create <li> in .csb-colorpicker-container
		for(let i = 0; i < this.KEYS.length; i++){
			let li = document.createElement("li");
			let span = document.createElement("span");
			span.innerHTML = this.KEYS[i];
			li.className = this.COLORS[0];
			li.appendChild(span);
			cpContainer.appendChild(li);
		}

		for(let i = 0; i < this.COLORS.length; i++){
			let li = document.createElement("li");
			li.className = this.COLORS[i];
			cpSelector.appendChild(li);
		}
	}

	initEvents(){
		let cpContainerLi = document.querySelectorAll("#color-picker .csb-colorpicker-container li");
		let cpSelectorLi = document.querySelectorAll("#color-picker .csb-colorpicker-selector li");

		for(let i = 0; i < cpSelectorLi.length; i++){
			cpContainerLi[i].addEventListener("click", function(e){
				if(e.currentTarget.classList.contains("active-color")){
					e.currentTarget.classList.remove("active-color");
				}
				else{
					for(let i = 0; i < cpSelectorLi.length; i++){
						cpContainerLi[i].classList.remove("active-color");
					}
					e.currentTarget.classList.add("active-color");
				}
			});
		}

		for(let i = 0; i < cpSelectorLi.length; i++){
			cpSelectorLi[i].addEventListener("click", function(e){
				let activeColor = document.querySelector("#color-picker .active-color");
				activeColor.className = "";
				activeColor.classList.add("active-color");
				activeColor.classList.add(e.currentTarget.className);
			});
		}
	}

	initUIFretboard(){
		let fretboard = document.getElementById("fretboard");

		for(let i = 0; i < this.FRETS; i++){
		  let fretRow = document.createElement("ul");
		  fretRow.classList.add("gf-fret-row");

		  for(let j = 0; j < this.STRINGS; j++){
		    let fret = document.createElement("li");
		    if((i === 11) &&
		       (j === 0 || j === 4)){
		      fret.classList.add("gf-dot-mark");
		    }
		    else if(
		       (i !== 0) &&
		       (i !== 10) &&	// which is 11 fret
					 (i !== 12) &&	// which is 13 fret
		       (i % 2 === 0) &&
		       (j === 2)){
		      fret.classList.add("gf-dot-mark");
		    }
		    fretRow.appendChild(fret);
		  }
		  fretboard.appendChild(fretRow);
		}
	}

	createOptionHelper(parentEle, selectedIndex){
		for(let j = 0; j < this.KEYS.length; j++){
			let optionEle = document.createElement("option");
			optionEle.value = j.toString();
			optionEle.innerHTML = this.KEYS[j];
			if(j === 0){
				optionEle.setAttribute("selected", "selected");
			}
			parentEle.appendChild(optionEle);
		}
	}
}

window.onload = function(){ new Main(); };
