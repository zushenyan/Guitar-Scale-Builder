import {PCP} from "./PCP/pcp";

export class EleColorPicker extends PCP{
	constructor(){
		super();
		this._uiResetButton = null;
	}

	init(
		pcpId,
		resetButtonId,
		onSelectedEvent
	){
		super.init(pcpId, EleColorPicker.DEFAULT_PALETTE, EleColorPicker.DEFAULT_SELECTOR);
		this.addEventListener(onSelectedEvent);
		this._uiResetButton = document.getElementById(resetButtonId);
		this._uiResetButton.addEventListener("click", (e) => {
			this.setPalette(EleColorPicker.DEFAULT_PALETTE);
		});
		return this;
	}

	static encodeScale(eleColorPicker){
			let result = "";
			let palette = eleColorPicker.getPalette();
			for(let i = 0; i < palette.length; i++){
				result += palette[i].color;
				if(i !== palette.length - 1){
					result += "+";
				}
			}
			return result;
	}

	static decodeScale(encodedScale){
		let result = encodedScale.split("+");
		let palette = EleColorPicker.DEFAULT_PALETTE.slice(0, EleColorPicker.DEFAULT_PALETTE.length);
		for(let i = 0; i < palette.length; i++){
			let color = PCP.COLOR_NONE;
			if(result[i]){
				color = result[i];
			}
			palette[i].color = color;
		}
		return palette;
	}

	static get DEFAULT_PALETTE(){
		return [
			{label: "A",		color: PCP.COLOR_NONE},
			{label: "A#",	color: PCP.COLOR_NONE},
			{label: "B",		color: PCP.COLOR_NONE},
			{label: "C",		color: PCP.COLOR_NONE},
			{label: "C#",	color: PCP.COLOR_NONE},
			{label: "D",		color: PCP.COLOR_NONE},
			{label: "D#",	color: PCP.COLOR_NONE},
			{label: "E",		color: PCP.COLOR_NONE},
			{label: "F",		color: PCP.COLOR_NONE},
			{label: "F#",	color: PCP.COLOR_NONE},
			{label: "G",		color: PCP.COLOR_NONE},
			{label: "G#",	color: PCP.COLOR_NONE}
		];
	}

	static get DEFAULT_SELECTOR(){
		return [
			{label: "", color: PCP.COLOR_NONE},
			{label: "", color: "white"},
			{label: "", color: "lightgray"},
			{label: "", color: "gray"},
			{label: "", color: "lightblue"},
			{label: "", color: "blue"},
			{label: "", color: "royalblue"},
			{label: "", color: "lightgreen"},
			{label: "", color: "green"},
			{label: "", color: "red"},
			{label: "", color: "yellow"},
			{label: "", color: "lightyellow"}
		];
	}
}
