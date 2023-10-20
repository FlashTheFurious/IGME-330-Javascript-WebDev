/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from "./utils.js";

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData;

let barWidth; // set in setupCanvas
let barHeight; // changes with time
let barX = 0;
let bufferLength;
let maxCircleBarHeight;
const padding = 2;
let middleY;
let gLineStrokeStyle, gBarStrokeStyle, gBackgroundColor;

let lineCB, lineColor, barColor, backColor;
lineCB = document.querySelector("#lineCB");
lineColor = document.querySelector("#lineStrokeSelect");
barColor = document.querySelector("#barStrokeSelect");
backColor = document.querySelector("#background-color");

//Matrix variables
let matrixLineColor;
let matrixBarColor;
let matrixBackColor;

//Bloodmoon variables
let bloodLineColor;
let bloodBarColor;
let bloodBackColor;

//Bumblebee variables
let bumbleLineColor;
let bumbleBarColor;
let bumbleBackColor;

//Classic variables
let classicLineColor;
let classicBarColor;
let classicBackColor;

//let matrixPreset, classicPreset, bloodmoonPreset, bumblebeePreset;
let globalTESTING = "Hello";
console.log(globalTESTING);

function loadJsonFetch() {
  globalTESTING = "Changed to Fetch";
  console.log(globalTESTING);

  const url = "./data/colors.json";
  const fetchPromise = async () => {
    let response = await fetch(url);
    if (!response.ok) {
      if (response.status == 404) console.log("Do 404 stuff!");
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await until the second promise is resolved
    // Meaning we now have a JSON object
    let json = await response.json();

    //Here I load in all of the preset color values for bar, background and line.

    matrixLineColor = json.matrix.lineStroke;
    matrixBarColor = json.matrix.barStroke;
    matrixBackColor = json.matrix.background;

    bumbleLineColor = json.bumblebee.lineStroke;
    bumbleBarColor = json.bumblebee.barStroke;
    bumbleBackColor = json.bumblebee.background;

    bloodLineColor = json.bloodmoon.lineStroke;
    bloodBarColor = json.bloodmoon.barStroke;
    bloodBackColor = json.bloodmoon.background;

    classicLineColor = json.classic.lineStroke;
    classicBarColor = json.classic.barStroke;
    classicBackColor = json.classic.background;

    /* 
    console.log(json.matrix.barStroke);
    console.log(bloodBarColor);
    console.log(classicLineColor);
    console.log(bumbleBackColor);*/
  }; // End of Json scope

  fetchPromise().catch((e) => {
    console.log(`In catch with e = ${e}`);
  });
}

//This code allowed us to hide that the user needs to click each control to display it at
//the start of the program, but it now interferes with the radio presets so I'm scrapping it

/*let backgroundChangedOnce = false;
let barsChangedOnce = false;
let lineChangedOnce = false;
*/

//I decided noise was not really an addition that would work well with this visualizer.
//I scrapped the entire effect.

//Allows to change noise color

let d = document.createElement("div");
d.style.display = "none";
document.body.appendChild(d);

// Helper Function for making a grayscale/monochrome Color scheme, i.e, the 'classic' preset
// It returns the rgb values returned by extractRGBfromString()
function convertNameToRGB(colorName) {
  d.style.color = colorName;

  //Get Color in RGB
  let rgbString = window.getComputedStyle(d).color;
  return extractRGBfromString(rgbString);
}

// Helper function for the Helper function
// it returns an array with 3 items, which are the rgb values in order
function extractRGBfromString(rgbString) {
  //Removes start
  let slicedString = rgbString.slice(4);
  //Remove end
  let replacedString = slicedString.replace(")", "");
  //Convert to array
  let rgbArray = replacedString.split(",");
  return rgbArray;
}
//console.log(convertNameToRGB("cyan"));
function setupColorSelect() {
  //Get preset color values setup
  loadJsonFetch();

  document.querySelector("#lineStrokeSelect").onchange = function (e) {
    // lineChangedOnce = true;
    if (
      e.target.value == "linearGradient" ||
      e.target.value == "radialGradient" ||
      e.target.value == "black-white" ||
      e.target.value == "white-black" ||
      e.target.value == "black-red" ||
      e.target.value == "blue-cyan" ||
      e.target.value == "black-yellow" ||
      e.target.value == "green-lime"
    ) {
      gLineStrokeStyle = returnGradient(e.target.value);
    } else {
      gLineStrokeStyle = e.target.value;
    }
  };
  document.querySelector("#background-color").onchange = function (e) {
    // backgroundChangedOnce = true;
    if (
      e.target.value == "linearGradient" ||
      e.target.value == "radialGradient" ||
      e.target.value == "black-white" ||
      e.target.value == "white-black" ||
      e.target.value == "black-red" ||
      e.target.value == "blue-cyan" ||
      e.target.value == "black-yellow" ||
      e.target.value == "green-lime"
    ) {
      gBackgroundColor = returnGradient(e.target.value);
    } else {
      gBackgroundColor = e.target.value;
    }
  };
  document.querySelector("#barStrokeSelect").onchange = function (e) {
    // barsChangedOnce = true;
    if (
      e.target.value == "linearGradient" ||
      e.target.value == "radialGradient" ||
      e.target.value == "black-white" ||
      e.target.value == "white-black" ||
      e.target.value == "black-red" ||
      e.target.value == "blue-cyan" ||
      e.target.value == "black-yellow" ||
      e.target.value == "green-lime"
    ) {
      gBarStrokeStyle = returnGradient(e.target.value);
    } else {
      gBarStrokeStyle = e.target.value;
    }
  };
}
//Helper function to build gradients and return them based on target value passed in
function returnGradient(targetValue) {
  if (targetValue == "linearGradient") {
    let grad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    grad.addColorStop(0, "blue");
    grad.addColorStop(0.3, "cyan");
    grad.addColorStop(0.6, "yellow");
    grad.addColorStop(1, "red");

    return grad;
  } else if (targetValue == "radialGradient") {
    let grad = ctx.createRadialGradient(400, 0, 200, 400, 100, 350);
    grad.addColorStop(0, "red");
    grad.addColorStop(1 / 6, "orange");
    grad.addColorStop(2 / 6, "yellow");
    grad.addColorStop(3 / 6, "green");
    grad.addColorStop(4 / 6, "aqua");
    grad.addColorStop(5 / 6, "blue");
    grad.addColorStop(1, "purple");

    return grad;
  } else if (targetValue == "blue-cyan") {
    let grad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    grad.addColorStop(0, "darkblue");
    grad.addColorStop(0.25, "blue");
    grad.addColorStop(0.5, "cyan");
    grad.addColorStop(0.75, "blue");
    grad.addColorStop(1, "darkblue");
    return grad;
  } else if (targetValue == "black-white") {
    let grad = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
      { percent: 0, color: "black" },
      { percent: 0.25, color: "black" },
      { percent: 0.5, color: "white" },
      { percent: 0.75, color: "black" },
      { percent: 1, color: "black" },
    ]);
    return grad;
  } else if (targetValue == "white-black") {
    let grad = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
      { percent: 0, color: "white" },
      { percent: 0.25, color: "white" },
      { percent: 0.5, color: "black" },
      { percent: 0.75, color: "white" },
      { percent: 1, color: "white" },
    ]);
    return grad;
  } else if (targetValue == "black-red") {
    let grad = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
      { percent: 0, color: "black" },
      { percent: 0.25, color: "black" },
      { percent: 0.5, color: "red" },
      { percent: 0.75, color: "black" },
      { percent: 1, color: "black" },
    ]);
    return grad;
  } else if (targetValue == "black-yellow") {
    let grad = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
      { percent: 0, color: "black" },
      { percent: 0.25, color: "black" },
      { percent: 0.5, color: "yellow" },
      { percent: 0.75, color: "black" },
      { percent: 1, color: "black" },
    ]);
    return grad;
  } else if (targetValue == "green-lime") {
    let grad = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
      { percent: 0, color: "green" },
      { percent: 0.1, color: "lime" },
      { percent: 0.2, color: "green" },
      { percent: 0.3, color: "lime" },
      { percent: 0.4, color: "green" },
      { percent: 0.5, color: "lime" },
      { percent: 0.6, color: "green" },
      { percent: 0.7, color: "lime" },
      { percent: 0.8, color: "green" },
      { percent: 0.9, color: "lime" },
      { percent: 1, color: "green" },
    ]);
    return grad;
  }
}
function setupCanvas(canvasElement, analyserNodeRef) {
  setupColorSelect();

  // create drawing context
  ctx = canvasElement.getContext("2d");
  canvasWidth = canvasElement.width;
  canvasHeight = canvasElement.height;

  middleY = ctx.canvas.height / 2;

  // create a gradient that runs top to bottom
  gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
    { percent: 0, color: "darkblue" },
    { percent: 0.25, color: "blue" },
    { percent: 0.5, color: "cyan" },
    { percent: 0.75, color: "blue" },
    { percent: 1, color: "darkblue" },
  ]);
  // keep a reference to the analyser node
  analyserNode = analyserNodeRef;

  // Read only property of analyserNode,
  // contains num of data values we have in the analyser
  bufferLength = analyserNode.frequencyBinCount;
  //Buffer length will always be half of the fftSize property
  console.log("Num of data values is: " + bufferLength);

  barWidth = canvasWidth / bufferLength;
  maxCircleBarHeight = canvasHeight / 2;
  // this is the array where the analyser data will be stored
  audioData = new Uint8Array(bufferLength);
}

function draw(params = {}, cPreset) {
  //Set Preset Colors

  if (cPreset == "matrix") {
    gLineStrokeStyle = returnGradient("green-lime");
    gBarStrokeStyle = "black";
    gBackgroundColor = "black";
  } else if (cPreset == "bumblebee") {
    gLineStrokeStyle = "yellow";
    gBarStrokeStyle = "black";
    gBackgroundColor = returnGradient("black-yellow");
  } else if (cPreset == "classic") {
    gLineStrokeStyle = "white";
    gBarStrokeStyle = "black";
    gBackgroundColor = returnGradient("white-black");
  } else if (cPreset == "bloodmoon") {
    gLineStrokeStyle = "red";
    gBarStrokeStyle = "black";
    gBackgroundColor = returnGradient("black-red");
  } else if (cPreset == "custom") {
    gLineStrokeStyle = lineColor.value;
    gBarStrokeStyle = barColor.value;
    gBackgroundColor = backColor.value;

    if (
      lineColor.value == "linearGradient" ||
      lineColor.value == "radialGradient" ||
      lineColor.value == "black-white" ||
      lineColor.value == "white-black" ||
      lineColor.value == "black-red" ||
      lineColor.value == "blue-cyan" ||
      lineColor.value == "black-yellow" ||
      lineColor.value == "green-lime"
    ) {
      gLineStrokeStyle = returnGradient(lineColor.value);
    } else {
      gLineStrokeStyle = lineColor.value;
    }

    if (
      barColor.value == "linearGradient" ||
      barColor.value == "radialGradient" ||
      barColor.value == "black-white" ||
      barColor.value == "white-black" ||
      barColor.value == "black-red" ||
      barColor.value == "blue-cyan" ||
      barColor.value == "black-yellow" ||
      barColor.value == "green-lime"
    ) {
      gBarStrokeStyle = returnGradient(barColor.value);
    } else {
      gBarStrokeStyle = barColor.value;
    }

    if (
      backColor.value == "linearGradient" ||
      backColor.value == "radialGradient" ||
      backColor.value == "black-white" ||
      backColor.value == "white-black" ||
      backColor.value == "black-red" ||
      backColor.value == "blue-cyan" ||
      backColor.value == "black-yellow" ||
      backColor.value == "green-lime"
    ) {
      gBackgroundColor = returnGradient(backColor.value);
    } else {
      gBackgroundColor = backColor.value;
    }
  }

  // 1 populate the audioData array with the frequency data from the analyserNode
  // notice these arrays are passed "by reference"
  //analyserNode.getByteFrequencyData(audioData);
  // OR
  analyserNode.getByteTimeDomainData(audioData); // waveform data

  // 2 draw background
  ctx.save();
  ctx.fillStyle = "black";
  ctx.globalAlpha = 0.1;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.restore();
  // 3 draw gradient
  if (params.showGradient) {
    ctx.save();
    //This code fixes the background value being undefined at the start of the program

    ctx.fillStyle = gBackgroundColor;

    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
  }
  // 4 - draw bars
  if (params.showBars) {
    /* 
    
    // OLD HW CODE

    let barSpacing = 4;
    let margin = 5;
    let screenWidthForBars =
      canvasWidth - audioData.length * barSpacing - margin * 2;
    //let barWidth = screenWidthForBars / audioData.length;
    let barHeight = 200;
    let topSpacing = 100;

    ctx.save();
    //ctx.fillStyle = "rgba(255,255,255,0.50)";
    //ctx.strokeStyle = "rgba(0,0,0,0.50)";
    if (barsChangedOnce == false) {
      ctx.fillStyle = "violet";
      ctx.strokeStyle = "violet";
    } else {
      ctx.fillStyle = gBarStrokeStyle;
      ctx.strokeStyle = gBarStrokeStyle;
    }

    // loop through the data and draw!
    for (let i = 0; i < audioData.length; i++) {
      
      ctx.fillRect(
        margin + i * (barWidth + barSpacing),
        topSpacing + 256 - audioData[i],
        barWidth,
        barHeight
      );

      ctx.strokeRect(
        margin + i * (barWidth + barSpacing),
        topSpacing + 256 - audioData[i],
        barWidth,
        barHeight
      );
      
      
    }
    ctx.restore();
    */

    // New original code

    barX = 0; //This resets the position for the starting bar  in the next animation frame
    ctx.save();
    for (let i = 0; i < bufferLength; i++) {
      barHeight = audioData[i];
      ctx.fillStyle = gBarStrokeStyle;
      ctx.fillRect(barX, canvasHeight - barHeight, 5, barHeight);
      barX += barWidth;
    }
    ctx.restore();
  }

  // 5 draw circles
  if (params.showCircles) {
    let maxRadius = canvasHeight / 3;

    ctx.save();
    //ctx.fillStyle = "blue";
    ctx.globalAlpha = 0.5;

    if (cPreset == "matrix") {
      for (let i = 0; i < audioData.length; i++) {
        //  Middle Circles - not so transparent
        let percent = audioData[i] / 255;

        let circleRadius = percent * maxRadius;

        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(0, 0, 0, 0.9 - percent / 2.0);
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();

        // Outer Circles , more transparent
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(
          percent * 50,
          255,
          20,
          0.1 - percent / 10.0
        );

        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 1.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();

        // SMALLEST CIRCLES
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(
          0,
          80 + percent * 350,
          0,
          0.94 - percent / 4.0
        );
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 0.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
      ctx.restore();
    } else if (cPreset == "bumblebee") {
      for (let i = 0; i < audioData.length; i++) {
        //  Middle Circles - not so transparent
        let percent = audioData[i] / 255;

        let circleRadius = percent * maxRadius;

        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(0, 0, 0, 0.9 - percent / 2.0);
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();

        // Outer Circles , more transparent
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(255, 255, 0, 0.1 - percent / 10.0);

        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 1.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();

        // SMALLEST CIRCLES
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(
          80 + percent * 350,
          80 + percent * 350,
          0,
          0.94 - percent / 4.0
        );
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 0.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
      ctx.restore();
    } else if (cPreset == "classic") {
      for (let i = 0; i < audioData.length; i++) {
        //  Middle Circles - not so transparent
        let percent = audioData[i] / 255;

        let circleRadius = percent * maxRadius;

        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(
          audioData[i] + 50,
          audioData[i] + 50,
          audioData[i] + 50,
          0.9 - percent / 2.0
        );
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();

        // Outer Circles , more transparent
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(0, 0, 0, 0.4 - percent / 10.0);

        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 1.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();

        // SMALLEST CIRCLES
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(255, 255, 255, 0.94 - percent / 4.0);
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 0.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
      ctx.restore();
    } else if (cPreset == "bloodmoon") {
      for (let i = 0; i < audioData.length; i++) {
        //  Middle Circles - not so transparent
        let percent = audioData[i] / 255;

        let circleRadius = percent * maxRadius;

        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(0, 0, 0, 0.9 - percent / 2.0);
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();

        // Outer Circles , more transparent
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(
          255,
          percent * 20,
          percent * 20,
          0.1 - percent / 10.0
        );

        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 1.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();

        // SMALLEST CIRCLES
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(
          80 + percent * 350,
          0,
          0,
          0.94 - percent / 4.0
        );
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 0.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
      ctx.restore();
    } else if (cPreset == "custom") {
      for (let i = 0; i < audioData.length; i++) {
        // red-ish circles
        let percent = audioData[i] / 255;

        let circleRadius = percent * maxRadius;

        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(
          255,
          percent * 255,
          percent * 50,
          0.34 - percent / 3.0
        );
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();

        // blue-ish circles, bigger, more transparent
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(
          percent * 50,
          percent * 255,
          255,
          0.1 - percent / 10.0
        );
        //ctx.fillStyle = "blue";
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 1.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();
        //console.log(ctx.fillStyle);

        // yellow-ish circles, smaller
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = utils.makeColor(
          255,
          percent * 10,
          percent * 10,
          0.5 - percent / 5.0
        );
        ctx.arc(
          canvasWidth / 2,
          canvasHeight / 2,
          circleRadius * 0.5,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
      ctx.restore();
    }
  }
  // 9 - Show Lines
  if (params.showLine) {
    //line
    ctx.save();

    ctx.strokeStyle = gLineStrokeStyle;

    ctx.lineWidth = 3;
    let x = 0;
    let y = middleY + 200;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let b of audioData) {
      //moveTo()s
      ctx.lineTo(x, y - b); // y - (0-255) depending on b
      x += ctx.canvas.width / audioData.length;
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  // Show CircleBars - C
  if (params.showCircleBar) {
    // While I am aware this code is too many lines, I believe it would be less expensive on
    // the computer running the code, to do checks for cPreset once at the start of this block
    // of code rather than every single time we loop through the data in the audioData array.
    // This is also because we are already calling this block of code in an existing loop.

    //ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let barWidth = 15;
    ctx.save();
    analyserNode.getByteFrequencyData(audioData);
    ctx.fillStyle = "red";

    ctx.translate(canvasWidth / 2 - 6, middleY - 81);

    if (cPreset == "matrix") {
      for (let b of audioData) {
        //console.log(audioData.length);
        let percent = b / 255;
        if (percent < 0.2) {
          percent = 0.2;
        }
        ctx.translate(barWidth, 0);
        ctx.rotate((Math.PI * 2) / 30);
        ctx.save();
        ctx.scale(1, -1);
        ctx.fillStyle = `rgba(${100 - b}, ${b * 2}, ${100 - b}, 0.5)`;
        // ctx.fillStyle = `rgb(${b}, ${b - 128}, ${255 - b})`;
        ctx.fillRect(0, 0, barWidth, b * (percent * 2));
        ctx.restore();
        ctx.translate(padding, 0);
      }
    } else if (cPreset == "bumblebee") {
      for (let b of audioData) {
        //console.log(audioData.length);
        let percent = b / 255;
        if (percent < 0.2) {
          percent = 0.2;
        }
        ctx.translate(barWidth, 0);
        ctx.rotate((Math.PI * 2) / 30);
        ctx.save();
        ctx.scale(1, -1);

        ctx.fillStyle = `rgba(${b * 2}, ${b * 2}, ${100 - b}, 0.5)`;
        // ctx.fillStyle = `rgb(${b}, ${b - 128}, ${255 - b})`;
        ctx.fillRect(0, 0, barWidth, b * (percent * 2));
        ctx.restore();
        ctx.translate(padding, 0);
      }
    } else if (cPreset == "classic") {
      for (let b of audioData) {
        //console.log(audioData.length);
        let percent = b / 255;
        if (percent < 0.2) {
          percent = 0.2;
        }
        ctx.translate(barWidth, 0);
        ctx.rotate((Math.PI * 2) / 30);
        ctx.save();
        ctx.scale(1, -1);
        ctx.fillStyle = `rgba(${255 - b}, ${255 - b}, ${255 - b}, 0.5)`;
        // ctx.fillStyle = `rgb(${b}, ${b - 128}, ${255 - b})`;
        ctx.fillRect(0, 0, barWidth, b * (percent * 2));
        ctx.restore();
        ctx.translate(padding, 0);
      }
    } else if (cPreset == "bloodmoon") {
      for (let b of audioData) {
        //console.log(audioData.length);
        let percent = b / 255;
        if (percent < 0.2) {
          percent = 0.2;
        }
        ctx.translate(barWidth, 0);
        ctx.rotate((Math.PI * 2) / 30);
        ctx.save();
        ctx.scale(1, -1);
        ctx.fillStyle = `rgba(${b * 2}, ${100 - b}, ${100 - b}, 0.5)`;
        // ctx.fillStyle = `rgb(${b}, ${b - 128}, ${255 - b})`;
        ctx.fillRect(0, 0, barWidth, b * (percent * 2));
        ctx.restore();
        ctx.translate(padding, 0);
      }
    } else if (cPreset == "custom") {
      for (let b of audioData) {
        //console.log(audioData.length);
        let percent = b / 255;
        if (percent < 0.2) {
          percent = 0.2;
        }
        ctx.translate(barWidth, 0);
        ctx.rotate((Math.PI * 2) / 30);
        ctx.save();
        ctx.scale(1, -1);
        //ctx.fillStyle = `rgba(${b * 3}, ${b * 2 - 128}, ${b * 2}, 0.7)`;
        ctx.fillStyle = `rgb(${b}, ${b - 128}, ${255 - b})`;
        ctx.fillRect(0, 0, barWidth, b * (percent * 2));
        ctx.restore();
        ctx.translate(padding, 0);
      }
    }

    ctx.restore();
  }

  // 7 - Invert Colors
  if (params.showInvert) {
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width; // not using here
    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {
      let red = data[i],
        green = data[i + 1],
        blue = data[i + 2];
      data[i] = 255 - red; // Set red
      data[i + 1] = 255 - green; // Set green
      data[i + 2] = 255 - blue; // Set blue
    }
    // D) copy data back to canvas
    ctx.putImageData(imageData, 0, 0);
  }
}

export { setupCanvas, draw };
