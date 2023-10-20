let gradientCB;
let matrixRadio, bumblebeeRadio, classicRadio, bloodmoonRadio, customRadio;

let lineColor;

function init() {
  gradientCB = document.querySelector("#gradientCB");

  matrixRadio = document.querySelector("#matrix");
  bumblebeeRadio = document.querySelector("#bumblebee");
  classicRadio = document.querySelector("#classic");
  bloodmoonRadio = document.querySelector("#bloodmoon");
  customRadio = document.querySelector("#custom");

  lineColor = document.querySelector("#lineStrokeSelect");

  // C - hookup volume slider and label
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");

  // add .oninput  event to slider = e=>
  volumeSlider.oninput = (e) => {
    //set the gain
    //audio.setVolume(e.target.value);
    //update value of label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value / 2) * 100);
  };

  // 2 - make a new dat.GUI instance and close it
  const gui = new dat.GUI({ width: 400 });
  gui.close();

  function setAllRadiosFalse() {
    matrixRadio.checked = false;
    bumblebeeRadio.checked = false;
    classicRadio.checked = false;
    bloodmoonRadio.checked = false;
    customRadio.checked = false;
  }

  gui.add(gradientCB, "checked").name("Gradient Checkbox");
  gui.add(volumeSlider, "value", 0, 2, 0.1).name("Track Volume: ");

  gui
    .add(matrixRadio, "checked")
    .name("matrixRadio")
    .listen()
    .onChange((e) => {
      setAllRadiosFalse();
      matrixRadio.checked = true;
    });

  gui
    .add(bumblebeeRadio, "checked")
    .name("bumblebeeRadio")
    .listen()
    .onChange((e) => {
      setAllRadiosFalse();
      bumblebeeRadio.checked = true;
    });
  gui
    .add(classicRadio, "checked")
    .name("classicRadio")
    .listen()
    .onChange((e) => {
      setAllRadiosFalse();
      classicRadio.checked = true;
    });
  gui
    .add(bloodmoonRadio, "checked")
    .name("bloodmoonRadio")
    .listen()
    .onChange((e) => {
      setAllRadiosFalse();
      bloodmoonRadio.checked = true;
    });
  gui
    .add(customRadio, "checked")
    .name("customRadio")
    .listen()
    .onChange((e) => {
      setAllRadiosFalse();
      customRadio.checked = true;
    });

  gui
    .add(lineColor, "value", {
      Black: "black",
      Red: "red",
      Green: "green",
      Blue: "blue",
      Rainbow_Linear_Gradient: "linearGradient",
    })
    .name("Line Color");
}

export { init };
