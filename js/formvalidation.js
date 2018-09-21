
while(false) {
const eventcode = document.getElementById("eventcode");
const matchno = document.getElementById("matchno")
// red ids
const red1 = document.getElementById("red1");
const red2 = document.getElementById("red2");
const red3 = document.getElementById("red3");
// blue ids
const blue1 = document.getElementById("blue1");
const blue2 = document.getElementById("blue2");
const blue3 = document.getElementById("blue3");
// make sure this loop doesn't run too much

}

// this document is for validating the form and writing the results to the local storage
function errorMessage() {
  console.log("The TBA API is either offline or there is no available match schedule for the given event, so we need to manually input the match schedule");
};

// function persistInput(input)
// {
//   var key = "input-" + input.id;
//
//   var storedValue = localStorage.getItem(key);
//
//   if (storedValue)
//       input.value = storedValue;
//
//   input.addEventListener('input', function ()
//   {
//       localStorage.setItem(key, input.value);
//   });
// }
//
// persistInput(eventcode);

// JSON objects will be stored in the local storage containing the inputted match schedule
// One JSON object for each event
// then the match no and the teams in order are put into an array
// TODO: figure out how the actual TBA API serves up the JSON object containing the match data
// Once we figure that out, we construct our JSON object to mimic that of the TBA API
// for some reason Patrick was still using the v2 API

// test JSON objects
testObj = {"eventname":"2018wapp", "match":[1,2], "red1":[254,6969], "red2":[118,420], "red3":[1983,7005], "blue1":[168,999], "blue2":[7005,666], "blue3":[5803,69]}

// for the final version of the JSON object we should nest multiple objects inside of each other, so that we can store all events in a single JSON object to simplify the code necessary for the implementation of viewSchedule

// add loop here that cycles the match numbers

// let total = testObj.match.length;
function testJSON() {
  var i;
  let schedule;
  console.log("event is: " + testObj.eventname);
  for (i=0; i <= (testObj.match.length-1); i++) {
    schedule = [testObj.match[i], testObj.red1[i], testObj.red2[i], testObj.red3[i], testObj.blue1[i], testObj.blue2[i], testObj.blue3[i]];

    console.log(schedule);
  }
}


// function that validates the submitted match schedule
// it works using a checksum
function submitSchedule() {
  let checksum = 0;
  var conditions = 6;
  switch (matchno >= 1 && matchno <= 200) {
    case red1 <= 9999 && red1 >= 1:
      checksum++;
      console.log(checksum);

    case red2 <= 9999 && red2 >= 1:
      checksum++;
      console.log(checksum);

    case red3 <= 9999 && red3 >= 1:
      checksum++;
      console.log(checksum);

    case blue1 <= 9999 && blue1 >= 1:
      checksum++;
      console.log(checksum);

    case blue2 <= 9999 && blue2 >= 1:
      checksum++;
      console.log(checksum);

    case blue3 <= 9999 && blue3 >= 1:
      checksum++;
      console.log(checksum);
      
    // default:
    //   return true;
  }

  // checks to see if all conditions are satisfied
  if(checksum <= conditions) {
    return true;
  } else {
    return false;
  }
}
