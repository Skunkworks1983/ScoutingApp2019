var counter;
function numberUp() {
  var counter = document.getElementById("autoCargoshipU");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown() {
  var counter = document.getElementById("autoCargoshipU");
  counter.setAttribute("value", parseInt(counter.value) - 1);
}

function numberUp2() {
  var counter = document.getElementById("acquiredC");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown2() {
  var counter = document.getElementById("acquiredC");
  counter.setAttribute("value", parseInt(counter.value) - 1);
}
function numberUp3() {
  var counter = document.getElementById("dropped");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown3() {
  var counter = document.getElementById("dropped");
  counter.setAttribute("value", parseInt(counter.value) - 1);
}

function numberUp(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > -1 && (parseInt(counter.value) < max || condition < 0)){
		counter.value = String(Number(counter.value) + condition);
	}
}
function numberDown(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > +1 && (parseInt(counter.value) > max || condition > 0)){
		counter.value = String(Number(counter.value) - condition);
	}
}

function numberUp2(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > -1 && (parseInt(counter.value) < max || condition < 0)){
		counter.value = String(Number(counter.value) + condition);
	}
}
function numberDown2(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > +1 && (parseInt(counter.value) > max || condition > 0)){
		counter.value = String(Number(counter.value) - condition);
	}
}

function numberUp3(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > -1 && (parseInt(counter.value) < max || condition < 0)){
		counter.value = String(Number(counter.value) + condition);
	}
}
function numberDown3(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > +1 && (parseInt(counter.value) > max || condition > 0)){
		counter.value = String(Number(counter.value) - condition);
	}
}
