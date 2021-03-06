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
const TBAkey = "d4V33bAbuXiKfuLW1pc4BaLbr56BgiORtyM5hwmRLU5qNf6Rxh83noDdI0mPJJ3R";  // eventually this one should become user input
const TBAURL = "https://www.thebluealliance.com/api/v3/event/";
const rankingURL = "/rankings";
const matchesURL = "/matches/simple";

// get data from TBA
var rankings = new XMLHttpRequest();
var matches = new XMLHttpRequest();

// define JSON objects
let matchesObj;
let rankingsObj;

let printedResults = false;

// this function does all the other functions so only one button press is needed
function consolidated() {
  sendRequest();
  // eventually this timeout should be changed in detect when the HTTP requests finish
  // currently it just waits for 3 seconds
  setTimeout(function() {
    addTeams();
    showComplete();
  }, 3000);
}

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

// function that changes the submit button color for feedback
function changeButtonColor(id, color) {
  button = document.getElementById(id);
  button.style.backgroundColor = color;
}

// send the request now that the target has been determined
function sendRequest(target) {
  let cont = true;
  let check1 = false;
  let check2 = false;
  let startbutton = document.getElementById("startbutton");
  if(setTargetEvent() === "STOP") {
    cont = false;
    return "target not set";
  } else {
    // turn the button yellow to show that the request is in progress
    changeButtonColor("startbutton", "#fffa9b");
    // send rankings http request
    rankings.open("GET", TBAURL.concat(setTargetEvent() + rankingURL));
    rankings.setRequestHeader(TBAheader, TBAkey);
    rankings.send();
    rankings.onreadystatechange = function() {
      if(this.readyState === 4) {
        switch(this.status) {
            case 200:
              console.log("Ranking request completed successfully");
              rankingsObj = JSON.parse(rankings.responseText);
              check1 = true;
              changeButtonColor("startbutton", "#b7ffb4");
              break;

            case 401:
              console.warn("TBA API key is invalid");
              console.info("Enter a valid key (R)");
              changeButtonColor("startbutton", "#ffb5b5");
              alert("TBA API key is invalid; Enter a valid key por favor. Error 401 on rankings <-- for the tech support");
              break;

            case 404:
              console.info("Invalid URL");
              changeButtonColor("startbutton", "#ffb5b5");
              alert("Invalid URL entered. Error 404 on rankings <-- for the tech support");
              break;

            default:
              changeButtonColor("startbutton", "#ffb5b5");
              console.warn("Something wrong happened in rankings. This means the function went all the way through the switch without triggering any conditions");
              break;
        }
      }
    }
    // send matches http request
    matches.open("GET", TBAURL.concat(setTargetEvent() + matchesURL));
    matches.setRequestHeader(TBAheader, TBAkey);
    matches.send();
    matches.onreadystatechange = function() {
      if(this.readyState === 4) {
        switch (this.status) {
          case 200:
            console.log("Matches request completed successfully");
            matchesObj = JSON.parse(matches.responseText);
            check2 = true;
            changeButtonColor("startbutton", "#b7ffb4");
            break;

          case 401:
            console.warn("TBA key is invalid");
            console.info("Enter a valid API key (M)");
            changeButtonColor("startbutton", "#ffb5b5");
            alert("TBA API key is invalid; Enter a valid key por favor. Error 401 on matches <-- for the tech support");
            break;

          case 404:
            console.info("Invalid URL");
            changeButtonColor("startbutton", "#ffb5b5");
            alert("Invalid URL entered. Error 404 in matches <-- for the tech support");
            break;

          default:
            changeButtonColor("startbutton", "#ffb5b5");
            console.warn("Something wrong happened in matches");
            break;
        }
      }
    }
  }
}

// add values to table
function addTeams() {
  removePlayoffs();
  var i;
  for(i = 0; i < rankingsObj.rankings.length; i++) {
    team = parseInt(rankingsObj.rankings[i].team_key.substr(3), 10);
    points = rankingsObj.rankings[i].extra_stats[0];
    rank = rankingsObj.rankings[i];
    standing = i + 1;
    console.log(team + " is rank " + standing + " with " + points + " ranking points!");

    if(!document.getElementsByTagName) return;

    // now we are finding the table
    table = document.getElementsByTagName("tbody").item(0);

    // create a new row
    row = document.createElement("tr");
    row.setAttribute("id", team);

    // create some cells
    // give all of the cells that are not generated in this function a unique id so they can be changed later
    // this could be made easier with JQuery, witch has a function to find a child element, making this a lot easier
    standingcell = document.createElement("td");
    teamnocell = document.createElement("td");
    currentrankingscell = document.createElement("td");
    currentrankingscell.setAttribute("id", team + "currentRank");
    totalrankingscell = document.createElement("td");
    totalrankingscell.setAttribute("id", team + "predictedRank");
    teamstandingcell = document.createElement("td");
    teamstandingcell.setAttribute("id", team + "standing");

    // text nodes for each
    teamno = document.createTextNode(team);
    currentrankings = document.createTextNode(points);
    totalrankings = document.createTextNode("");
    teamstanding = document.createTextNode("");

    // add the text nodes to the cells
    standingcell.appendChild(document.createTextNode(standing))
    teamnocell.appendChild(teamno);
    currentrankingscell.appendChild(currentrankings);
    totalrankingscell.appendChild(totalrankings);
    teamstandingcell.appendChild(teamstanding);

    // append the cells to the row
    row.appendChild(standingcell);
    row.appendChild(teamnocell);
    row.appendChild(currentrankingscell);
    row.appendChild(totalrankingscell);
    row.appendChild(teamstandingcell);

    // append the row to the table
    table.appendChild(row);
  }
  printedResults = true;
  return "Done";
}

// reset the Page
function clearResults() {
  if(printedResults) {
    if(confirm("Do you really want to clear the results?")) {
      document.location.reload(false);
    }
  }
}

// add up all of the predictions
function aggregatePoints() {
  var i;
  var j;
  // array to store the score objects
  totalPoints = [];
  for(i = 0; i < rankingsObj.rankings.length; i++) {
    // ranking points
    points = 0;
    // get the team number in integer form
    team = parseInt(rankingsObj.rankings[i].team_key.substr(3), 10);
    // get the starting ranking points
    startingRP = parseInt(document.getElementById(team + "currentRank").innerHTML, 10);
    // add to Points
    points = points + startingRP;
    // add up all of the predicted points
    predictions = document.getElementsByClassName(team);
    for(j = 0; j < predictions.length; j++) {
      points = points + parseInt(predictions[j].value, 10);
    }
    // object to store the team scores
    tempObj = {
      teamno: team,
      points: points
    };
    // add to points array
    totalPoints.push(tempObj);

    // print the results to the table
    // find the cells
    cell = document.getElementById(team + "predictedRank");
    // change the inner HTML to the total Points
    cell.innerHTML = String(points);
  }
  sortRankings();
  finalizeRankings();
}

// this function adds the final rankings of the teams
function finalizeRankings() {
  var k;
  for(k = 0; k < finalRankings.length; k++) {
    // get the team number
    team = parseInt(finalRankings[k].teamno, 10);
    // get the cell
    cell = document.getElementById(team + "standing");
    // add the rank
    cell.innerHTML = String(k+1);
  }
}

// this function removes any playoff matches
function removePlayoffs() {
  matchesObj = matchesObj.filter(result => result.comp_level === "qm");
  matchesObj = matchesObj.sort((a, b) => a.match_number - b.match_number);
}

// sort the final predicted rankings
function sortRankings() {
  finalRankings = totalPoints.sort((a, b) => b.points - a.points);
}

function showComplete() {
  removePlayoffs();
  var i;
  var j;
  var k;
  for(i = 0; i < matchesObj.length; i++) {
    // red team
    red1 = parseInt(matchesObj[i].alliances.red.team_keys[0].substr(3), 10);
    red2 = parseInt(matchesObj[i].alliances.red.team_keys[1].substr(3), 10);
    red3 = parseInt(matchesObj[i].alliances.red.team_keys[2].substr(3), 10);

    // blue team
    blue1 = parseInt(matchesObj[i].alliances.blue.team_keys[0].substr(3), 10);
    blue2 = parseInt(matchesObj[i].alliances.blue.team_keys[1].substr(3), 10);
    blue3 = parseInt(matchesObj[i].alliances.blue.team_keys[2].substr(3), 10);

    if(!document.getElementsByTagName) return;

    // find the table
    table = document.getElementsByTagName("tbody").item(1);

    // create a new row
    row = document.createElement("tr");

    // create the cells
    cellmn = document.createElement("td");
    cellr1 = document.createElement("td");
    cellr2 = document.createElement("td");
    cellr3 = document.createElement("td");
    cellb1 = document.createElement("td");
    cellb2 = document.createElement("td");
    cellb3 = document.createElement("td");
    rpr = document.createElement("td");
    rpb = document.createElement("td");

    // give cells their class
    // rpr.setAttribute();
    // rpb.setAttribute();

    // create the text that will go inside
    match_no = document.createTextNode(matchesObj[i].match_number);
    cellr1_t = document.createTextNode(red1);
    cellr2_t = document.createTextNode(red2);
    cellr3_t = document.createTextNode(red3);
    cellb1_t = document.createTextNode(blue1);
    cellb2_t = document.createTextNode(blue2);
    cellb3_t = document.createTextNode(blue3);
    rpr_t = document.createElement("input");
    rpb_t = document.createElement("input");

    // give the inputs their own attributes so we can find them and add them ups
    rpr_t.setAttribute("type", "number");
    rpr_t.setAttribute("required", "");
    rpr_t.setAttribute("max", 4);
    rpr_t.setAttribute("min", 0);
    rpr_t.setAttribute("class", "redform" + " " + red1 + " " + red2 + " " + red3);
    rpr_t.setAttribute("name", "Red Input Box");
    rpr_t.setAttribute("value", 0);
    rpb_t.setAttribute("type", "number");
    rpb_t.setAttribute("required", "");
    rpb_t.setAttribute("max", 4);
    rpb_t.setAttribute("min", 0);
    rpb_t.setAttribute("class", "blueform" + " " + blue1 + " " + blue2 + " " + blue3);
    rpb_t.setAttribute("name", "Blue Input Box");
    rpb_t.setAttribute("value", 0);

    // add the text nodes to the cells
    cellmn.appendChild(match_no);
    cellr1.appendChild(cellr1_t);
    cellr2.appendChild(cellr2_t);
    cellr3.appendChild(cellr3_t);
    cellb1.appendChild(cellb1_t);
    cellb2.appendChild(cellb2_t);
    cellb3.appendChild(cellb3_t);
    rpr.appendChild(rpr_t);
    rpb.appendChild(rpb_t);

    // add the cells to the row
    row.appendChild(cellmn);
    row.appendChild(cellr1);
    row.appendChild(cellr2);
    row.appendChild(cellr3);
    row.appendChild(cellb1);
    row.appendChild(cellb2);
    row.appendChild(cellb3);
    row.appendChild(rpr);
    row.appendChild(rpb);

    // add the row to the table
    table.appendChild(row);
  }
  printedResults = true;
  return "Done";
}

window.addEventListener('load', function() {
  console.log("loaded up");
});

// hidden at the button because its a disgrace
// determine how many matches each team has left
function showIncomplete() { // use the .insertBefore(insert, between); method to insert the new columns in the right place
  // TODO: finish the last part
  // WARNING: function is not complete
  console.warn("function is not done yet, just calculate which matches haven't been played yet yourself bruv");
}
