const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />


    <nav class="navbar is-black has-shadow is-fixed-top">
      <!-- logo / brand -->
      <div class="navbar-brand">
      
        <a class="navbar-item" href="home.html"> 
        <i class="fa-solid fa-wave-square"></i></a>
        
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

          

          <a class="navbar-item is-hoverable" href="documentation.html">
            Documentation
          </a>
        </div>
        <!-- end navbar-start -->
      </div>
    </nav>
    
    `;

class P2Nav extends HTMLElement {
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
        <a class="navbar-item is-hoverable" href="documentation.html">Documentation</a>
        `;
    } else if (this._currentPage == "app") {
      this.shadowRoot.querySelector(".navbar-start").innerHTML = `
        <a class="navbar-item" href="home.html"> Home </a>
        <span class="navbar-item has-text-weight-bold"> App </span>
        <a class="navbar-item is-hoverable" href="documentation.html">Documentation</a>
        `;
    } else if (this._currentPage == "documentation") {
      this.shadowRoot.querySelector(
        ".navbar-start"
      ).innerHTML = ` <a class="navbar-item is-hoverable"  href="home.html">Home</a>
      <a class="navbar-item is-hoverable" href="app.html"> App </a>
      <span class="navbar-item has-text-weight-bold" >Documentation</span>
      `;
    }
  }
}

customElements.define("p2-nav", P2Nav);
