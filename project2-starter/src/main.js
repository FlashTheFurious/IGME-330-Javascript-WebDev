/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!
import * as canvas from "./canvas.js";
import * as utils from "./utils.js";
import * as audio from "./audio.js";

const drawParams = {
  showGradient: true,
  showBars: true,
  showCircles: true,
  showInvert: false,
  showLine: true,
  showCircleBar: true,
};

//Start Preset as matrix
let colorPreset = "matrix";

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
  sound1: "media/Hucci-Vision.mp3",
});

function init() {
  audio.setupWebAudio(DEFAULTS.sound1);

  //This reads better
  let gradientCheckbox = document.querySelector("#gradientCB");
  let barsCheckbox = document.querySelector("#barsCB");
  let circlesCheckbox = document.querySelector("#circlesCB");
  let invertCheckbox = document.querySelector("#invertCB");
  let lineCheckbox = document.querySelector("#lineCB");
  let circleBarCheckbox = document.querySelector("#circleBarCB");

  // Make sure these values are in sync with the starting ones above in drawParams
  gradientCheckbox.checked = true;
  barsCheckbox.checked = true;
  circlesCheckbox.checked = true;
  invertCheckbox.checked = false;

  lineCheckbox.checked = true;
  circleBarCheckbox.checked = true;

  gradientCheckbox.onchange = () => {
    if (gradientCheckbox.checked == true) {
      drawParams.showGradient = true;
      //console.log(drawParams);
    } else if (gradientCheckbox.checked == false) {
      //drawParams["showCircles"] = false; // also works
      drawParams.showGradient = false;
      //console.log(drawParams);
    }
  };

  barsCheckbox.onchange = () => {
    if (barsCheckbox.checked == true) {
      drawParams.showBars = true;
      //console.log(drawParams);
    } else if (barsCheckbox.checked == false) {
      //drawParams["showCircles"] = false; // also works
      drawParams.showBars = false;
      //console.log(drawParams);
    }
  };

  circlesCheckbox.onchange = () => {
    if (circlesCheckbox.checked == true) {
      drawParams.showCircles = true;
      //console.log(drawParams);
    } else if (circlesCheckbox.checked == false) {
      //drawParams["showCircles"] = false; // also works
      drawParams.showCircles = false;
      //console.log(drawParams);
    }

    //console.log(drawParams);
  };

  invertCheckbox.onchange = () => {
    if (invertCheckbox.checked == true) {
      drawParams.showInvert = true;
      //console.log(drawParams);
    } else if (invertCheckbox.checked == false) {
      //drawParams["showCircles"] = false; // also works
      drawParams.showInvert = false;
      //console.log(drawParams);
    }
  };

  lineCheckbox.onchange = () => {
    if (lineCheckbox.checked == true) {
      drawParams.showLine = true;
    } else if (lineCheckbox.checked == false) {
      drawParams.showLine = false;
    }
    console.log(drawParams.showLine);
  };
  circleBarCheckbox.onchange = () => {
    if (circleBarCheckbox.checked == true) {
      drawParams.showCircleBar = true;
    } else if (circleBarCheckbox.checked == false) {
      drawParams.showCircleBar = false;
    }
  };
  console.log("init called");
  console.log(
    `Testing utils.getRandomColor() import: ${utils.getRandomColor()}`
  );

  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement, audio.analyserNode);
  loop();
}

function setupUI(canvasElement) {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
  const playButton = document.querySelector("#playButton");
  // add .onclick event to button
  fsButton.onclick = (e) => {
    console.log("init called");
    utils.goFullscreen(canvasElement);
  };

  // add.onclick event to button
  playButton.onclick = (e) => {
    //console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    //check if context is in suspended state(autoplay policy)
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }
    //console.log(`audioCtx.state after = ${audio.audioCtx.state}`);

    if (e.target.dataset.playing == "no") {
      //if track is currently paused, play it
      audio.playCurrentSound();
      e.target.dataset.playing = "yes"; //Css will set text to Pause
    } else {
      // if track IS playing, pause it
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no"; //Css will set text to Play
    }
  };

  // C - hookup volume slider and label
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");

  // add .oninput  event to slider = e=>
  volumeSlider.oninput = (e) => {
    //set the gain
    audio.setVolume(e.target.value);
    //update value of label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value / 2) * 100);
  };

  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  // D - hookup track <select>
  let trackSelect = document.querySelector("#trackSelect");
  // add .onchange event to <select>
  trackSelect.onchange = (e) => {
    audio.loadSoundFile(e.target.value);
    document.querySelector("#selectedTrack").src = e.target.value;
    // if track IS playing, pause it
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  // Radio buttons for color preset
  let matrixRadio, bumblebeeRadio, classicRadio, bloodmoonRadio, customRadio;

  matrixRadio = document.querySelector("#matrix");
  bumblebeeRadio = document.querySelector("#bumblebee");
  classicRadio = document.querySelector("#classic");
  bloodmoonRadio = document.querySelector("#bloodmoon");
  customRadio = document.querySelector("#custom");

  // Event listeners for color preset
  matrixRadio.onclick = () => {
    colorPreset = "matrix";
  };
  bumblebeeRadio.onclick = () => {
    colorPreset = "bumblebee";
  };
  classicRadio.onclick = () => {
    colorPreset = "classic";
  };
  bloodmoonRadio.onclick = () => {
    colorPreset = "bloodmoon";
  };
  customRadio.onclick = () => {
    colorPreset = "custom";
  };
} // end setupUI

function loop() {
  requestAnimationFrame(loop);
  canvas.draw(drawParams, colorPreset);
}
export { init };
