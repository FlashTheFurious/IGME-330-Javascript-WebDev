// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
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

let listFavorites;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//console.log(app); // make sure firebase is loaded

// #2 NEW STUFF
const db = getDatabase(app);
const animeRef = ref(db, "animes");

//console.log(animeRef);
/* 
const writeFavoriteData = (animeObj, animeName) => {
  set(ref(db, "animes/" + animeName), {
    name: animeName,
    genre: animeObj["genre"],
    year: animeObj["year"],
    img: animeObj["imgURL"],
  });
};
*/

//This function displays the changed community likes for the animes
const likesChanged = (snapshot) => {
  snapshot.forEach((anime) => {
    const childKey = anime.key;
    const childData = anime.val();
    //orderBy(childData["likes"]);
    showAnimeCard(childData, childData["likes"]);
  });

  //console.log(childKey, childData);
  //console.log(childKey, +" " + childData["likes"]);
  //tempHtml += `<li> ${childData["name"]} - ${childData["genre"]} - ${childData["year"]} - ${childData["likes"]}  </li>`;
  //document.querySelector("#element-status").innerHTML = tempHtml;
};

const showAnimeCard = (animeObj, likesCounter) => {
  const animeCard = document.createElement("anime-card");

  const addBtn = animeCard.shadowRoot.querySelector("#btn-add-favorite");
  const removeBtn = animeCard.shadowRoot.querySelector("#btn-remove-favorite");
  addBtn.setAttribute("style", "display:none;");
  removeBtn.setAttribute("style", "display:none;");

  const likesPara = animeCard.shadowRoot.querySelector("#anime-likes");
  likesPara.innerHTML = "Likes: " + likesCounter;

  animeCard.dataset.name = animeObj.name ?? "no name found";
  animeCard.dataset.year = animeObj.year ?? "?";
  animeCard.dataset.image = animeObj.img ?? "no img url";
  animeCard.dataset.genre = animeObj.genre ?? "no genre found";
  listFavorites.appendChild(animeCard);
};

const init = () => {
  //const db = getDatabase();
  //const animeRef = ref(db, "animes");

  listFavorites = document.querySelector("#list-favorites");
  onValue(animeRef, likesChanged, { onlyOnce: false });
  // document.onload = likesChanged;
};

init();
