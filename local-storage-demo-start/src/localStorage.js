/* Checked by ESLint - https://eslint.org/demo */
const defaultData = {
    storedGenreFilter: "Default App Title",
    favorites: [],
    storedNameFilter: "",
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

export const addFavorite = (str) => {
  const allValues = readLocalStorage();
  console.log(str);
  allValues.favorites.push(str);
  writeLocalStorage(allValues);
};

export const getFavorites = () => readLocalStorage().favorites;

export const clearFavorites = () => {
  const allValues = readLocalStorage();

  allValues.favorites = [];
  writeLocalStorage(allValues);
};
