import {EleFretboard} from "./EleFretboard";
import {EleColorPicker} from "./EleColorPicker";
import {EleTuner} from "./EleTuner";
import {EleSharePanel} from "./EleSharePanel";

export class GSBManager{
	constructor(){
		this._eleTuner = null;
		this._eleColorPicker = null;
		this._eleFretboard = null;
		this._eleSharePanel = null;
	}

	init(tunerId, pcpId, resetButtonId, faId, shareInputId, copyButtonId){
		this._eleFretboard = new EleFretboard().init(faId);
		this._eleTuner = new EleTuner().init(tunerId, this.onTunerChanged.bind(this));
		this._eleColorPicker = new EleColorPicker().init(pcpId, resetButtonId, this.onColorPicked.bind(this));
		this._eleSharePanel = new EleSharePanel().init(shareInputId, copyButtonId);
		this.generateShareURL();
		this.addPageEvent();
		return this;
	}

	onTunerChanged(tuning){
		let newTuning = tuning.filter((value) => {
			if(value !== "None"){
				return value;
			}
		});
		if(this._eleFretboard && this._eleSharePanel){
			this._eleFretboard.setTuning(newTuning);
			this.generateShareURL();
		}
	}

	onColorPicked(e){
		let oldColorSet = e.colorSet;
		let newColorSet = [];
		for(let i = 0; i < oldColorSet.length; i++){
			if(oldColorSet[i].color !== EleColorPicker.COLOR_NONE){
				let set = {
					key: oldColorSet[i].label,
					color: oldColorSet[i].color
				}
				newColorSet.push(set);
			}
		}
		if(this._eleFretboard && this._eleSharePanel){
			this._eleFretboard.markKeys(newColorSet);
			this.generateShareURL();
		}
	}

	generateShareURL(){
		let tuning = "tuning=" + EleTuner.encodeTuning(this._eleTuner);
		let scale = "scale=" + EleColorPicker.encodeScale(this._eleColorPicker);
		let url = window.location.origin + window.location.pathname + "?" + tuning + "&" + scale + "#";
		this._eleSharePanel.updateURL(url);
	}

	addPageEvent(){
		document.addEventListener("DOMContentLoaded", (e) => {
			let args = parseURL(window.location.search);
			if(args){
				args["tuning"] = args["tuning"] ?
					EleTuner.decodeTuning(args["tuning"]) :
					EleTuner.decodeTuning("");
				args["scale"] = args["scale"] ?
					EleColorPicker.decodeScale(args["scale"]) :
					EleColorPicker.decodeScale("");
				this._eleTuner.setSelected(args["tuning"]);
				this._eleColorPicker.setPalette(args["scale"]);
			}
		});

		function parseURL(url){
			let queryStart = url.indexOf("?") + 1,
					queryEnd = url.indexOf("#") + 1 || url.length + 1,
					query = url.slice(queryStart, queryEnd),
					pairs = query.split("&"),
					args = {};
			if(typeof url !== "string" || query === ""){ return; }
			for(let i = 0; i < pairs.length; i++){
				let input = pairs[i].split("=");
				let key = decodeURIComponent(input[0]);
				let value = decodeURIComponent(input[1]);
				args[key] = value;
			}
			return args;
		}
	}
}
