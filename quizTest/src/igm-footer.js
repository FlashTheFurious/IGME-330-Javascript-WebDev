"use strict";

const colors = ["red", "green", "blue"];
//let htmlTemplate;
/*
function addToList() {
  const listItem = document.createElement("li");
  listItem.textContent = currentValue;
  document.querySelector("ol").appendChild(listItem);
}

colors.map(addToList);
*/
for (let clr of colors) {
  const listItem = document.createElement("li");
  listItem.textContent = `${clr}`;
  document.querySelector("ol").appendChild(listItem);
}
