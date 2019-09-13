// variables
var i;
var j;
var k;
// make a get request to fetch this
var scoutList = [
  'Ethan',
  'Brien David',
  'Anthony',
  'Ian',
  'Ryan',
  'Joel',
  'Evan',
  'Benji',
  'Kevin',
  'Alex K',
  'Jimmy',
  'Sam',
  'Ryan',
  'Dillon',
  'Marco',
  'Kai',
  'Enzo',
  'Kyle',
  'Alex L',
  'Ian',
  'Ryan',
  'Joel',
  'Evan',
  'Kyle',
  'Caleb',
  'Nathan H',
  'Nathan M',
  'Other Nathan'
];
var buttons;
var verify = false;
var meme;
var holdTimer;
var teamNumber;

// interval for hue shifting
const interval = 750;
let degree = 0;

// urls
const TBAheader = "X-TBA-Auth-Key";
const TBAkey = "d4V33bAbuXiKfuLW1pc4BaLbr56BgiORtyM5hwmRLU5qNf6Rxh83noDdI0mPJJ3R"; // eventually this one should become user input
const TBAURL = "https://www.thebluealliance.com/api/v3/event/";
const matchesURL = "/matches/simple";
const DEBUG = true;
var path;
if (DEBUG) {
  path = "http://127.0.0.1:3000/data/";
} else {
  path = "http://73.109.240.48:1983/data/";
}

// get data from TBA
var matches = new XMLHttpRequest();
// define JSON objects
let matchObj;
// verify HTTP requests
let verifyHTTP = false;

// send data to server


// page scroll positions
page = {
  settings: 0,
  settings_alt: 1,
  event: window.innerWidth,
  event_alt: window.innerWidth + 2,
  sandstorm: window.innerWidth * 2,
  sandstorm_alt: window.innerWidth * 2 + 2,
  teleop: window.innerwidth * 3,
  teleop_alt: window.innerWidth * 3 + 2,
};

currentData = {
  "eventName": "", // string
  "matchNumber": 1, // int
  "alliance": "Red", // red or blue
  "teamNumber": 0, // int
  "driverPosition": 1, // int
  "noShow": false, // boolean
  "startPos": 1, // int
  "scoutName": "", // string
  "sandStorm": {
    "crossLine": false, // boolean
    "deadBot": false, // boolean
    "rocket": {
      "level1": {
        "hatch": 0, // int
        "cargo": 0 // int 
      },
      "level2": {
        "hatch": 0, // int
        "cargo": 0 // int
      },
      "level3": {
        "hatch": 0, // int
        "cargo": 0 // int
      }
    },
    "ship": {
      "hatch": 0, // int
      "cargo": 0 // int
    },
    "retrieved": {
      "hatch": 0, // int
      "cargo": 0 // int
    },
    "dropped": {
      "hatch": 0, // int
      "cargo": 0 // int
    }
  },
  "teleOp": {
    "obscured": {
      "rocket": {
        "level1": {
          "hatch": 0, // int
          // "cargo": 0 // int
        },
        "level2": {
          "hatch": 0, // int
          // "cargo": 0 // int
        },
        "level3": {
          "hatch": 0, // int
          // "cargo": 0 // int
        }
      },
      "ship": {
        "hatch": 0, // int
        "cargo": 0 // int
      }
    },
    "unobscured": {
      "rocket": {
        "level1": {
          "hatch": 0, // int
          "cargo": 0 // int
        },
        "level2": {
          "hatch": 0, // int
          "cargo": 0 // int
        },
        "level3": {
          "hatch": 0, // int
          "cargo": 0 // int
        }
      },
      "ship": {
        "hatch": 0, // int
        "cargo": 0 // int
      }
    },
    "retrieved": {
      "loading": {
        "hatch": 0, // int
        "cargo": 0 // int
      },
      "floor": {
        "hatch": 0, // int
        "cargo": 0 // int
      }
    },
    "dropped": {
      "hatch": 0, // int
      "cargo": 0 // int
    },
    "climbLevel": 0, // int
    "assistedClimb": false, // boolean
    "recievedClimb": false, // boolean
    "deadBot": false, // boolean
  }
}
try {
  function grabMatch() {

  }
} catch (err) {
  alert('The event schedule has not been defined!');
}

// write data to local storage
function setCurrentData() {
  eventData = JSON.parse(localStorage.eventData);
  // eventData = localStorage.eventData;
  currentData.eventName = matchObj[0].event_key;
  currentData.matchNumber = parseInt(localStorage.matchNumber, 10);
  currentData.alliance = getAlliance();
  currentData.teamNumber = getTeamNumber();
  currentData.driverPosition = getStation();
  currentData.scoutName = localStorage.scoutName;
  // get start pos
  switch ($('input[name="startPos"]:checked').attr('id')) {
    case 'startPos1':
      currentData.startPos = 1;
      break;

    case 'startPos2':
      currentData.startPos = 2;
      break;
  }
  // sandstorm 
  currentData.sandStorm.crossLine = document.getElementById('sandStorm.crossLine').checked;
  // get presence
  if ($('input[name="presence"]:checked') === null) {
    currentData.noShow = false;
    currentData.sandStorm.deadBot = false;
  } else if ($('input[name="presence"]:checked').attr('id') === 'noShow') {
    currentData.noShow = true;
    currentData.sandStorm.deadBot = false;
  } else if ($('input[name="presence"]:checked').attr('id') === 'sandStorm.deadBot') {
    currentData.noShow = false;
    currentData.sandStorm.deadBot = true;
  }
  // rocket
  currentData.sandStorm.rocket.level1.hatch = parseInt(document.getElementById('sandStorm.rocket.level1.hatch').innerHTML, 10);
  currentData.sandStorm.rocket.level1.cargo = parseInt(document.getElementById('sandStorm.rocket.level1.cargo').innerHTML, 10);
  currentData.sandStorm.rocket.level2.hatch = parseInt(document.getElementById('sandStorm.rocket.level2.hatch').innerHTML, 10);
  currentData.sandStorm.rocket.level2.cargo = parseInt(document.getElementById('sandStorm.rocket.level2.cargo').innerHTML, 10);
  currentData.sandStorm.rocket.level3.hatch = parseInt(document.getElementById('sandStorm.rocket.level3.hatch').innerHTML, 10);
  currentData.sandStorm.rocket.level3.cargo = parseInt(document.getElementById('sandStorm.rocket.level3.cargo').innerHTML, 10);
  // ship
  currentData.sandStorm.ship.hatch = parseInt(document.getElementById('sandStorm.ship.hatch').innerHTML, 10);
  currentData.sandStorm.ship.cargo = parseInt(document.getElementById('sandStorm.ship.cargo').innerHTML, 10);
  // retrieved 
  currentData.sandStorm.retrieved.hatch = parseInt(document.getElementById('sandStorm.retrieved.hatch').innerHTML, 10);
  currentData.sandStorm.retrieved.cargo = parseInt(document.getElementById('sandStorm.retrieved.cargo').innerHTML, 10);
  // dropped
  currentData.sandStorm.dropped.hatch = parseInt(document.getElementById('sandStorm.dropped.hatch').innerHTML, 10);
  currentData.sandStorm.dropped.cargo = parseInt(document.getElementById('sandStorm.dropped.cargo').innerHTML, 10);
  // teleop
  // obscured
  // rocket
  currentData.teleOp.obscured.rocket.level1.hatch = parseInt(document.getElementById('teleOp.obscured.rocket.level1.hatch').innerHTML, 10);
  // currentData.teleOp.obscured.rocket.level1.cargo = parseInt(document.getElementById('teleOp.obscured.rocket.level1.cargo').innerHTML, 10);
  currentData.teleOp.obscured.rocket.level2.hatch = parseInt(document.getElementById('teleOp.obscured.rocket.level2.hatch').innerHTML, 10);
  // currentData.teleOp.obscured.rocket.level2.cargo = parseInt(document.getElementById('teleOp.obscured.rocket.level2.cargo').innerHTML, 10);
  currentData.teleOp.obscured.rocket.level3.hatch = parseInt(document.getElementById('teleOp.obscured.rocket.level3.hatch').innerHTML, 10);
  // currentData.teleOp.obscured.rocket.level3.cargo = parseInt(document.getElementById('teleOp.obscured.rocket.level3.cargo').innerHTML, 10);
  // ship
  currentData.teleOp.obscured.ship.hatch = parseInt(document.getElementById('teleOp.obscured.ship.hatch').innerHTML, 10);
  currentData.teleOp.obscured.ship.cargo = parseInt(document.getElementById('teleOp.obscured.ship.cargo').innerHTML, 10);
  // unobscured
  // rocket
  currentData.teleOp.unobscured.rocket.level1.hatch = parseInt(document.getElementById('teleOp.unobscured.rocket.level1.hatch').innerHTML, 10);
  currentData.teleOp.unobscured.rocket.level1.cargo = parseInt(document.getElementById('teleOp.unobscured.rocket.level1.cargo').innerHTML, 10);
  currentData.teleOp.unobscured.rocket.level2.hatch = parseInt(document.getElementById('teleOp.unobscured.rocket.level2.hatch').innerHTML, 10);
  currentData.teleOp.unobscured.rocket.level2.cargo = parseInt(document.getElementById('teleOp.unobscured.rocket.level2.cargo').innerHTML, 10);
  currentData.teleOp.unobscured.rocket.level3.hatch = parseInt(document.getElementById('teleOp.unobscured.rocket.level3.hatch').innerHTML, 10);
  currentData.teleOp.unobscured.rocket.level3.cargo = parseInt(document.getElementById('teleOp.unobscured.rocket.level3.cargo').innerHTML, 10);
  // ship
  currentData.teleOp.unobscured.ship.hatch = parseInt(document.getElementById('teleOp.unobscured.ship.hatch').innerHTML, 10);
  currentData.teleOp.unobscured.ship.cargo = parseInt(document.getElementById('teleOp.unobscured.ship.cargo').innerHTML, 10);
  // retrieved
  currentData.teleOp.retrieved.loading.hatch = parseInt(document.getElementById('teleOp.retrieved.loading.hatch').innerHTML, 10);
  currentData.teleOp.retrieved.loading.cargo = parseInt(document.getElementById('teleOp.retrieved.loading.cargo').innerHTML, 10);
  currentData.teleOp.retrieved.floor.hatch = parseInt(document.getElementById('teleOp.retrieved.floor.hatch').innerHTML, 10);
  currentData.teleOp.retrieved.floor.cargo = parseInt(document.getElementById('teleOp.retrieved.floor.cargo').innerHTML, 10);
  // dropped
  currentData.teleOp.dropped.hatch = parseInt(document.getElementById('teleOp.dropped.hatch').innerHTML, 10);
  currentData.teleOp.dropped.cargo = parseInt(document.getElementById('teleOp.dropped.cargo').innerHTML, 10);

  // check for deadbot
  if ($('#teleOp.deadBot:checked') === null) {
    currentData.teleOp.deadBot = false;
  } else {
    currentData.teleOp.deadBot = true;
  }

  // check for assisted climb
  if ($('#teleOp.assistedClimb:checked') === null) {
    currentData.teleOp.assistedClimb = false;
  } else {
    currentData.teleOp.assistedClimb = true;
  }

  // check for recieved climb
  if ($('#teleOp.recievedClimb:checked') === null) {
    currentData.teleOp.recievedClimb = false;
  } else {
    currentData.teleOp.recievedClimb = true;
  }

  // determine the climb level
  switch ($('input[name="HAB"]:checked').attr('id')) {
    case 'teleOp.climbLevel3':
      currentData.teleOp.climbLevel = 3;
      break;

    case 'teleOp.climbLevel2':
      currentData.teleOp.climbLevel = 2;
      break;

    case 'teleOp.climbLevel1':
      currentData.teleOp.climbLevel = 1;
      break;

    case 'teleOp.climbLevel0':
      currentData.teleOp.climbLevel = 0;
      break;

    default:
      currentData.teleOp.climbLevel = -1;
      break;
  }

  // set currentData to localStorage
  eventData.push(currentData);
  localStorage.setItem('eventData', JSON.stringify(eventData));
  window.location.href = 'selection.html';
}

// determine what alliance the tablet is
function getAlliance() {
  switch (parseInt(localStorage.station, 10)) {
    case 1:
    case 2:
    case 3:
      return ('red');
    case 4:
    case 5:
    case 6:
      return ('blue');
  }
}

// determine what station the tablet is
function getStation() {
  switch (parseInt(localStorage.station, 10)) {
    case 1:
    case 4:
      return (1);
    case 2:
    case 5:
      return (2);
    case 3:
    case 6:
      return (3);
  }
}

// grabs the team number
// should be called after tempStorage is run
function getTeamNumber() {
  console.log('looking for team number');
  matchObj = grabMatch();
  matchObj = JSON.parse(localStorage.matchObj);
  match = localStorage.matchNumber - 1;
  alliance = getAlliance();
  station = getStation() - 1;
  if (alliance === 'red') {
    teamNumber = parseInt(matchObj[match].alliances.red.team_keys[station].substr(3), 10);
    return teamNumber
  } else if (alliance === 'blue') {
    teamNumber = parseInt(matchObj[match].alliances.blue.team_keys[station].substr(3), 10);
    return teamNumber
  }
}

// function changes the color of an element
function changeButtonColor(id, color) {
  button = document.getElementById(id);
  button.style.backgroundColor = color;
}

// function that checks all the data
function selectAll() {
  var source = document.getElementById('selectAll');
  var items = document.getElementsByClassName('datacheck');
  if (!verify) {
    for (i = 0; i < items.length; i++) {
      items[i].checked = true;
    }
    verify = true;
    source.innerHTML = 'Deselect All';
  } else {
    for (i = 0; i < items.length; i++) {
      items[i].checked = false;
    }
    verify = false;
    source.innerHTML = 'Select All';
  }
}

// delete selected data and table entries
function deleteData() {
  let parent = $('.datacheck:checked').parents('tr');
  data = JSON.parse(localStorage.eventData);
  for (i = 0; i < parent.length; i++) {
    current = parent[i];
    posArray = current.id;
    data.splice(posArray, 1);
    current.remove();
    localStorage.setItem('eventData', JSON.stringify(data));
  }
  eventData = JSON.parse(localStorage.eventData);
}

function uploadData() {
  let parent = $('.datacheck:checked').parents('tr');
  data = JSON.parse(localStorage.eventData);
  for (i = 0; i < parent.length; i++) {
    current = parent[i];
    console.log(current);
    posArray = parseInt(current.id, 10);
    console.log(posArray);
    // num = data[posArray].matchNumber;
    // setTimeout(function() {
    //   submitData(data[posArray])
    // }, 1500);
    submitData(data[posArray]);
    // feedbackOnUpload(current, num);
    // }, 1400);
  }
}

function feedbackOnUpload(target, num) {
  $(target).children().remove();
  target.append($('<td></td>')
    .html('Data sent for Match ' + num)
    .attr({
      'colspan': 4,
    })
  );
}

// session cache non-essential settings like scout name and match number
function tempStorage() {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('matchNumber', $('#matchNumber').val());
    localStorage.setItem('scoutName', $('#scouts').val());
    localStorage.setItem('scoutIndex', document.getElementById('scouts').selectedIndex);
  } else {
    alert('Your browser does not support the Web Storage API. If you are using Internet Explorer 7 or lower, try using a modern browser. If you are using private mode, switch to a regular one. If none of theses work, contact Skunk Works Robotics\'s Scouting Team.');
  }
}

// check for Web Storage API support
function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function submitData(line) {
  eventData = JSON.parse(localStorage.eventData);
  console.log(line);
  var xhr = createCORSRequest('PUT', path);
  // xhr.setRequestHeader("Access-Control-Allow-Method", "PUT");
  // xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
  // xhr.setRequestHeader("Access-Control-Allow-Origin", `anonymous`)
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(line));
  // xhr.onreadystatechange = function() {
  //   console.log('Sent data');
  // }
}

// function to send, recieve, and process the GET request for match data
function sendGetRequest(target) {
  // send match http request
  matches.open("GET", TBAURL.concat(target + matchesURL));
  matches.setRequestHeader(TBAheader, TBAkey);
  matches.send();
  matches.onreadystatechange = function() {
    if (this.readyState === 4) {
      switch (this.status) {
        case 200:
          console.log("Match request completed successfully");
          matchObj = JSON.parse(matches.responseText);
          verifyHTTP = true;
          // changeButtonColor("startbutton", "#b7ffb4");
          break;

        case 401:
          console.warn("TBA API key is invalid");
          console.info("Enter a valid key");
          // changeButtonColor("startbutton", "#ffb5b5");
          alert("TBA API key is invalid; Enter a valid key por favor. Error 401 <-- for the tech support");
          break;

        case 404:
          console.info("Invalid URL");
          // changeButtonColor("startbutton", "#ffb5b5");
          alert("Invalid URL entered. Error 404 <-- for the tech support");
          break;

        default:
          // changeButtonColor("startbutton", "#ffb5b5");
          console.warn("Something wrong happened in matches. This means the function went all the way through the switch without triggering any conditions");
          break;
      }
    }
  }
}

// send get request + data validation
function getRequest() {
  var enterEvent = document.getElementById('eventcode');
  var event_Code = enterEvent.value;
  var ec1 = event_Code.substr(0, 4);
  var ec2 = event_Code.substr(4);
  if (parseInt(ec1, 10) >= 2016 && ec2.length === 2 || ec2.length === 3 || ec2.length === 4 || ec2.length === 5) {
    sendGetRequest(event_Code);
    setTimeout(function() {
      if (verifyHTTP) {
        enterEvent.style.boxShadow = '0px 0px';
        localStorage.setItem('matchObj', JSON.stringify(removePlayoffs(matchObj)));
        alert('Event match schedule has been recieved and is in local cache.');
        printMatches();
      } else {
        console.warn('error with get request');
        alert('Error with event code!');
      }
    }, 5000);
  } else {
    enterEvent.style.boxShadow = '0px 0px 2px 0.22em red';
  }
}

// validate the match object in storage
function validateLocalStorage() {
  if (typeof localStorage.matchObj !== 'undefined') {
    console.log('Event Schedule is in local cache');
    matchObj = JSON.parse(localStorage.matchObj);
    $('#eventcode').attr('value', matchObj[0].event_key);
    document.getElementById('eventcode').style.boxShadow = '0px 0px 2px 0.22em green';
  } else {
    alert('Event Schedule is missing. Make sure you have one by getting it from the settings page!');
  }
}

// retrieve the match schedule from local storage
function grabMatch() {
  matchObj = JSON.parse(localStorage.matchObj);
  return matchObj
}

// populate the match schedule table
function printMatches() {
  var i;
  var matches = JSON.parse(localStorage.matchObj);
  console.log(matches);
  for (i = 0; i < matches.length; i++) {
    red1 = parseInt(matches[i].alliances.red.team_keys[0].substr(3), 10);
    red2 = parseInt(matches[i].alliances.red.team_keys[1].substr(3), 10);
    red3 = parseInt(matches[i].alliances.red.team_keys[2].substr(3), 10);
    blue1 = parseInt(matches[i].alliances.blue.team_keys[0].substr(3), 10);
    blue2 = parseInt(matches[i].alliances.blue.team_keys[1].substr(3), 10);
    blue3 = parseInt(matches[i].alliances.blue.team_keys[2].substr(3), 10);

    if (!document.getElementsByTagName) {
      return
    }

    //now we are finding the table
    table = document.getElementsByTagName("tbody").item(0);

    //create a new row
    row = document.createElement("tr");

    //cells
    teamnocell = document.createElement("td");
    teamnocell1 = document.createElement("td");
    teamnocell2 = document.createElement("td");
    teamnocell3 = document.createElement("td");
    teamnocell4 = document.createElement("td");
    teamnocell5 = document.createElement("td");
    teamnocell6 = document.createElement("td");

    //text nodes
    teamno = document.createTextNode(i + 1);
    teamno1 = document.createTextNode(red1);
    teamno2 = document.createTextNode(red2);
    teamno3 = document.createTextNode(red3);
    teamno4 = document.createTextNode(blue1);
    teamno5 = document.createTextNode(blue2);
    teamno6 = document.createTextNode(blue3);

    //add the text nodes to cells
    teamnocell.appendChild(teamno);
    teamnocell1.appendChild(teamno1);
    teamnocell2.appendChild(teamno2);
    teamnocell3.appendChild(teamno3);
    teamnocell4.appendChild(teamno4);
    teamnocell5.appendChild(teamno5);
    teamnocell6.appendChild(teamno6);

    // append the cells to the row
    row.appendChild(teamnocell);
    row.appendChild(teamnocell1);
    row.appendChild(teamnocell2);
    row.appendChild(teamnocell3);
    row.appendChild(teamnocell4);
    row.appendChild(teamnocell5);
    row.appendChild(teamnocell6);

    //append the row to the table
    table.appendChild(row);
  }
};

// make field go up
// function up(id, amount, limit) {
//   if (id === this) {
//     console.log('Pointed at \'this\' selector.');
//     if (target.value < limit) {
//       target.setAttribute("value", parseInt(target.value, 10) + parseInt(amount, 10));
//     } else {
//       return "Trying to go over " + limit;
//     }
//   } else {
//     console.log('Not pointed at \'this\' selector.');
//     var target = document.getElementById(id);
//     if (target.value < limit) {
//       target.setAttribute("value", parseInt(target.value, 10) + parseInt(amount, 10));
//     } else {
//       return "Trying to go over " + limit;
//     }
//   }
// }

function goUp(id, limit) {
  elem = id;
  num = parseInt(elem.innerHTML, 10);
  if (num < limit) {
    elem.innerHTML = num + 1;
  }
}

// make field go down
function down(event) {
  target = $(document.getElementById(event.data.id));
  val = parseInt(target.html(), 10);
  if (val > event.data.limit) {
    target.html(val - event.data.amount);
  } else {
    console.log('Trying to go under ' + event.data.limit);
  }
}

// populate the scout name table
function populateScouts() {
  var list = document.getElementById('scouts');
  for (i = 0; i < scoutList.length; i++) {
    scout = scoutList[i];
    menu = document.createElement('option');
    menu.setAttribute('value', scout);
    displayValue = document.createTextNode(scout);
    menu.appendChild(displayValue);
    list.appendChild(menu);
  }
}

// add data to upload table
function populateTable() {
  data = JSON.parse(localStorage.eventData);
  for (i = 0; i < data.length; i++) {
    event = data[i].eventName;
    match = data[i].matchNumber;
    team = data[i].teamNumber;
    $('#submittedDataTable').append($('<tr></tr>')
      .attr({
        'class': i + 1,
        'id': i
      })
      .append($('<td></td>')
        .append($('<input>')
          .attr({
            'type': 'checkbox',
            'class': 'datacheck fatFinger'
          })
        )
      )
      .append($('<td></td>')
        .html(event)
      )
      .append($('<td></td>')
        .html(match)
      )
      .append($('<td></td>')
        .html(team)
      )
    );
  }
}

// function updates the settings
function updateSettings() {
  localStorage.setItem("reversionType", $('#reversionType').val())
  localStorage.setItem("station", $('#colorTeam').val())
}

// runs when submit button is hit
function submitSettings() {
  console.log('redirecting to selection page');
  updateSettings();
  window.location.href = "selection.html";
}

// changes the logo on the title bar based on the scroll position
function scrollLogo() {
  var color = document.getElementById('colorTeam');
  var img = $('#title-img');
  var content = $('#scroll-container');
  if (color.value === '1' || color.value === '2' || color.value === '3') {
    switch (content.scrollLeft()) {
      case 0:
      case 1:
      case 2:
        img.attr('src', 'assets/empty.svg');
        console.log('On settings page');
        break;

      case page.event:
      case page.event_alt:
        img.attr('src', 'assets/empty.svg');
        console.log('On event page');
        break;

      case page.sandstorm:
      case page.sandstorm_alt:
        img.attr('src', 'assets/SandstormRed.png');
        console.log('On sandstorm page');
        break;

      case page.teleop:
      case page.teleop_alt:
        img.attr('src', 'assets/TeleOpRocketRed.gif');
        console.log('On teleop page');
        break;

      default:
        img.attr('src', 'assets/empty.svg');
        console.log('Not on a particular page');
        break;
    }
  } else if (color.value === '4' || color.value === '5' || color.value === '6') {
    switch (content.scrollLeft()) {
      case 0:
      case 1:
      case 2:
        img.attr('src', 'assets/empty.svg');
        console.log('On settings page');
        break;

      case page.event:
      case page.settings_alt:
        img.attr('src', 'assets/empty.svg');
        console.log('On event page');
        break;

      case page.sandstorm:
      case page.sandstorm_alt:
        img.attr('src', 'assets/SandstormBlue.png');
        console.log('On sandstorm page');
        break;

      case page.teleop:
      case page.teleop_alt:
        img.attr('src', 'assets/TeleOpRocketBlue.gif');
        console.log('On teleop page');
        break;

      default:
        img.attr('src', 'assets/empty.svg');
        console.log('Not on particular page');
        break;
    }
  }
}

// function that starts the hold process
function startHold() {
  console.log('hold started');
  holdTimer = setTimeout(holdReset, 250);
}

// function that resets on hold
function holdReset() {
  console.log('circle triggered');
  var target = $(this);
  coords = {
    x: target.offset().left,
    y: target.offset().top
  };
  $(target).parents('#scroll-container').append($('<img></img>')
    .attr({
      width: '144px',
      height: '144px',
      src: 'assets/Animations/Clockwise Fill & Delete.gif',
      id: 'ringTimer',
    })
    .css({
      position: 'fixed',
      top: Math.floor(coords.y + (target.width() - $('#ringTimer').width()) * 0.5) + 'px',
      left: Math.floor(coords.x + (target.height() - $('#ringTimer').height()) * 0.5) + 'px',
      zIndex: 100,
    })
  );
  holdTimer = setTimeout(finishReset, 2500, target);
  // timer = window.setTimeout(finishReset, 2500, target);
  console.log(Math.floor(coords.y + (target.width() - $('#ringTimer').width()) * 0.5) + 'px');
  console.log(Math.floor(coords.x + (target.height() - $('#ringTimer').height()) * 0.5) + 'px');
}

function cancelReset() {
  console.log('hold cancelled');
  clearTimeout(holdTimer);
  $('#ringTimer').remove();
}

function finishReset(target) {
  console.log("hold finished");
  $('#ringTimer').remove();
  target.html(0);
  window.navigator.vibrate(200);
}

// function changes the color of the sandstorm logo based on the tablet
function adjustColor() {
  var color = document.getElementById('colorTeam');
  // var sandstormLogo = document.getElementById('sandstormLogo');
  // var teleLogo = document.getElementById('teleLogo');
  var teamNumber = document.getElementsByClassName('team-number');
  if (color.value === '1' || color.value === '2' || color.value === '3') {
    // adjust team number border
    for (i = 0; i < teamNumber.length; i++) {
      teamNumber[i].style.borderColor = 'red';
    };
    // adjust the select color
    color.style.backgroundColor = '#ffb7b7';
  } else if (color.value === '4' || color.value === '5' || color.value === '6') {
    // adjust team number logo
    for (i = 0; i < teamNumber.length; i++) {
      teamNumber[i].style.borderColor = 'blue';
    };
    // adjust select color
    color.style.backgroundColor = '#b7d8ff';
  }
}

function meme() {
  meme = Math.floor(Math.random() * 125);
  $('#memesers').attr('src', "assets/memes/" + meme + ".png");
}

// this function removes any playoff matches (in case there are any)
function removePlayoffs(object) {
  object = object.filter(result => result.comp_level === "qm");
  object = object.sort((a, b) => a.match_number - b.match_number);
  return object
}

// applies data to local storage
function resetLocalStorage() {
  localStorage.clear();

  eventData = [];

  localStorage.setItem('eventData', JSON.stringify(eventData));
}

// create the minus buttons
function minusButtons() {
  console.log('Creating Minus Buttons');
  buttons = $('button.cargo, button.hatch');
  parents = buttons.parent();
  width = $(buttons[0]).css('width');
  // create the minus buttons
  if (getAlliance() === 'red') {
    for (i = 0; i < parents.length; i++) {
      current = parents[i];
      current = $(current);
      current.append($('<img></img>')
        .attr({
          'class': 'arrow',
          'width': parseInt(width.substr(0, 2)) * 0.2,
        })
      );
      current.append($('<img></img>')
        .attr({
          'class': 'minus-button-red',
          // 'src': 'assets/minus.svg',
          'width': width,
        })
      );
    }
  } else if (getAlliance() === 'blue') {
    for (i = 0; i < parents.length; i++) {
      current = parents[i];
      current = $(current);
      current.append($('<img></img>')
        .attr({
          'class': 'arrow',
          'width': parseInt(width.substr(0, 2)) * 0.2,
        })
      );
      current.append($('<img></img>')
        .attr({
          'class': 'minus-button-blue',
          // 'src': 'assets/minus.svg',
          'width': width,
        })
      );
    };
  }
  // add the onclick function for the minus buttons
  for (i = 0; i < buttons.length; i++) {
    current = $(buttons[i]);
    id = current.attr('id');
    parent = current.parent();
    minusButtons = $(parent).children('img.minus-button-red, img.minus-button-blue');
    minusButtons.on('click', {
      'id': id,
      'amount': 1,
      'limit': 0,
    }, down);
  };
}

// init function
$(document).ready(function() {
  console.log('loaded up');

  if (localStorage.matchObj) {
    console.log('got the match object');
    grabMatch();
  } else {
    console.warn('no match object');
    alert('Get the event data from the settings screen!');
  }

  // disable right click
  // document.addEventListener('contextmenu', event => event.preventDefault());

  // switch to determine the page
  switch (location.href.split("/").slice(-1).join()) {
    // for the settings page, do the following
    case 'settings.html':
      console.log('Settings Page');
      validateLocalStorage();
      adjustColor();
      if (localStorage.matchObj) {
        printMatches();
      }
      populateTable();
      document.getElementById('colorTeam').selectedIndex = parseInt(localStorage.station, 10) - 1;
      adjustColor();
      $('html').css({
        backgroundImage: 'url("assets/settings-background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      });
      break;

      // for the match and scout selection page, do the following
    case 'selection.html':
      console.log('selection page');
      populateScouts();
      meme();
      // increment match number
      if (typeof localStorage.matchNumber === typeof '1') {
        console.log('Match number is a number and has been incremented');
        $('#matchNumber').val(parseInt(localStorage.matchNumber, 10) + 1);
      } else {
        console.log('Match number is not a number');
        $('#matchNumber').val(1);
      }
      document.getElementById('scouts').selectedIndex = parseInt(localStorage.scoutIndex, 10);
      break;

      // for the sandstorm and teleop page, do the following
    case 'match.html':
      console.log('match page');

      // deselectable radio buttons
      $('input[name="presence"]').click(function() {
        if (this.previous) {
          this.checked = false;
          console.log('unchecked the radio');
        } else {
          this.checked = true;
          console.log('not uncheck radio');
        }
        this.previous = this.checked;
      });

      // varies the delete type based on the reversion type
      switch (JSON.parse(localStorage.reversionType)) {
        case 1:
          console.log('setting minus buttons');
          minusButtons();
          break;
        case 2:
          console.log('setting rollover');
          rollover();
          break;
        case 3:
          console.log('setting hold to reset');
          holdToReset();
          break;
        default:
          console.warn('error with incrementation');
      };

      // change the colors of buttons according to alliance
      $('#teamName').html(getTeamNumber());
      switch (getAlliance()) {
        case 'red':
          $('#teamName').attr({
            'style': 'color:#ffb7b7',
          });
          $('div.fixedBottomRight').attr({
            'style': 'background-color:#ffb7b7',
          });
          $('.rotate').attr({
            'style': 'background-color:#ffb7b7',
          })
          break;
        case 'blue':
          $('#teamName').attr({
            'style': 'color:#b7d8ff',
          });
          $('div.fixedBottomRight').attr({
            'style': 'background-color:#b7d8ff',
          });
          $('.rotate').attr({
            'style': 'background-color:#b7d8ff',
          })
          break;
      }

      // ??BUG?? Event does not bind 
      // $('#scroll-container').scroll(scrollLogo);

      break;
  };

  // add event listener to trigger the reset
  // $('button.hatch, button.cargo').on('mousedown', holdReset); // startHold
  // stop the function on mouseup
  // $('button.hatch, button.cargo').on('mouseup', cancelReset);

});

// background hue shifts
// setInterval(function() {
//   hue = degree.toString();
//   var change = document.getElementById("teleop"); // which element gets changed
//   var teleLogo = document.getElementById('teleLogo');
//   change.style.filter = "hue-rotate(" + hue + "deg)"; // change the hue filter
//   change.style.WebkitFilter = "hue-rotate(" + hue + "deg)"; // change the hue filter
//   teleLogo.style.filter = "hue-rotate(" + (360-degree) + "deg)"; // keep the teleop rocket the same color
//   degree++; // change the degree by 1
//   // check that the degree does not exceed 360
//   if(degree >= 360) {
//     degree = 0; // reset it if it does
//   }
// }, interval);

// setInterval(function() {
//   hue = degree.toString();
//   var change = document.getElementById("event"); // which element gets changed
//   change.style.filter = "hue-rotate(" + hue + "deg)"; // change the hue filter
//   change.style.WebkitFilter = "hue-rotate(" + hue + "deg)"; // change the hue filter
//   degree++; // change the degree by 1
//   // check that the degree does not exceed 360
//   if(degree >= 360) {
//     degree = 0; // reset it if it does
//   }
// }, interval);

// cycle settings background color
// setInterval(function() {
//   hue = degree.toString();
//   var change = document.getElementById("settings"); // which element gets changed
//   change.style.filter = "hue-rotate(" + hue + "deg)"; // change the hue filter
//   change.style.WebkitFilter = "hue-rotate(" + hue + "deg)"; // change the hue filter
//   degree++; // change the degree by 1
//   // check that the degree does not exceed 360
//   if(degree >= 360) {
//     degree = 0; // reset it if it does
//   }
// }, interval);