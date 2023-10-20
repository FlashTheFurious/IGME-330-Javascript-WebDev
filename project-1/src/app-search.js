import * as storage from "./localStorage.js";

//Global Variables
let btnSearch;
let btnClearAll;
let fieldLimit;
let nameFilter;
let genreFilter;
let limitFilter;

import "./anime-card.js";

// Case 1: User searches using the 'All' Genre and no text in the name search field
// Case 2: User searches using the 'All' Genre and with text in the name search field
// Case 3: User searches using a specific Genre and no text in the name search field
// Case 4: User searches using a specific Genre and with text in the name search field
const showAnimeCard = (animeObj, genreF, nameF) => {
  if (genreF == "All" && nameF.trim() == "") {
    const animeCard = document.createElement("anime-card");
    animeCard.dataset.name = animeObj.name ?? "no name found";
    animeCard.dataset.year = animeObj.year ?? "?";
    animeCard.dataset.image = animeObj.image ?? "no img url";
    animeCard.dataset.genre = animeObj.genre ?? "no genre found";
    const likes = animeCard.shadowRoot.querySelector("#anime-likes");
    likes.remove();
    const removeBtn = animeCard.shadowRoot.querySelector(
      "#btn-remove-favorite"
    );
    removeBtn.setAttribute("style", "display:none;");
    document.querySelector("#element-card-holder").appendChild(animeCard);
  } else if (
    genreF == "All" &&
    animeObj.name.toLowerCase().trim().includes(nameF.trim().toLowerCase())
  ) {
    const animeCard = document.createElement("anime-card");
    animeCard.dataset.name = animeObj.name ?? "no name found";
    animeCard.dataset.year = animeObj.year ?? "?";
    animeCard.dataset.image = animeObj.image ?? "no img url";
    animeCard.dataset.genre = animeObj.genre ?? "no genre found";
    const likes = animeCard.shadowRoot.querySelector("#anime-likes");
    likes.remove();
    const removeBtn = animeCard.shadowRoot.querySelector(
      "#btn-remove-favorite"
    );
    removeBtn.setAttribute("style", "display:none;");
    document.querySelector("#element-card-holder").appendChild(animeCard);
  } else if (animeObj.genre == genreF && nameF.trim() == "") {
    const animeCard = document.createElement("anime-card");
    animeCard.dataset.name = animeObj.name ?? "no name found";
    animeCard.dataset.year = animeObj.year ?? "?";
    animeCard.dataset.image = animeObj.image ?? "no img url";
    animeCard.dataset.genre = animeObj.genre ?? "no genre found";
    const likes = animeCard.shadowRoot.querySelector("#anime-likes");
    likes.remove();
    const removeBtn = animeCard.shadowRoot.querySelector(
      "#btn-remove-favorite"
    );
    removeBtn.setAttribute("style", "display:none;");
    document.querySelector("#element-card-holder").appendChild(animeCard);
  } else if (
    animeObj.genre == genreF &&
    animeObj.name.toLowerCase().trim().includes(nameF.trim().toLowerCase())
  ) {
    const animeCard = document.createElement("anime-card");
    animeCard.dataset.name = animeObj.name ?? "no name found";
    animeCard.dataset.year = animeObj.year ?? "?";
    animeCard.dataset.image = animeObj.image ?? "no img url";
    animeCard.dataset.genre = animeObj.genre ?? "no genre found";
    const likes = animeCard.shadowRoot.querySelector("#anime-likes");
    likes.remove();
    const removeBtn = animeCard.shadowRoot.querySelector(
      "#btn-remove-favorite"
    );
    removeBtn.setAttribute("style", "display:none;");
    document.querySelector("#element-card-holder").appendChild(animeCard);
  }
};

function loadJsonAnimeFetch(
  displayCallback,
  genreFilter,
  numOfResults,
  nameFilter
) {
  const url = "https://api.jikan.moe/v4/anime";
  const fetchPromise = async () => {
    // await ( "stay on this line") until the first promise is resolved
    // let response = await fetch("https://swapi.dev/api/people/1");
    let response = await fetch(url);
    // if the response is not successfull, throw an error
    if (!response.ok) {
      if (response.status == 404) console.log("Do 404 stuff!");
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // await ( "stay on this line") until the second promise is resolved
    // Meaning we now have a JSON object
    let json = await response.json();

    // Here is where I filter the results based on the parameters passed in, if any.
    // I tried a switch statement and it didn't work. It pains me to do it, but I must use a ton of if{} else if{} blocks

    if (numOfResults == 1) {
      for (let i = 0; i < 1; i++) {
        displayCallback(
          {
            name: json["data"][i]["title"],
            year: json["data"][i]["year"],
            genre: json["data"][i]["genres"][0]["name"],
            image: json["data"][i]["images"]["jpg"]["large_image_url"],
          },
          genreFilter,
          nameFilter
        );
      }
    } else if (numOfResults == 5) {
      for (let i = 0; i < 5; i++) {
        displayCallback(
          {
            name: json["data"][i]["title"],
            year: json["data"][i]["year"],
            genre: json["data"][i]["genres"][0]["name"],
            image: json["data"][i]["images"]["jpg"]["large_image_url"],
          },
          genreFilter,
          nameFilter
        );
      }
    } else if (numOfResults == 10) {
      for (let i = 0; i < 10; i++) {
        displayCallback(
          {
            name: json["data"][i]["title"],
            year: json["data"][i]["year"],
            genre: json["data"][i]["genres"][0]["name"],
            image: json["data"][i]["images"]["jpg"]["large_image_url"],
          },
          genreFilter,
          nameFilter
        );
      }
    } else if (numOfResults == 15) {
      for (let i = 0; i < 15; i++) {
        displayCallback(
          {
            name: json["data"][i]["title"],
            year: json["data"][i]["year"],
            genre: json["data"][i]["genres"][0]["name"],
            image: json["data"][i]["images"]["jpg"]["large_image_url"],
          },
          genreFilter,
          nameFilter
        );
      }
    } else if (numOfResults == 20) {
      for (let i = 0; i < 20; i++) {
        displayCallback(
          {
            name: json["data"][i]["title"],
            year: json["data"][i]["year"],
            genre: json["data"][i]["genres"][0]["name"],
            image: json["data"][i]["images"]["jpg"]["large_image_url"],
          },
          genreFilter,
          nameFilter
        );
      }
    } else if (numOfResults == 25) {
      for (let i = 0; i < 25; i++) {
        displayCallback(
          {
            name: json["data"][i]["title"],
            year: json["data"][i]["year"],
            genre: json["data"][i]["genres"][0]["name"],
            image: json["data"][i]["images"]["jpg"]["large_image_url"],
          },
          genreFilter,
          nameFilter
        );
      }
    }
  }; // End of Json scope

  fetchPromise().catch((e) => {
    console.log(`In catch with e = ${e}`);
  });
}

function loadJsonGenreXHR() {
  const url = "https://api.jikan.moe/v4/genres/anime";

  const xhr = new XMLHttpRequest();
  xhr.onload = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    let json;
    try {
      json = JSON.parse(e.target.responseText);
    } catch {
      document.querySelector("#element-status").innerHTML = "BAD JSON!";
      return;
    }

    // #3 - array.map()
    document.querySelector("#field-genre").innerHTML += ` ${json["data"]
      .map(
        (anime) => `<option value="${anime["name"]}">${anime["name"]}</option>`
      )
      .join("")}`;
  };
  xhr.onerror = (e) =>
    console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
  xhr.open("GET", url);
  xhr.send();

  document.querySelector("#field-name").value = storage.getNameFilter();
  document.querySelector("#field-genre").value = storage.getGenreFilter();
  document.querySelector("#field-limit").value = storage.getLimitFilter();
}
/*
function selectElement(id, valueToSelect) {
  let element = document.querySelector(`"#${id}"`);
  element.value = valueToSelect;
}
*/

function init() {
  loadJsonGenreXHR();

  btnSearch = document.querySelector("#btn-search");
  btnSearch.onclick = passFilters;

  btnClearAll = document.querySelector("#btn-clear-all");
  btnClearAll.onclick = clearResults;

  fieldLimit = document.querySelector("#field-limit");
  fieldLimit.onchange = (evt) => {
    limitFilter = evt.target.value;
  };

  loadJsonAnimeFetch(showAnimeCard);

  console.log(storage.getNameFilter());
  console.log(storage.getGenreFilter());
  console.log(storage.getLimitFilter());

  //selectElement("field-name", storage.getNameFilter());
  /*
  document.querySelector("#field-name").value = storage.getNameFilter();
  document.querySelector("#field-genre").value = storage.getGenreFilter();
  document.querySelector("#field-limit").value = storage.getLimitFilter();
  */
}

init();

function clearResults() {
  document.querySelector("#element-card-holder").innerHTML = ` `;
}
function passFilters() {
  nameFilter = document.querySelector("#field-name").value;
  genreFilter = document.querySelector("#field-genre").value;
  limitFilter = document.querySelector("#field-limit").value;

  // Save UI State
  storage.setGenreFilter(genreFilter);
  storage.setLimitFilter(limitFilter);
  storage.setNameFilter(nameFilter);

  clearResults();

  loadJsonAnimeFetch(showAnimeCard, genreFilter, limitFilter, nameFilter);
}

document.querySelector("#field-name").value = storage.getNameFilter();
document.querySelector("#field-genre").value = storage.getGenreFilter();
document.querySelector("#field-limit").value = storage.getLimitFilter();
