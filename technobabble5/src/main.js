"use strict";

let words1 = [];

let words2 = [];

let words3 = [];

window.onload = loadXmlXHR;

function loadXmlXHR() {
  const url = "data/babble-data.xml";
  const xhr = new XMLHttpRequest();

  xhr.onload = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    const xml = e.target.responseXML;
    if (xml == null) {
      document.querySelector("#output").innerHTML = "xml is null";
      return;
    }
    words1 = xml.querySelector("tech[cid='one']").textContent.split(",");
    words2 = xml.querySelector("tech[cid='two']").textContent.split(",");
    words3 = xml.querySelector("tech[cid='three']").textContent.split(",");

    // Couldn't use .map but I practiced some more with for each and for of

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
