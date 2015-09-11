import {GuitarFretboard} from "./GuitarFretboard";
import {ColorPicker} from "./ColorPicker";
import {MusicConst} from "./MusicConst";
import {Note} from "./Note";

class Main {
	_guitarFretboard;
	_colorPicker1;
	_colorPicker2;

	constructor(){
		let scale = [
			new Note("A"),
			new Note("B"),
			new Note("C"),
			new Note("D"),
			new Note("E"),
			new Note("F"),
			new Note("G")
		];

		this._guitarFretboard = new GuitarFretboard(MusicConst.STANDARD_TUNING, 14);
		this._colorPicker1 = new ColorPicker("color-picker1", this, ["white", "aqua", "orange", "coral", "brown", "beige"]);
	}

	colorPickerRun(colorset){
		let scale = [];

		for(let i = 0; i < colorset.length; i++){
			if(colorset[i] !== ColorPicker.COLOR_DISABLED){
				scale.push(new Note(MusicConst.KEYS[i], colorset[i]));
			}
		}

		this._guitarFretboard.highlightScale(scale);
	}
}

new Main();
