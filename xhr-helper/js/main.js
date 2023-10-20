// Your code goes here
import { loadTextXHR } from "./utils.js";

const btnTaffy = document.querySelector("#button-1");
const btnViking = document.querySelector("#button-2");
const outputTaffy = document.querySelector("#output-1");
const outputViking = document.querySelector("#output-2");

const vikingCB = (e) => (outputViking.innerHTML = e.target.responseText);
const taffyCB = (e) => (outputTaffy.innerHTML = e.target.responseText);

btnTaffy.onclick = () => loadTextXHR("data/taffy-facts.txt", taffyCB);
btnViking.onclick = () => loadTextXHR("data/viking-facts.txt", vikingCB);
