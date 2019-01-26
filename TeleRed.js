var counter;
function numberUp() {
  var counter = document.getElementById("CargoCollected");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown() {
  var counter = document.getElementById("CargoCollected");
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


function numberUp2() {
  var counter = document.getElementById("HatchesCollected");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown2() {
  var counter = document.getElementById("HatchesCollected");
  counter.setAttribute("value", parseInt(counter.value) - 1);
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

function numberUp3() {
  var counter = document.getElementById("Floor");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown3() {
  var counter = document.getElementById("Floor");
  counter.setAttribute("value", parseInt(counter.value) - 1);
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

function numberUp4() {
  var counter = document.getElementById("DeployCargo1");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown4() {
  var counter = document.getElementById("DeployCargo1");
  counter.setAttribute("value", parseInt(counter.value) - 1);
}



function numberUp4(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > -1 && (parseInt(counter.value) < max || condition < 0)){
		counter.value = String(Number(counter.value) + condition);
	}
}
function numberDown4(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > +1 && (parseInt(counter.value) > max || condition > 0)){
		counter.value = String(Number(counter.value) - condition);
	}
}

function numberUp5() {
  var counter = document.getElementById("DeployCargo2");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown5() {
  var counter = document.getElementById("DeployCargo2");
  counter.setAttribute("value", parseInt(counter.value) - 1);
}



function numberUp5(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > -1 && (parseInt(counter.value) < max || condition < 0)){
		counter.value = String(Number(counter.value) + condition);
	}
}
function numberDown5(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > +1 && (parseInt(counter.value) > max || condition > 0)){
		counter.value = String(Number(counter.value) - condition);
	}
}


function numberUp6() {
  var counter = document.getElementById("DeployCargo3");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown6() {
  var counter = document.getElementById("DeployCargo3");
  counter.setAttribute("value", parseInt(counter.value) - 1);
}



function numberUp6(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > -1 && (parseInt(counter.value) < max || condition < 0)){
		counter.value = String(Number(counter.value) + condition);
	}
}
function numberDown6(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > +1 && (parseInt(counter.value) > max || condition > 0)){
		counter.value = String(Number(counter.value) - condition);
	}
}

function numberUp7() {
  var counter = document.getElementById("dropped");
  counter.setAttribute("value", parseInt(counter.value) + 1);

}
function numberDown7() {
  var counter = document.getElementById("dropped");
  counter.setAttribute("value", parseInt(counter.value) - 1);
}



function numberUp7(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > -1 && (parseInt(counter.value) < max || condition < 0)){
		counter.value = String(Number(counter.value) + condition);
	}
}
function numberDown7(field, condition, max){
	var counter = document.getElementById(field);
	if(Number(counter.value) + condition > +1 && (parseInt(counter.value) > max || condition > 0)){
		counter.value = String(Number(counter.value) - condition);
	}
}
