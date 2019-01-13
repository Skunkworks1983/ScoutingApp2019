// import polyfill
// import scrollSnapPolyfill from 'css-scroll-snap-polyfill'

// variables
var i; var j; var k;
var scoutList = ['Ethan Palisoc', 'Evan Palisoc', 'PP Large', 'Caleb Jones', 'Mezie Nwizugbo', 'Patrick Eaton'];

// interval for hue shifting
const interval = 750;
let degree = 0;

// urls
const TBAheader = "X-TBA-Auth-Key";
const TBAkey = "d4V33bAbuXiKfuLW1pc4BaLbr56BgiORtyM5hwmRLU5qNf6Rxh83noDdI0mPJJ3R";  // eventually this one should become user input
const TBAURL = "https://www.thebluealliance.com/api/v3/event/";
const matchesURL = "/matches/simple";

// get data from TBA
var matches = new XMLHttpRequest();
// define JSON objects
let matchesObj;

// scout data JSON object
var data = {
  scoutName: 'IAN', // name of scout
  event: '2019wasno', // event code (2019xxxx)
  matchNumber: 1, // match number
  alliance: 'red', // blue or red
  teamNumber: 2046, // team number ex. 1983
  station: 1, // field driver station ex. 1 or 2 or 3
  noShow: false, // do they show up
  storm: { // sandstorm values
    startPos: 1, // which level does the robot start on ex. 1 or 2
    crossLine: false, // did they cross the line?
    cargoHatch: 0, // how many hatches were placed on the cargo ship
    cargoCargo: 0, // how many cargoes were placed
    lRocketCargo: 0, // how many cargoes placed in left rocket
    rRocketCargo: 0, // how many cargoes placed in right rocket
    retrieveHatch: 0, // how many hatches retrieved
    retrieveCargo: 0, // how many cargoes retrieved
    droppedHatches: 0, // how many hatches dropped
    droppedCargo: 0, // how many cargoes dropped
    deadBot: false, // robot is inoperable
  },
  tele: { // teleop values
    acquire: {
      hatchLoad: 0, // how many hatches loaded from loading station
      hatchFloor: 0, // how many hatches loaded from ground
      cargoLoad: 0, // how many cargoes loaded from loading station
      cargoFloor: 0, // how many cargoes loaded from ground
    },
    lRocket: { // rocket left of the driver station
      hatchNear: 0, // load a hatch to the side of the rocket nearer to the driver station
      hatchFar: 0, // load a hatch to the side of the rocket farther from the driver station
      cargo1: 0, // load a cargo into first level
      cargo2: 0, // load a cargo into the second level
      cargo3: 0, // load a cargo into the third level
    },
    rRocket: { // rocket right of the driver station
      hatchNear: 0,
      hatchFar: 0,
      cargo1: 0,
      cargo2: 0,
      cargo3: 0,
    },
    cargoHatch: 0, // how many hatches placed on the cargo ship
    cargoCargp: 0, // how many cargpes placed in the cargo ship
    impaired: false, // did a subsystem on the robot break
    droppedHatches: 0, // how many hatches dropped
    droppedCargo: 0, // how many cargoes dropped
    deadBot: false, // did the bot die altogether
  },
  climb: 0, // did they climb; values range from 0 (no climb), 1 (level 1), 2 (level 2), 3 (level 3)
  assistedClimb: false, // did they assist another bot to climb
  recievedClimb: false, // did they recieve help climbing
}

// init function
const init = function() {
  // CSS Scroll Snap Polyfill for older browsers
  // scrollSnapPolyfill();
  // initialize paroller.js
  $("[data-paroller-factor]").paroller();
}

// function changes the color of ann element
function changeButtonColor(id, color) {
  button = document.getElementById(id);
  button.style.backgroundColor = color;
}

// function to send, recieve, and process the GET request for match data
function sendRequest(target) {
  // TODO: Add logic here to determine whether the event is valid
  let cont = true;
  if(cont === false) {
    return "target not set";
  } else {
    // send rankings http request
    matches.open("GET", TBAURL.concat(target + matchesURL));
    matches.setRequestHeader(TBAheader, TBAkey);
    matches.send();
    matches.onreadystatechange = function() {
      if(this.readyState === 4) {
        switch(this.status) {
            case 200:
              console.log("Ranking request completed successfully");
              rankingsObj = JSON.parse(rankings.responseText);
              // changeButtonColor("startbutton", "#b7ffb4");
              break;

            case 401:
              console.warn("TBA API key is invalid");
              console.info("Enter a valid key (R)");
              // changeButtonColor("startbutton", "#ffb5b5");
              alert("TBA API key is invalid; Enter a valid key por favor. Error 401 on rankings <-- for the tech support");
              break;

            case 404:
              console.info("Invalid URL");
              // changeButtonColor("startbutton", "#ffb5b5");
              alert("Invalid URL entered. Error 404 on rankings <-- for the tech support");
              break;

            default:
              // changeButtonColor("startbutton", "#ffb5b5");
              console.warn("Something wrong happened in rankings. This means the function went all the way through the switch without triggering any conditions");
              break;
        }
      }
    }
  }
}

function populateTable() {
  var list = document.getElementById('scouts');
  for (i=0; i < scoutList.length; i++) {
    scout = scoutList[i];
    menu = document.createElement('option');
    menu.setAttribute('value', scout);
    displayValue = document.createTextNode(scout);
    menu.appendChild(displayValue);
    list.appendChild(menu);
  }
}

// function changes the color of the sandstorm logo based on the tablet
function addSandstormLogo() {
  var color = document.getElementById('colorTeam');
  var logo = document.getElementById('sandstormLogo');
  if(color.value === '1' || color.value === '2' || color.value === '3') {
    logo.setAttribute('src', 'assets/SandstormRed.png');
  } else if(color.value === '4' || color.value === '5' || color.value === '6') {
    logo.setAttribute('src', 'assets/SandstormBlue.png');
  }
}

function cacheSettings() {

}

// run code
init();
populateTable();
addSandstormLogo();

// background hue shifts
setInterval(function() {
  hue = degree.toString();
  var change = document.getElementById("teleop"); // which element gets changed
  change.style.filter = "hue-rotate(" + hue + "deg)"; // change the hue filter
  change.style.WebkitFilter = "hue-rotate(" + hue + "deg)"; // change the hue filter
  degree++; // change the degree by 1
  // check that the degree does not exceed 360
  if(degree >= 360) {
    degree = 0; // reset it if it does
  }
}, interval);

setInterval(function() {
  hue = degree.toString();
  var change = document.getElementById("event"); // which element gets changed
  change.style.filter = "hue-rotate(" + hue + "deg)"; // change the hue filter
  change.style.WebkitFilter = "hue-rotate(" + hue + "deg)"; // change the hue filter
  degree++; // change the degree by 1
  // check that the degree does not exceed 360
  if(degree >= 360) {
    degree = 0; // reset it if it does
  }
}, interval);

setInterval(function() {
  hue = degree.toString();
  var change = document.getElementById("settings"); // which element gets changed
  change.style.filter = "hue-rotate(" + hue + "deg)"; // change the hue filter
  change.style.WebkitFilter = "hue-rotate(" + hue + "deg)"; // change the hue filter
  degree++; // change the degree by 1
  // check that the degree does not exceed 360
  if(degree >= 360) {
    degree = 0; // reset it if it does
  }
}, interval);
