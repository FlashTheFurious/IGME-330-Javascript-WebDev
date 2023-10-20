"use strict";

let words1 = [];

let words2 = [];

let words3 = [];

window.onload = loadTextXHR;

function loadTextXHR() {
  const url = "data/babble-data.csv";
  const xhr = new XMLHttpRequest();

  xhr.onload = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    const text = e.target.responseText;
    console.log(`Success - the file length is ${text.length}`);
    // text.split turns a string into an array
    const lines = text.split("\n"); // Splitting with \n will split the data by lines.

    words1 = lines[0].split(",");
    words2 = lines[1].split(",");
    words3 = lines[2].split(",");

    // Event Listener
    document.querySelector("#one").addEventListener("click", function (e) {
      generateTechno(1);
    });
    document.querySelector("#five").addEventListener("click", function (e) {
      generateTechno(5);
    });

    generateTechno(1);
  };

  xhr.onerror = (e) =>
    console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
  xhr.open("GET", url);

  xhr.send();
}

function randEl(array) {
  return array[Math.floor(Math.random() * words1.length)];
}

function generateTechno(num) {
  let babble = ``;
  for (let i = 1; i <= num; i++) {
    const line = `${randEl(words1)} ${randEl(words2)} ${randEl(words3)}!`;
    babble += line + `\n`;
  }
  document.querySelector("#output").innerHTML = babble;
}
