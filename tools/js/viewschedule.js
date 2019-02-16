var matchObj;
var row;
var table;

function grabMatch() {
  return JSON.parse(localStorage.matchObj);
}

 function printMatches(matchObj) {
 var i;
 var matches = JSON.parse(localStorage.matchObj);
 console.log(matches);
 for(i = 0; i < matches.length; i++) {
   red1 = parseInt(matches[i].alliances.red.team_keys[0].substr(3), 10);
   red2 = parseInt(matches[i].alliances.red.team_keys[1].substr(3), 10);
   red3 = parseInt(matches[i].alliances.red.team_keys[2].substr(3), 10);
   blue1 = parseInt(matches[i].alliances.blue.team_keys[0].substr(3), 10);
   blue2 = parseInt(matches[i].alliances.blue.team_keys[1].substr(3), 10);
   blue3 = parseInt(matches[i].alliances.blue.team_keys[2].substr(3), 10);

   if(!document.getElementsByTagName) {return}

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
  teamno = document.createTextNode(i+1);
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
}};

document.addEventListener("DOMContentLoaded", function() {
  console.log('loaded up');
  printMatches(grabMatch());
});
