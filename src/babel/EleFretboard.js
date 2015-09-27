import {FretboardAwesome} from "./FA/FretboardAwesome";

export class EleFretboard extends FretboardAwesome{
	constructor(){
		super();
	}

	init(domId){
		let orientation = document.getElementById(domId).dataset.orientation;
		let viewportSize = parseInt(document.getElementById(domId).dataset.viewport, 10);

		super.init(
			domId,
			["E","A","D","G","B","E"],
			"#",
			21,
			6,
			orientation,
			viewportSize
		);
		this.markInlays([3,5,7,9,12,15,17,19,21]);
		return this;
	}
}
