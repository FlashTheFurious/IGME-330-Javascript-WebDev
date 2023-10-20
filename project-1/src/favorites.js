/* Checked by ESLint - https://eslint.org/demo */
import * as storage from "./localStorage.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  increment,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPg7H7gU2AQuM2TDCBAdjpfp4F4PwgXcw",
  authDomain: "project1-7e073.firebaseapp.com",
  projectId: "project1-7e073",
  storageBucket: "project1-7e073.appspot.com",
  messagingSenderId: "743499161338",
  appId: "1:743499161338:web:a418b7f97d68e31107f343",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);

let listFavorites = null;
const showAnimeCard = (animeObj) => {
  const animeCard = document.createElement("anime-card");
  const addBtn = animeCard.shadowRoot.querySelector("#btn-add-favorite");
  addBtn.setAttribute("disabled", "");
  addBtn.innerHTML = "Favorited !";
  animeCard.dataset.name = animeObj.name ?? "no name found";
  animeCard.dataset.year = animeObj.year ?? "?";
  animeCard.dataset.image = animeObj.image ?? "no img url";
  animeCard.dataset.genre = animeObj.genre ?? "no genre found";
  document.querySelector("#list-favorites").appendChild(animeCard);
};
function loadFavoriteList(displayCallback) {
  let favList = storage.getFavorites();
  console.log(favList);
  //for (let i = 0; i < storage.getFavorites().length; i++)
  for (let anime of favList) {
    displayCallback({
      name: anime["name"],
      year: anime["year"],
      genre: anime["genre"],
      image: anime["imgURL"],
    });
  }
}
const showFavorites = () => {
  // grab the array of favorites from localStorage and
  const favArray = storage.getFavorites();
  // update `listFavorites`
  listFavorites.innerHTML = "";

  loadFavoriteList(showAnimeCard);

  if (Object.keys(favArray).length > 0) {
    document.querySelector("#element-status").innerHTML =
      "Your list is starting to come together MAGNIFICENTLY";
  }
};

const init = () => {
  //const db = getDatabase();
  //const animeRef = ref(db, "animes");

  initializeApp(firebaseConfig);

  listFavorites = document.querySelector("#list-favorites");
  showFavorites();

  /* Event Handlers */
  document.querySelector("#btn-clear-favorites").onclick = () => {
    // get this button working
    storage.clearFavorites();
    showFavorites();

    document.querySelector("#element-status").innerHTML =
      "Starting from Zero again";
  };

  document.querySelector("#btn-app-preferences").onclick = () => {
    // get this button working
    storage.clearLocalStorage();
    showFavorites();
    document.querySelector("#element-status").innerHTML =
      "Starting from Zero again";
  };

  document.querySelector("#btn-share").onclick = () => {
    writeFavoriteData(storage.getFavorites());
    document.querySelector("#btn-share").innerHTML = "Favorites Shared!";
    document.querySelector("#btn-share").setAttribute("disabled", "");
  };

  window.onstorage = () => {
    showFavorites();
    //showAppTitle();
  };
};

console.log(app); // make sure firebase is loaded

// #2 NEW STUFF

const writeFavoriteData = (animeObj) => {
  const db = getDatabase(app);

  for (let anime of animeObj) {
    const animeRef = ref(db, "animes/" + anime["name"]);
    set(animeRef, {
      name: anime["name"],
      likes: increment(1),
      genre: anime["genre"],
      year: anime["year"],
      img: anime["imgURL"],
    });
  }
};
/*
//This function displays the changed
const likesChanged = (snapshot) => {
  let tempHtml = ``;
  snapshot.forEach((anime) => {
    const childKey = anime.key;
    const childData = anime.val();
    console.log(childKey, childData);
    console.log(childKey, +" " + childData["likes"]);
    tempHtml += `<li> ${childData["name"]} - ${childData["genre"]} - ${childData["year"]} - ${childData["likes"]}  </li>`;
  });

  document.querySelector("#element-status").innerHTML = tempHtml;
};

const db = getDatabase(app);
const animeRef = ref(db, "animes");
onValue(animeRef, likesChanged, { onlyOnce: false });
*/
init();
