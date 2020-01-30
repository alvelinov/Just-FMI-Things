"use strict"

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

function updateStorage(input){
    var request = new XMLHttpRequest();
    request.open("PUT", "https://api.jsonbin.io/b/5e2f003e50a7fe418c54c850", true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("secret-key", "$2b$10$FZS5ldLSY118Mf6fmsCuguUfQmTzl.9pxBeZm77wyoSAtmqBpLI7.");
    request.setRequestHeader("versioning", false);
    request.send(JSON.stringify(input));
}

function notempty(name){
    return name + " should not be empty";
}

function getFormData(){
    return {
            "firstname": document.getElementsByName("firstname")[0].value,
            "lastname": document.getElementsByName("lastname")[0].value,
            "fn": document.getElementsByName("fn")[0].value,
            "specialty" : document.getElementsByName("specialty")[0].value
    };
}



function validate(data, storage){
    let errors = "";    
    if(!data.firstname){
        errors += notempty("First name") + "<br>";
    }
    if(!data.lastname){
        errors += notempty("Last name") + "<br>"; 
    }
    if(!data.fn){
        errors += notempty("Faculty Number") + "<br>";
    } else if(!Number(data.fn)){
        errors += "Faculty Number should be an integer <br>";
    } else if(storage.attendees.filter(attendee =>  attendee.fn == data.fn).length){
        errors += "A person with this faculty number already exists! <br>";   
    }
   
   return errors;
}
  
function redirect(){
    window.location.href = "list.html";
}
  
async function register(){
    let storage = await getStorage();
    let data = getFormData();
    let errors = validate(data, storage);
    if(errors.length){
        document.getElementById("errors").innerHTML = errors;
    } else {
        storage.attendees.push(data);
        console.log(storage);
        updateStorage(storage);
        setTimeout(redirect, 1000);
    }
}