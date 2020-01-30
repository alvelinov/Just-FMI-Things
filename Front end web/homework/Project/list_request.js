"use strict";

function getStorage(){
  var request = new XMLHttpRequest();

  return new Promise(function (resolve, reject){
    request.onreadystatechange = function(){
      if(request.readyState  !== 4) return;
      if(request.status >= 200 && request.status < 300)
      {
        resolve(JSON.parse(request.responseText));
      }
      else{
        reject({
          status: request.status,
          statusText: request.statusText
        });
      }
    };

    request.open("GET", "https://api.jsonbin.io/b/5e2f003e50a7fe418c54c850/latest", true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("secret-key", "$2b$10$FZS5ldLSY118Mf6fmsCuguUfQmTzl.9pxBeZm77wyoSAtmqBpLI7.");
    request.send();
  });
}

async function drawData(name){
  let container = document.getElementById(name);
  let html = "<table>";
  html += "<caption>Participants</caption>";

  html += "<tr><th>First Name</th><th>Last Name</th><th>Faculty Number</th><th>Specialty</th></tr>";

  let data = await getStorage();
  data.attendees.forEach(item => {
    html += "<tr>";

    html+="<td>" + item.firstname + "</td>";
    html+="<td>" + item.lastname + "</td>";
    html+="<td>" + item.fn + "</td>";
    html+="<td>" + item.specialty + "</td>";

    html += "</tr>";
  });
  html += "</table>"

  container.innerHTML = html;
}

function clearAttendees(){
  updateStorage({event: "my event", attendees: []});
}