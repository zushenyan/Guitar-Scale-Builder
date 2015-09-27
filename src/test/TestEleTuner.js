var selectedOptions = ["E", "A", "D", "G"];

var a;
a = new gsb.EleTuner().init("tuner", selectedOptions, function(e){
	console.log("meow");
});
console.log(a);
