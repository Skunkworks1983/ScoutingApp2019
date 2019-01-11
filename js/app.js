// import polyfill
// import scrollSnapPolyfill from 'css-scroll-snap-polyfill'

// variables
var i; var j; var k;
var scoutList = ['Ethan Palisoc', ''];

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
  for (let o of scoutList) {
    scout = document.createElement('')
  }
}

// function changes the color of the sandstorm logo based on the tablet
function addSandstormLogo() {
  if() {

  }
}

// run code
init();
populateTable();
