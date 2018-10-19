// App goals:
// get an event code from the user in a textbox - done
// take the TBA match and ranking data for that code - done
// sort by team number
// add them to the input table
// calculate the number of matches left to play for each team
// add the appropriate number of columns, each with an input element where the predictions can be entered, and with their team number as an ID
// add one final column where the total number of rankings points (both predictions and the actual) are added together

// urls
const TBAheader = "X-TBA-Auth-Key";
const TBAkey = "d4V33bAbuXiKfuLW1pc4BaLbr56BgiORtyM5hwmRLU5qNf6Rxh83noDdI0mPJJ3R";
const TBAURL = "https://www.thebluealliance.com/api/v3/event/";
// const teamURL = "/teams/simple";
const rankingURL = "/rankings";
const matchesURL = "/matches/simple";

// get data from TBA

var rankings = new XMLHttpRequest();
// var teams = new XMLHttpRequest();
var matches = new XMLHttpRequest();

// define JSON objects
let matchesObj;
let rankingsObj;

// define the target URL

function setTargetEvent() {
  // let target = this.value;
  if(document.getElementById("eventName").value === "ex: 2018wapp") {
    console.log("Please enter an event name");
    return "STOP";
  } else {
    let target = document.getElementById("eventName").value;
    console.log("target code is " + target);
    return target;
  }
}

// send the request now that the target has been determined

function sendRequest(target) {
  let cont = true;
  if(setTargetEvent() === "STOP") {
    cont = false;
    return "target not set";
  } else {
  rankings.open("GET", TBAURL.concat(setTargetEvent() + rankingURL));
  rankings.setRequestHeader(TBAheader, TBAkey);
  rankings.send();
  rankings.onreadystatechange = function() {
    if(this.readyState === 4) {
    switch(this.status) {
      case 200:
        console.log("Ranking request completed successfully");
        rankingsObj = JSON.parse(rankings.responseText);
        break;

      case 401:
        console.log("TBA API key is invalid");
        console.log("Enter a valid key (R)");
        alert("TBA API key is invalid; Enter a valid key por favor. Error 401 on rankings <-- for the tech support");
        break;

      case 404:
        console.log("Invalid URL");
        alert("Invalid URL entered. Error 404 on rankings <-- for the tech support");
        break;

      default:
        console.log("Something wrong happened in rankings. This means the function went all the way through the switch without triggering any conditions");
        break;
    }
    }
  }

  matches.open("GET", TBAURL.concat(setTargetEvent() + matchesURL));
  matches.setRequestHeader(TBAheader, TBAkey);
  matches.send();
  matches.onreadystatechange = function() {
    if(this.readyState === 4) {
    switch (this.status) {
      case 200:
        console.log("Matches request completed successfully");
        matchesObj = JSON.parse(matches.responseText);
        break;

      case 401:
        console.log("TBA key is invalid");
        console.log("Enter a valid API key (M)");
        alert("TBA API key is invalid; Enter a valid key por favor. Error 401 on matches <-- for the tech support");
        break;

      case 404:
        console.log("Invalid URL");
        alert("Invalid URL entered. Error 404 in matches <-- for the tech support");
        break;

      default:
        console.log("Something wrong happened in matches");
        break;
    }
    }
  }
  }
}

// sort the teams once they have been recieved, and match the team numbers and rankings

function sortMatches() {
  matchesObj.match_number.sort(function(a, b){return a - b})
}

// we don't need to sort the rankings because they are given to us in order
// function sortRankings() {
//   rankingsObj.rankings.team_key.sort(function(a, b){return a - b});
// }

// function that creates the text input box for the match predictions

function addTextBox() {
  var textBox = document.createElement("input")
  this.appendChild(textBox);
  this.setAttribute(required, "");
  this.setAttribute(type, "string");
  // this.setAttribute(class, "t");
  // this.setAttribute();
}

// determine how many matches each team has left

function matchesLeft() { // use the .insertBefore(insert, between); method to insert the new columns in the right place

}

// add values to table

function addTeams() {

}

// add up all of the predictions and

function aggregatePoints() {

}

// isolate the necessary parts: team numbers, ranking points,

window.addEventListener('load', function() {
  console.log("loaded up");
});

// var run = function() { // first find target url, then get http, then find matches remaining, total
//   sendRequest(setTargetEvent());
// }
