"use strict";

const words1 = [
  "Acute",
  "Aft",
  "Anti-matter",
  "Bipolar",
  "Cargo",
  "Command",
  "Communication",
  "Computer",
  "Deuterium",
  "Dorsal",
  "Emergency",
  "Engineering",
  "Environmental",
  "Flight",
  "Fore",
  "Guidance",
  "Heat",
  "Impulse",
  "Increased",
  "Inertial",
  "Infinite",
  "Ionizing",
  "Isolinear",
  "Lateral",
  "Linear",
  "Matter",
  "Medical",
  "Navigational",
  "Optical",
  "Optimal",
  "Optional",
  "Personal",
  "Personnel",
  "Phased",
  "Reduced",
  "Science",
  "Ship's",
  "Shuttlecraft",
  "Structural",
  "Subspace",
  "Transporter",
  "Ventral",
];

const words2 = [
  "Propulsion",
  "Dissipation",
  "Sensor",
  "Improbability",
  "Buffer",
  "Graviton",
  "Replicator",
  "Matter",
  "Anti-matter",
  "Organic",
  "Power",
  "Silicon",
  "Holographic",
  "Transient",
  "Integrity",
  "Plasma",
  "Fusion",
  "Control",
  "Access",
  "Auto",
  "Destruct",
  "Isolinear",
  "Transwarp",
  "Energy",
  "Medical",
  "Environmental",
  "Coil",
  "Impulse",
  "Warp",
  "Phaser",
  "Operating",
  "Photon",
  "Deflector",
  "Integrity",
  "Control",
  "Bridge",
  "Dampening",
  "Display",
  "Beam",
  "Quantum",
  "Baseline",
  "Input",
];

const words3 = [
  "Chamber",
  "Interface",
  "Coil",
  "Polymer",
  "Biosphere",
  "Platform",
  "Thruster",
  "Deflector",
  "Replicator",
  "Tricorder",
  "Operation",
  "Array",
  "Matrix",
  "Grid",
  "Sensor",
  "Mode",
  "Panel",
  "Storage",
  "Conduit",
  "Pod",
  "Hatch",
  "Regulator",
  "Display",
  "Inverter",
  "Spectrum",
  "Generator",
  "Cloud",
  "Field",
  "Terminal",
  "Module",
  "Procedure",
  "System",
  "Diagnostic",
  "Device",
  "Beam",
  "Probe",
  "Bank",
  "Tie-In",
  "Facility",
  "Bay",
  "Indicator",
  "Cell",
];

// Event Listener
document.querySelector("#my-button").addEventListener("click", callOneBabble);
document.querySelector("#five").addEventListener("click", callFiveBabble);

//First Babble
callOneBabble();

function randomElement(array) {
  return array[Math.floor(Math.random() * words1.length)];
}

function callFiveBabble() {
  generateTechno(5);
}
function callOneBabble() {
  generateTechno(1);
}
function generateTechno(num) {
  for (let i = 0; i < num; i++) {
    if (num === 1) {
      const words = `${randomElement(words1)} ${randomElement(
        words2
      )} ${randomElement(words3)}!`;
      document.querySelector("#output").innerHTML = words;
    } else if (num === 5) {
      const wordsMany1 = `${randomElement(words1)} ${randomElement(
        words2
      )} ${randomElement(words3)}!`;
      const wordsMany2 = `${randomElement(words1)} ${randomElement(
        words2
      )} ${randomElement(words3)}!`;
      const wordsMany3 = `${randomElement(words1)} ${randomElement(
        words2
      )} ${randomElement(words3)}!`;
      const wordsMany4 = `${randomElement(words1)} ${randomElement(
        words2
      )} ${randomElement(words3)}!`;
      const wordsMany5 = `${randomElement(words1)} ${randomElement(
        words2
      )} ${randomElement(words3)}!`;
      document.querySelector("#output").innerHTML =
        wordsMany1 +
        "\n" +
        wordsMany2 +
        "\n" +
        wordsMany3 +
        "\n" +
        wordsMany4 +
        "\n" +
        wordsMany5;
    }
  }
}
