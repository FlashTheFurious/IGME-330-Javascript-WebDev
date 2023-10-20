import * as storage from "./localStorage.js";

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

<style>
@import url('https://fonts.googleapis.com/css2?family=Merienda+One&display=swap');
   div.card {
    height:600px;
    overflow: auto;
    
    border: 1px solid gray;
    padding: .5rem;
    background-color: #f4f4f4;
    
    font-size: .7rem;
  }
  
   h2{
    font-size: 1.1rem;
    font-family: 'Merienda One', cursive;
    letter-spacing: .67px;
    line-height: 1.2;
    margin-top: 0;
  }
  
  img{
    border:1px solid black;
    background-color:white;
    box-shadow: 1px 1px 2px #333;
    margin:.1rem; 
    width:300px
  }
  
</style> 

<div class = "card" >
    <h2 class="is-size-4 has-text-centered	" >One Piece</h2>
    <figure class="image">
    <img alt="mugshot"></figure>
    <p class="is-size-6" id="anime-year"> Year: 1997</p>
    <p class="is-size-6" id="anime-genre"> Action, Shonen</p>
    <p class="is-size-6" id="anime-likes"> Likes: 0</p>

    <!-- Favorites Button -->

    <div class= "control has-text-centered">
    <button id="btn-add-favorite" class="button is-primary is-small" title="Favorite this Anime!">
    Add To Favorites
    </button>
    <button id="btn-remove-favorite" class="button is-danger is-small" title="Remove this Anime from Favorites!">
    Remove from Favorites
    </button>
    </div>
</div>
`;

class AnimeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.h2 = this.shadowRoot.querySelector("h2"); // Pointer to the h2
    this.p1 = this.shadowRoot.querySelector("#anime-year"); // Pointer to the first para
    this.p2 = this.shadowRoot.querySelector("#anime-genre"); // Pointer to the second para
    this.likesPara = this.shadowRoot.querySelector("#anime-likes"); // Pointer to the third para
    this.img = this.shadowRoot.querySelector("img"); // Pointer to the image
    this.addedToFavorites = false;
  }

  connectedCallback() {
    this.render();
    this.btnAddFavorite = this.shadowRoot.querySelector("#btn-add-favorite");
    this.btnRemoveFavorite = this.shadowRoot.querySelector(
      "#btn-remove-favorite"
    );

    /* 
    this.callback = (obj) =>
      console.log(
        ` Name:${obj.name}, Genre:${obj.genre}, Year:${obj.year}, Img:${obj.imgURL} `
      );*/
    this.btnAddFavorite.onclick = (evt) => {
      const dataObj = {
        name: this.dataset.name,
        genre: this.dataset.genre,
        year: this.dataset.year,
        imgURL: this.getAttribute("data-image"),
      };
      storage.addFavorite(dataObj);
      this.btnAddFavorite.setAttribute("disabled", "");
      this.btnAddFavorite.innerHTML = "Favorited !";
      //console.log(this.getAttribute("data-image"));
    };
    this.btnRemoveFavorite.onclick = (evt) => {
      const dataObj = {
        name: this.dataset.name,
        genre: this.dataset.genre,
        year: this.dataset.year,
        imgURL: this.getAttribute("data-image"),
      };

      storage.removeFavorite(dataObj);
      this.btnRemoveFavorite.setAttribute("disabled", "");
      this.btnRemoveFavorite.innerHTML = "Removed !";
    };
  }
  disconnectedCallback() {
    this.btnAddFavorite.onclick = null;
  }

  attributeChangedCallback(attributeName, oldVal, newVal) {
    //console.log(attributeName, oldVal, newVal);
    this.render();
  }
  static get observedAttributes() {
    return ["data-name", "data-year", "data-image", "data-genre", "data-likes"];
  }
  render() {
    //Grab attribute values
    const name = this.getAttribute("data-name")
      ? this.getAttribute("data-name")
      : "<i>...anime name</i>";
    const year = this.getAttribute("data-year")
      ? this.getAttribute("data-year")
      : "<i>...anime year</i>";
    const imgURL = this.getAttribute("data-image")
      ? this.getAttribute("data-image")
      : "<i>...anime image</i>";
    const genre = this.getAttribute("data-genre")
      ? this.getAttribute("data-genre")
      : "<i>...anime genre</i>";

    this.h2.innerHTML = `${name}`;
    this.p1.innerHTML = `Year: ${year}`;
    this.p2.innerHTML = `Genres: ${genre}`;

    this.img.src = imgURL;
    //  this.shadowRoot.querySelector(".title").innerHTML =
    //    this._currentPage || "No title provided";
  }
} //class

customElements.define("anime-card", AnimeCard);
