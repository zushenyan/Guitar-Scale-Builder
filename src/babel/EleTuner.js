export class EleTuner{
	constructor(){
		this._domId = "";
		this._onChangedEvent = null;

		this._uiSelections = [];
		this._uiMainContainer = null;
	}

	init(
		domId,
		onChangedEvent){

		this._domId = domId;
		this._onChangedEvent = onChangedEvent;
		this._uiMainContainer = document.getElementById(this.getDomId());
		for(let i = 0; i < EleTuner.SELECTIONS; i++){
			let ele = makeSelectElement(EleTuner.SELECTION_ID + i.toString());
			ele.addEventListener("change", (e) => {
				this._onChangedEvent(this.getSelected());
			});
			ele.classList.add("form-control");
			this._uiSelections.push(ele);
			this._uiMainContainer.appendChild(ele);
		}
		this.setSelected(EleTuner.DEFAULT_SELECTED);
		return this;

		function makeSelectElement(selectionId){
			let select = document.createElement("select");
			select.id = selectionId;
			for(let i = 0; i < EleTuner.OPTIONS.length; i++){
				let option = document.createElement("option");
				option.value = EleTuner.OPTIONS[i].value;
				option.appendChild(document.createTextNode(EleTuner.OPTIONS[i].name));
				select.appendChild(option);
			}
			return select;
		}
	}

	/**
		@param {array} options - format should be ["E", "None", "B#"...].
	*/
	setSelected(options){
		for(let i = 0; i < this._uiSelections.length; i++){
			for(let j = 0; j < EleTuner.OPTIONS.length; j++){
				if(options[i] === EleTuner.OPTIONS[j].name){
					this._uiSelections[i].children[j].setAttribute("selected", true);
				}
			}
		}
		this._onChangedEvent(this.getSelected());
	}

	getSelected(){
		let result = [];
		for(let i = 0; i < this._uiSelections.length; i++){
			let index = this._uiSelections[i].value;
			result.push(EleTuner.OPTIONS[index].name);
		}
		return result;
	}

	getOnchangeEvent(){ return this._onChangedEvent; }
	getDomId(){ return this._domId; }

	getEleSelections(){ return this._uiSelections; }
	getEle(){ return this._uiMainContainer; }

	static encodeTuning(eleTuner){
		let result = "";
		let sels = eleTuner.getEleSelections();
		for(let i = 0; i < sels.length; i++){
			result += parseInt(sels[i].value, 10).toString(16);
		}
		return result;
	}

	static decodeTuning(encodedTuning){
		if(!(/([0-9]|[a-c]){6}/.test(encodedTuning))){
			return EleTuner.DEFAULT_SELECTED;
		}
		let result = [];
		for(let i = 0; i < encodedTuning.length; i++){
			let index = parseInt(encodedTuning[i], 16);
			result.push(EleTuner.OPTIONS[index].name);
		}
		return result;
	}

	static get DEFAULT_SELECTED(){ return ["E", "A", "D", "G", "B", "E"]; }
	static get SELECTION_ID(){ return "key"; }
	static get SELECTIONS(){ return 6; }
	static get OPTIONS(){
		return [
			{name: "None",	value: 0},
			{name: "A", 		value: 1},
			{name: "A#",		value: 2},
			{name: "B", 		value: 3},
			{name: "C", 		value: 4},
			{name: "C#", 		value: 5},
			{name: "D", 		value: 6},
			{name: "D#", 		value: 7},
			{name: "E", 		value: 8},
			{name: "F", 		value: 9},
			{name: "F#", 		value: 10},
			{name: "G", 		value: 11},
			{name: "G#", 		value: 12}
		];
	}
}
