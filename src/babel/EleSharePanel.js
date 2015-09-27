export class EleSharePanel{
	constructor(){
		this._uiInput = null;
		this._uiCopyButton = null;
	}

	init(inputId, copyButtonId){
		this._uiInput = document.getElementById(inputId);
		this._uiCopyButton = document.getElementById(copyButtonId);
		if(this._uiCopyButton){
			this._uiCopyButton.addEventListener("click", (e) => {
				this._uiInput.select();
				document.execCommand("copy");
			});
		}
		return this;
	}

	updateURL(text){
		this._uiInput.value = text;
	}

	getInput(){ return this._uiInput; }
	getCopyButton(){ return this._uiCopyButton; }
}
