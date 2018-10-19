
function TBArequest() {
  let eventNombre = document.getElementById('EventNombre').value;
  const TBAkey = "?X-TBA-Auth-Key=d4V33bAbuXiKfuLW1pc4BaLbr56BgiORtyM5hwmRLU5qNf6Rxh83noDdI0mPJJ3R";
  const TBAurl = "https://www.thebluealliance.com/api/v3/event/";
  const Http = new XMLHttpRequest();
  Http.open("GET", TBAurl.concat(eventNombre + "/matches"));
  Http.setRequestHeader("X-TBA-Auth-Key", "d4V33bAbuXiKfuLW1pc4BaLbr56BgiORtyM5hwmRLU5qNf6Rxh83noDdI0mPJJ3R");
  Http.send();

  Http.onreadystatechange = function() {
    if(this.readyState===4 && this.status==200) {
      // var TBAresponse = Http.parse();
      console.log(Http.responseText);
    }
  }
}



// this document is for validating the form and writing the results to the local storage
function errorMessage() {
  console.log("The TBA API is either offline or there is no available match schedule for the given event, so we need to manually input the match schedule");
};

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

// JSON objects will be stored in the local storage containing the inputted match schedule
// One JSON object for each event
// then the match no and the teams in order are put into an array
// TODO: figure out how the actual TBA API serves up the JSON object containing the match data
// Once we figure that out, we construct our JSON object to mimic that of the TBA API
// for some reason Patrick was still using the v2 API

// test JSON objects

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

//

// let total = testObj.match.length;
function testJSON() {
  var i;
  let schedule;
  console.log("event is: " + testObj.eventname);
  for (i=0; i <= (testObj.match.length-1); i++) {
    schedule = [testObj.match[i], testObj.red1[i], testObj.red2[i], testObj.red3[i], testObj.blue1[i], testObj.blue2[i], testObj.blue3[i]];

    console.log(schedule);
  }
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
  // switch (matchno >= 1 && matchno <= 200) {
  //   case red1 <= 9999 && red1 >= 1:
  //     checksum++;
  //     console.log(checksum);
  //
  //   case red2 <= 9999 && red2 >= 1:
  //     checksum++;
  //     console.log(checksum);
  //
  //   case red3 <= 9999 && red3 >= 1:
  //     checksum++;
  //     console.log(checksum);
  //
  //   case blue1 <= 9999 && blue1 >= 1:
  //     checksum++;
  //     console.log(checksum);
  //
  //   case blue2 <= 9999 && blue2 >= 1:
  //     checksum++;
  //     console.log(checksum);
  //
  //   case blue3 <= 9999 && blue3 >= 1:
  //     checksum++;
  //     console.log(checksum);
  //
  //   default:
  //     return true;
  // }

// function to add rows to the table
function addRows() { // event nombre is a tribute to Patrick and his wonderful code
  var i = 0;
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

function recordInput() {
    localStorage.setItem(document.getElementById());
  }
}
}
