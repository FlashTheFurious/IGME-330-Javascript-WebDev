const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <nav class="navbar is-black has-shadow is-fixed-top">
      <!-- logo / brand -->
      <div class="navbar-brand">
        <a class="navbar-item" href="home.html">
          <i class="fas fa-dragon"></i>
        </a>
        <a class="navbar-burger" id="burger">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div class="navbar-menu" id="nav-links">
        <div class="navbar-start">
          <a class="navbar-item" href="home.html"> Home </a>

          <span class="navbar-item has-text-weight-bold"> App </span>

          <a class="navbar-item is-hoverable" href="favorites.html">
            Favorites
          </a>

          <a class="navbar-item is-hoverable" href="documentation.html">
            Documentation
          </a>
        </div>
        <!-- end navbar-start -->
      </div>
    </nav>
    
    `;

class P1Nav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._currentPage = this.getAttribute("data-page");
  }
  connectedCallback() {
    this.render();
  }

  render() {
    const burgerIcon = this.shadowRoot.querySelector("#burger");
    const navbarMenu = this.shadowRoot.querySelector("#nav-links");

    burgerIcon.addEventListener("click", () => {
      navbarMenu.classList.toggle("is-active");
    });

    if (this._currentPage == "home") {
      this.shadowRoot.querySelector(
        ".navbar-start"
      ).innerHTML = ` <span class="navbar-item has-text-weight-bold">Home</span>
        <a class="navbar-item is-hoverable" href="app.html"> App </a>
        <a class="navbar-item is-hoverable" href="favorites.html">Favorites</a>
        <a class="navbar-item is-hoverable" href="documentation.html">Documentation</a>
        <a class="navbar-item is-hoverable" href="community.html"> Community </a>`;
    } else if (this._currentPage == "app") {
      this.shadowRoot.querySelector(".navbar-start").innerHTML = `
        <a class="navbar-item" href="home.html"> Home </a>
        <span class="navbar-item has-text-weight-bold"> App </span>
        <a class="navbar-item is-hoverable" href="favorites.html">Favorites</a>
        <a class="navbar-item is-hoverable" href="documentation.html">Documentation</a>
        <a class="navbar-item is-hoverable" href="community.html"> Community </a>
        `;
    } else if (this._currentPage == "documentation") {
      this.shadowRoot.querySelector(
        ".navbar-start"
      ).innerHTML = ` <a class="navbar-item is-hoverable"  href="home.html">Home</a>
      <a class="navbar-item is-hoverable" href="app.html"> App </a>
      <a class="navbar-item is-hoverable" href="favorites.html">Favorites</a>
      <span class="navbar-item has-text-weight-bold" >Documentation</span>
      <a class="navbar-item is-hoverable" href="community.html"> Community </a>
      `;
    } else if (this._currentPage == "favorites") {
      this.shadowRoot.querySelector(
        ".navbar-start"
      ).innerHTML = `<a class="navbar-item is-hoverable" href="home.html">Home</a>
      <a class="navbar-item is-hoverable" href="app.html"> App </a>
      <span class="navbar-item has-text-weight-bold" >Favorites</span>
      <a class="navbar-item is-hoverable" href="documentation.html">Documentation</a>
      <a class="navbar-item is-hoverable" href="community.html"> Community </a>`;
    } else if (this._currentPage == "community") {
      this.shadowRoot.querySelector(
        ".navbar-start"
      ).innerHTML = `<a class="navbar-item is-hoverable" href="home.html">Home</a>
      <a class="navbar-item is-hoverable" href="app.html"> App </a>
      <a class="navbar-item is-hoverable" href="favorites.html" >Favorites</a>
      <a class="navbar-item is-hoverable" href="documentation.html">Documentation</a>
      <span class="navbar-item has-text-weight-bold">Community</span>`;
    }
  }
}

customElements.define("p1-nav", P1Nav);
