/* Checked by ESLint - https://eslint.org/demo */
const defaultData = {
    storedNameFilter: "",
    storedGenreFilter: "All",
    favorites: [],
    storedLimitFilter: 25,
  },
  storeName = "tab9663-p1-settings"; // TODO: change to your id

const readLocalStorage = () => {
  let allValues = null;

  try {
    allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
  } catch (err) {
    console.log(`Problem with JSON.parse() and ${storeName} !`);
    throw err;
  }

  return allValues;
};

const writeLocalStorage = (allValues) => {
  localStorage.setItem(storeName, JSON.stringify(allValues));
};

export const clearLocalStorage = () => writeLocalStorage(defaultData); // This also clears the favorites list

export const setLimitFilter = (limit) => {
  const allValues = readLocalStorage();

  allValues.storedLimitFilter = limit;
  writeLocalStorage(allValues);
};

export const getLimitFilter = () => readLocalStorage().storedLimitFilter;

export const setNameFilter = (name) => {
  const allValues = readLocalStorage();

  allValues.storedNameFilter = name;
  writeLocalStorage(allValues);
};

export const getNameFilter = () => readLocalStorage().storedNameFilter;

export const setGenreFilter = (genre) => {
  const allValues = readLocalStorage();

  allValues.storedGenreFilter = genre;
  writeLocalStorage(allValues);
};

export const getGenreFilter = () => readLocalStorage().storedGenreFilter;

export const addFavorite = (obj) => {
  const allValues = readLocalStorage();
  let alreadyInFavorites = false;
  //console.log(obj);
  //We push anime info into the fav list as strings

  for (let animeObj in allValues.favorites) {
    if (animeObj["name"] == obj["name"]) {
      alreadyInFavorites = true;
    }
  }

  if (alreadyInFavorites == false) {
    /*allValues.favorites.push(
      `Name: ${obj.name}, Genre: ${obj.genre}, Release Year: ${obj.year}, Image Url: ${obj.imgURL} `
    );*/
    allValues.favorites.push(obj);
  }

  console.log(allValues.favorites);

  writeLocalStorage(allValues);
};
export const removeFavorite = (obj) => {
  const allValues = readLocalStorage();

  for (let i = 0; i < allValues.favorites.length; i++) {
    if (allValues.favorites[i]["name"] == obj["name"]) {
      allValues.favorites.splice(i, 1);
      //console.log("WHat a STAAAARTTTT for  " + obj["name"]);
    }
  }

  writeLocalStorage(allValues);
};

export const getFavorites = () => readLocalStorage().favorites;

export const clearFavorites = () => {
  const allValues = readLocalStorage();

  allValues.favorites = [];
  writeLocalStorage(allValues);
};
