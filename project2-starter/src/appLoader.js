import * as main from "./main.js";
import "./p2-nav.js";
import "./app-footer.js";
import "./app-header.js";

window.onload = () => {
  console.log("window.onload called");
  // 1 - do preload here - load fonts, images, additional sounds, etc...

  // 2 - start up app
  main.init();
};
