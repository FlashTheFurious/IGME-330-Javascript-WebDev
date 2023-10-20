"use strict";

let words1 = [];

let words2 = [];

let words3 = [];

window.onload = loadJsonXHR;

function loadJsonXHR() {
  const url = "data/babble-data.json";
  const xhr = new XMLHttpRequest();

  xhr.onload = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    const string = e.target.responseText;
    let json;
    try {
      json = JSON.parse(string);
    } catch {
      document.querySelector("#output").innerHTML = "BAD JSON!!!";
      return;
    }
    //const keys = Object.keys(json);

    words1 = json["5933a90f"]["techlist"];
    words2 = json["b32de36e"]["techlist"];
    words3 = json["72b6ab68"]["techlist"];

    /*
    const key1 = keys[0];
    const obj1 = json[key1];
    const anotherOne = obj1["techlist"];
    console.log(anotherOne);
    console.log(json[keys[0]]["techlist"]);
*/
    generateTechno(1);

    // Event Listener
    document.querySelector("#one").addEventListener("click", function (e) {
      generateTechno(1);
    });
    document.querySelector("#five").addEventListener("click", function (e) {
      generateTechno(5);
    });
  };

  xhr.onerror = (e) =>
    console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
  xhr.open("GET", url);

  xhr.send();
}

function randEl(array) {
  return array[Math.floor(Math.random() * words1.length)];
}

//I shortened the generateTechno Function
function generateTechno(num) {
  let babble = ``;
  for (let i = 1; i <= num; i++) {
    const line = `${randEl(words1)} ${randEl(words2)} ${randEl(words3)}!`;
    babble += line + `\n`;
  }
  document.querySelector("#output").innerHTML = babble;
}
