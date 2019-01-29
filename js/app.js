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

// init function
$(document).ready(function(){
  // CSS Scroll Snap Polyfill for older browsers
  // scrollSnapPolyfill();
  // initialize paroller.js
  $("[data-paroller-factor]").paroller();
});

// function changes the color of an element
function changeButtonColor(id, color) {
  button = document.getElementById(id);
  button.style.backgroundColor = color;
}

// function to send, recieve, and process the GET request for match data
function sendRequest(target) {
  // send rankings http request
  matches.open("GET", TBAURL.concat(target + matchesURL));
  matches.setRequestHeader(TBAheader, TBAkey);
  matches.send();
  matches.onreadystatechange = function() {
    if(this.readyState === 4) {
      switch(this.status) {
          case 200:
            console.log("Ranking request completed successfully");
            Obj = JSON.parse(matches.responseText);
            // changeButtonColor("startbutton", "#b7ffb4");
            matches
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

// make field go up
function up(id, amount) {
  var target = document.getElementById(id);
  if(target.value < 6) {
    target.setAttribute("value", parseInt(target.value, 10) + parseInt(amount, 10));
  } else {
    return "Trying to go over 6"
  }
}

// make field go down
function down(id, amount) {
  var target = document.getElementById(id);
  if(target.value > 0) {
    target.setAttribute("value", parseInt(target.value, 10) - parseInt(amount, 10));
  } else {
    return "Trying to go under 0"
  }
}

function getRequest() {
  var enterEvent = document.getElementById('eventcode');
  var eventCode = enterEvent.value;
  var ec1 = eventCode.substr(0,4);
  var ec2 = eventCode.substr(4);
  if(parseInt(ec1, 10) === 2019 && ec2.length === 2 || ec2.length === 3 || ec2.length === 4 || ec2.length === 5) {
    sendRequest(eventCode);
    enterEvent.style.boxShadow = '0px 0px';
    // send the request
    return true
  } else {
    enterEvent.style.boxShadow = '0px 0px 2px 0.22em red';
  }
}

function populateScouts() {
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

function populateTable() {
  // retrieve data out of local storage
  // get out the old table population code
}

// on touch hold, clear inputs
// send some sort of feedback to user
// eg. vibration or circle loop closing timer; ideally both
function clearInput() {

}

// function changes the color of the sandstorm logo based on the tablet
function adjustColor() {
  var color = document.getElementById('colorTeam');
  var sandstormLogo = document.getElementById('sandstormLogo');
  var teleLogo = document.getElementById('teleLogo');
  var teamNumber = document.getElementsByClassName('team-number');
  if(color.value === '1' || color.value === '2' || color.value === '3') {
    // adjust sandstorm logo
    sandstormLogo.setAttribute('src', 'assets/SandstormRed.png');

    // adjust team number border
    for(i=0; i < teamNumber.length; i++) {
      teamNumber[i].style.borderColor = 'red';
    };

    // adjust tele logo color
    teleLogo.setAttribute('src', 'assets/TeleOpRocketRed.gif');

    // adjust the select color
    color.style.backgroundColor = 'red';
  } else if(color.value === '4' || color.value === '5' || color.value === '6') {
    // adjust sandstorm logo
    sandstormLogo.setAttribute('src', 'assets/SandstormBlue.png');

    // adjust team number logo
    for(i=0; i < teamNumber.length; i++) {
      teamNumber[i].style.borderColor = 'blue';
    };

    // adjust tele logo color
    teleLogo.setAttribute('src', 'assets/TeleOpRocketBlue.gif');

    // adjust select color
    color.style.backgroundColor = 'blue';
  }
}

// this function removes any playoff matches (in case there are any)
function removePlayoffs() {
  matchesObj = matchesObj.filter(result => result.comp_level === "qm");
  matchesObj = matchesObj.sort((a, b) => a.match_number - b.match_number);
}

// applies 
function cacheSettings() {

}

// run code
populateScouts();
adjustColor();

// unchecks checked radio buttons when clicked again
$('input[type="radio"]').click(function() {
  if(this.checked) {
    this.attr('checked');
  } else {
    this.attr('checked');
  }
  // console.log(this);
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
