// variables
var i;
var j;
var k;
var scoutList = ['Ethan Palisoc', 'Evan Palisoc', 'PP Large', 'Caleb Jones', 'Mezie Nwizugbo', 'Patrick Eaton'];
var buttons;
var verify = false;
var meme;
var holdTimer;

// interval for hue shifting
const interval = 750;
let degree = 0;

// urls
const TBAheader = "X-TBA-Auth-Key";
const TBAkey = "d4V33bAbuXiKfuLW1pc4BaLbr56BgiORtyM5hwmRLU5qNf6Rxh83noDdI0mPJJ3R"; // eventually this one should become user input
const TBAURL = "https://www.thebluealliance.com/api/v3/event/";
const matchesURL = "/matches/simple";
const path = ""; // add server path

// get data from TBA
var matches = new XMLHttpRequest();
// define JSON objects
let matchesObj;
// verify HTTP requests
let verifyHTTP = false;

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

// Local Storage Object that stores the recorded match data
// titles should be in format 'eventTitle_matchNumber'
eventData = [];

currentData = {
  "event": "2019wasno", // string
  "match": 1, // int
  "alliance": "Red", // red or blue
  "teamNumber": 0, // int
  "scoutStation": 1, // int
  "position": 1, // int
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
  }
}
try {
  function getMatchObj() {

  }
} catch (err) {
  alert('The event schedule has not been defined!');
}

// write data to local storage
function setCurrentData() {
  eventCode = localStorage.eventData;
  currentData.event = matchObj[0].event_key;
  currentData.match = localStorage.matchNumber;
  currentData.alliance = getAlliance();
  currentData.teamNumber = getTeamNumber();
  currentData.position = getStation();
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
  currentData.sandStorm.rocket.level1.hatch = $('#sandStorm.rocket.level1.hatch').html();
  currentData.sandStorm.rocket.level1.cargo = $('#sandStorm.rocket.level1.cargo').html();
  currentData.sandStorm.rocket.level2.hatch = $('#sandStorm.rocket.level2.hatch').html();
  currentData.sandStorm.rocket.level2.cargo = $('#sandStorm.rocket.level2.cargo').html();
  currentData.sandStorm.rocket.level3.hatch = $('#sandStorm.rocket.level3.hatch').html();
  currentData.sandStorm.rocket.level3.cargo = $('#sandStorm.rocket.level3.cargo').html();
  // ship
  currentData.sandStorm.ship.hatch = $('#sandStorm.ship.hatch').html();
  currentData.sandStorm.ship.cargo = $('#sandStorm.ship.cargo').html();
  // retrieved 
  currentData.sandStorm.retrieved.hatch = $('#sandStorm.retrieved.hatch').html();
  currentData.sandStorm.retrieved.cargo = $('#sandStorm.retrieved.cargo').html();
  // dropped
  currentData.sandStorm.dropped.hatch = $('#sandStorm.dropped.hatch').html();
  currentData.sandStorm.dropped.cargo = $('#sandStorm.dropped.cargo').html();
  // teleop
  // obscured
  // rocket
  currentData.teleOp.obscured.rocket.level1.hatch = $('#teleOp.obscured.rocket.level1.hatch').html();
  currentData.teleOp.obscured.rocket.level1.cargo = $('#teleOp.obscured.rocket.level1.cargo').html();
  currentData.teleOp.obscured.rocket.level2.hatch = $('#teleOp.obscured.rocket.level2.hatch').html();
  currentData.teleOp.obscured.rocket.level2.cargo = $('#teleOp.obscured.rocket.level2.cargo').html();
  currentData.teleOp.obscured.rocket.level3.hatch = $('#teleOp.obscured.rocket.level3.hatch').html();
  currentData.teleOp.obscured.rocket.level3.cargo = $('#teleOp.obscured.rocket.level3.cargo').html();
  // ship
  currentData.teleOp.obscured.ship.hatch = $('#teleOp.obscured.ship.hatch').html();
  currentData.teleOp.obscured.ship.cargo = $('#teleOp.obscured.ship.cargo').html();
  // unobscured
  // rocket
  currentData.teleOp.unobscured.rocket.level1.hatch = $('#teleOp.unobscured.rocket.level1.hatch').html();
  currentData.teleOp.unobscured.rocket.level1.cargo = $('#teleOp.unobscured.rocket.level1.cargo').html();
  currentData.teleOp.unobscured.rocket.level2.hatch = $('#teleOp.unobscured.rocket.level2.hatch').html();
  currentData.teleOp.unobscured.rocket.level2.cargo = $('#teleOp.unobscured.rocket.level2.cargo').html();
  currentData.teleOp.unobscured.rocket.level3.hatch = $('#teleOp.unobscured.rocket.level3.hatch').html();
  currentData.teleOp.unobscured.rocket.level3.cargo = $('#teleOp.unobscured.rocket.level3.cargo').html();
  // ship
  currentData.teleOp.unobscured.ship.hatch = $('#teleOp.unobscured.ship.hatch').html();
  currentData.teleOp.unobscured.ship.cargo = $('#teleOp.unobscured.ship.cargo').html();
  // retrieved
  currentData.teleOp.retrieved.loading.hatch = $('#teleOp.retrieved.loading.hatch').html();
  currentData.teleOp.retrieved.loading.cargo = $('#teleOp.retrieved.loading.cargo').html();
  currentData.teleOp.retrieved.floor.hatch = $('#teleOp.retrieved.floor.hatch').html();
  currentData.teleOp.retrieved.floor.cargo = $('#teleOp.retrieved.floor.cargo').html();
  // dropped
  currentData.teleOp.dropped.hatch = $('#teleOp.dropped.hatch').html();
  currentData.teleOp.dropped.cargo = $('#teleOp.dropped.cargo').html();

  // set currentData to localStorage
  eventData.push(currentData);
  localStorage.setItem('eventData', eventData);
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
  match = localStorage.matchNumber;
  alliance = getAlliance();
  station = getStation();
  if (alliance === 'red') {
    teamNumber = parseInt(matchObj[match].alliances.red.team_keys[station].substr(3), 10);
    return teamNumber;
  } else if (alliance === 'blue') {
    teamNumber = parseInt(matchObj[match].alliances.blue.team_keys[station].substr(3), 10);
    return teamNumber;
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
  for (i = 0; i < parent.length; i++) {
    parent[i].remove();
  }
  // TODO: delete JSON object from local storage
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
  return JSON.parse(localStorage.matchObj);
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
function up(id, amount, limit) {
  if (id === this) {
    console.log('Pointed at \'this\' selector.');
    if (target.value < limit) {
      target.setAttribute("value", parseInt(target.value, 10) + parseInt(amount, 10));
    } else {
      return "Trying to go over " + limit;
    }
  } else {
    console.log('Not pointed at \'this\' selector.');
    var target = document.getElementById(id);
    if (target.value < limit) {
      target.setAttribute("value", parseInt(target.value, 10) + parseInt(amount, 10));
    } else {
      return "Trying to go over " + limit;
    }
  }
}

function goUp(id, limit) {
  elem = id;
  num = parseInt(elem.innerHTML, 10);
  if (num < limit) {
    elem.innerHTML = num + 1;
  }
}

// make field go down
function down(id, amount, limit) {
  if (id === this) {
    if (target.value > limit) {
      target.setAttribute("value", parseInt(target.value, 10) - parseInt(amount, 10));
    } else {
      return "Trying to go under " + limit
    }
  } else {
    var target = document.getElementById(id);
    if (target.value > limit) {
      target.setAttribute("value", parseInt(target.value, 10) - parseInt(amount, 10));
    } else {
      return "Trying to go under " + limit
    }
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
  // retrieve data out of local storage
  // get out the old table population code
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

function submitData() {

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
  meme = Math.floor(Math.random() * 121);
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
  localStorage.setItem('eventData', eventData);
}

// init function
$(document).ready(function() {
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
      break;

      // for the match and scout selection page, do the following
    case 'selection.html':
      console.log('selection page');
      populateScouts();
      meme();
      // increment match number
      if (typeof parseInt(localStorage.matchNumber, 10) === 'number') {
        $('#matchNumber').val(parseInt(localStorage.matchNumber, 10) + 1);
      } else {
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
        }
        this.previous = this.checked;
      });

      // ??BUG?? Event does not bind 
      // $('#scroll-container').scroll(scrollLogo);

      break;
  };

  // unchecks checked radio buttons when clicked again
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

  if (localStorage.matchObj) {
    matchObj = JSON.parse(localStorage.matchObj);
  }
  // add event listener to trigger the reset
  // $('button.hatch, button.cargo').on('mousedown', holdReset); // startHold
  // stop the function on mouseup
  // $('button.hatch, button.cargo').on('mouseup', cancelReset);
  console.log('loaded up');
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