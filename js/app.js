// import polyfill
// import scrollSnapPolyfill from 'node_modules/css-scroll-snap-polyfill/dist';
// const scrollSnapPolyfill = require('css-scroll-snap-polyfill');

// variables
var i; var j; var k;
var scoutList = ['Ethan Palisoc', 'Evan Palisoc', 'PP Large', 'Caleb Jones', 'Mezie Nwizugbo', 'Patrick Eaton'];
var buttons;
var verify = false;
var meme;

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
  for(i = 0; i < parent.length; i++) {
    parent[i].remove();
  }
  // TODO: delete JSON object from local storage
}

// session cache non-essential settings like scout name and match number
function sessionStorage() {
  if(storageAvailable('sessionStorage')) {
    sessionStorage.matchNumber = $('#matchNumber').value;
    sessionStorage.scoutName = $('#scouts').value;
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
    }
    catch(e) {
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
    if(this.readyState === 4) {
      switch(this.status) {
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
  var eventCode = enterEvent.value;
  var ec1 = eventCode.substr(0,4);
  var ec2 = eventCode.substr(4);
  if(parseInt(ec1, 10) >= 2016 && ec2.length === 2 || ec2.length === 3 || ec2.length === 4 || ec2.length === 5) {
    sendGetRequest(eventCode);
    setTimeout(function() {
      if(verifyHTTP) {
        enterEvent.style.boxShadow = '0px 0px';
        localStorage.setItem('matchObj', JSON.stringify(removePlayoffs(matchObj)));
        alert('Event match schedule has been recieved and is in local cache.');
      } else {
        console.warn('error with get request');
        alert('Error with event code!');
      }
    }, 5000);
  } else {
    enterEvent.style.boxShadow = '0px 0px 2px 0.22em red';
  }
}

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

// make field go up
function up(id, amount, limit) {
  if(id === this) {
    console.log('Pointed at \'this\' selector.');
    if(target.value < limit) {
      target.setAttribute("value", parseInt(target.value, 10) + parseInt(amount, 10));
    } else {
      return "Trying to go over " + limit;
    }
  } else {
    console.log('Not pointed at \'this\' selector.');
    var target = document.getElementById(id);
    if(target.value < limit) {
      target.setAttribute("value", parseInt(target.value, 10) + parseInt(amount, 10));
    } else {
      return "Trying to go over " + limit;
    }
  }
}

function goUp(id) {
  elem = id;
  num = parseInt(elem.innerHTML,10);
  if(num < 2) {
    elem.innerHTML = num + 1;
  }
}

// make field go down
function down(id, amount, limit) {
  if(id === this) {
    if(target.value > limit) {
      target.setAttribute("value", parseInt(target.value, 10) - parseInt(amount, 10));
    } else {
      return "Trying to go under " + limit
    }
  } else {
    var target = document.getElementById(id);
    if(target.value > limit) {
      target.setAttribute("value", parseInt(target.value, 10) - parseInt(amount, 10));
    } else {
      return "Trying to go under " + limit
    }
  }
}

// populate the scout name table
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

// on submit or restart, return scoutname and match number to previous values
function restoreFields() {
  if(sessionStorage.submitted) {
    $('#matchNumber').value = sessionStorage.match + 1;
  }
  $('#scouts').value = sessionStorage.scoutName;
}

// add data to upload table
function populateTable() {
  // retrieve data out of local storage
  // get out the old table population code
}

// on touch hold, clear inputs
// send some sort of feedback to user
// eg. vibration or circle loop closing timer; ideally both
function clearInput() {

}

// changes the logo on the title bar based on the scroll position
function scrollLogo() {
  var color = document.getElementById('colorTeam');
  var img = $('#title-img');
  var content = $('#scroll-container');
  if(color.value === '1' || color.value === '2' || color.value === '3') {
    switch(content.scrollLeft()) {
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
  } else if(color.value === '4' || color.value === '5' || color.value === '6') {
    switch(content.scrollLeft()) {
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

// function changes the color of the sandstorm logo based on the tablet
function adjustColor() {
  var color = document.getElementById('colorTeam');
  // var sandstormLogo = document.getElementById('sandstormLogo');
  // var teleLogo = document.getElementById('teleLogo');
  var teamNumber = document.getElementsByClassName('team-number');
  if(color.value === '1' || color.value === '2' || color.value === '3') {
    // adjust team number border
    for(i=0; i < teamNumber.length; i++) {
      teamNumber[i].style.borderColor = 'red';
    };
    // adjust the select color
    color.style.backgroundColor = 'red';
  } else if(color.value === '4' || color.value === '5' || color.value === '6') {
    // adjust team number logo
    for(i=0; i < teamNumber.length; i++) {
      teamNumber[i].style.borderColor = 'blue';
    };
    // adjust select color
    color.style.backgroundColor = 'blue';
  }
}

function meme() {
  meme = Math.floor(Math.random() * 90);
  $('#memesers').attr('src', "assets/memes/"+meme+".png");
}

// this function removes any playoff matches (in case there are any)
function removePlayoffs(object) {
  object = object.filter(result => result.comp_level === "qm");
  object = object.sort((a, b) => a.match_number - b.match_number);
  return object
}

// applies data to local storage
function cacheSettings() {

}

// init function
$(document).ready(function() {
  // CSS Scroll Snap Polyfill for older browsers
  // scrollSnapPolyfill();
  // initialize paroller.js
  // $("[data-paroller-factor]").paroller();

  // unchecks checked radio buttons when clicked again
  $('input[name="presence"]').click(function(){
    if (this.previous) {
        this.checked = false;
    }
    this.previous = this.checked;
  });

  populateScouts();
  adjustColor();
  meme();
  validateLocalStorage();

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
