// viewSchedule.html
// define the target url
let eventNombre;

// tba key in array form
const TBAkey = ["X-TBA-Auth-Key", "d4V33bAbuXiKfuLW1pc4BaLbr56BgiORtyM5hwmRLU5qNf6Rxh83noDdI0mPJJ3R"];

// define the base url
const TBAurl = "https://www.thebluealliance.com/api/v3/event/";

// http request
const eventtarget = new XMLHttpRequest();
let scheduleObj;

function TBArequest() {
  eventNombre = document.getElementById('EventNombre').value;
  console.log("Target Event is " + eventNombre);
  eventtarget.open("GET", TBAurl.concat(eventNombre + "/matches"));
  eventtarget.setRequestHeader(TBAkey[0], TBAkey[1]);
  eventtarget.send();
  console.log("Request Sent");
  changeButtonColor("startbutton", "#fffa9b");

  eventtarget.onreadystatechange = function() {
    if(this.readyState===4) {
      switch(this.status) {
          case 200:
            console.log("Schedule request completed successfully");
            scheduleObj = JSON.parse(eventtarget.responseText);
            changeButtonColor("startbutton", "#b7ffb4");
            break;

          case 401:
            console.warn("TBA API key is invalid");
            console.info("Enter a valid key");
            changeButtonColor("startbutton", "#ffb5b5");
            alert("TBA API key is invalid; Enter a valid key por favor. Error 401 on schedule <-- for the tech support");
            break;

          case 404:
            console.info("Invalid URL");
            changeButtonColor("startbutton", "#ffb5b5");
            alert("Invalid URL entered. Error 404 on schedule <-- for the tech support");
            break;

          default:
            changeButtonColor("startbutton", "#ffb5b5");
            console.warn("Something wrong happened in schedule. This means the function went all the way through the switch without triggering any conditions");
            break;
      }
    }
  }
}

window.addEventListener('load', function() {
  console.log("The TBA API is either offline or there is no available match schedule for the given event, so we need to manually input the match schedule");
});

function changeButtonColor(id, color) {
  button = document.getElementById(id);
  button.style.backgroundColor = color;
}

testObj = {
            "eventname":"2018wapp",
            "match":[1,2,3,4],
            "red1":[254,6969,4556,443],
            "red2":[118,420,809,3122],
            "red3":[1983,7005,9301,837],
            "blue1":[168,999,3293,7463],
            "blue2":[7005,666,321,8402],
            "blue3":[5803,69,6283,971]
          }

function testJSON() {
  var i;
  let schedule;
  console.log("event is: " + testObj.eventname);
  for (i=0; i <= (testObj.match.length-1); i++) {
    schedule = [testObj.match[i], testObj.red1[i], testObj.red2[i], testObj.red3[i], testObj.blue1[i], testObj.blue2[i], testObj.blue3[i]];
    console.log(schedule);
  }
}

// function to add rows to the table
function addLocal() { // event nombre is a tribute to Patrick and his wonderful code
  var i;
  if(testObj) {
    var eventNombre = testObj.eventname;
    // matchno = document.createTextNode(testObj.match);
    for(i=0; i < (testObj.match.length); i++) {
      if (!document.getElementsByTagName) return;
      // find the table
      tabBody = document.getElementsByTagName("tbody").item(0);

      // create a new row
      row = document.createElement("tr");

      // how many cells are included
      cell1 = document.createElement("td");
      cell2 = document.createElement("td");
      cell3 = document.createElement("td");
      cell4 = document.createElement("td");
      cell5 = document.createElement("td");
      cell6 = document.createElement("td");
      cell7 = document.createElement("td");

      // text nodes
      matchno = document.createTextNode(testObj.match[i]);
      red1 = document.createTextNode(testObj.red1[i]);
      red2 = document.createTextNode(testObj.red2[i]);
      red3 = document.createTextNode(testObj.red3[i]);
      blue1 = document.createTextNode(testObj.blue1[i]);
      blue2 = document.createTextNode(testObj.blue2[i]);
      blue3 = document.createTextNode(testObj.blue3[i]);

      // add text values to the cells
      cell1.appendChild(matchno);
      cell2.appendChild(red1);
      cell3.appendChild(red2);
      cell4.appendChild(red3);
      cell5.appendChild(blue1);
      cell6.appendChild(blue2);
      cell7.appendChild(blue3);

      // add td to try
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell5);
      row.appendChild(cell6);
      row.appendChild(cell7);

      // add tr to the table body
      tabBody.appendChild(row);
    }
  } else {
    alert('No schedule input yet');
  }
}

function addTBA() {
  var i;
}










// matchForm.html

function recordInput() {
    localStorage.setItem(document.getElementById());
}

// function that validates the submitted match schedule
// it works using a checksum
function submitSchedule() {
  let checksum = 0;
  const conditions = 6;
  // defining the entries on the forms
  let matchno = document.getElementById("matchno").value;
  let red1 = document.getElementById("red1").value;
  let red2 = document.getElementById("red2").value;
  let red3 = document.getElementById("red3").value;
  let blue1 = document.getElementById("blue1").value;
  let blue2 = document.getElementById("blue2").value;
  let blue3 = document.getElementById("blue3").value;

  if(matchno >= 1 && matchno <= 200 && red2 <= 9999 && red2 >= 1 && red3 <= 9999 && red3 >= 1 && blue1 <= 9999 && blue1 >= 1 && blue2 <= 9999 && blue2 >= 1 && blue3 <= 9999 && blue3 >= 1) {
    checksum = checksum + 6;
  } if(checksum === conditions) {
    return false;
  } else {
    return true;
  }
}



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
