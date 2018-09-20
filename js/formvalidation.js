// this document is for validating the form and writing the results to the local storage
function errorMessage() {
  console.log("The TBA API is either offline or there is no available match schedule for the given event, so we need to manually input the match schedule");
};

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
  var i = 0;
  let schedule;
  console.log("event is: " + testObj.eventname);
  for (i=0; i <= (testObj.match.length-1); i++) {
    schedule = [testObj.match[i], testObj.red1[i], testObj.red2[i], testObj.red3[i], testObj.blue1[i], testObj.blue2[i], testObj.blue3[i]];

    console.log(schedule);
  }
}
