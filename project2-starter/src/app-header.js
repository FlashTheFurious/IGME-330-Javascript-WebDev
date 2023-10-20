const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
    <style> 
    @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
    
    div{
      font-family: 'Righteous', cursive;
      font-size: 3rem;
    } 
    
    </style>

    <div class=" pl-4 pt-2 pb-4 has-text-white">
      ???
    </div>
    `;

class AppHeader extends HTMLElement {
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
    this.shadowRoot.querySelector("div").innerHTML =
      this._currentPage || "No title provided";
  }
}

customElements.define("app-header", AppHeader);
