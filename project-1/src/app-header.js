
    const template = document.createElement("template");
    template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <div class="title pl-4 pt-2 pb-4 has-text-white">
      ???
    </div>
    `;

    class AppHeader extends HTMLElement{
      constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._currentPage = this.getAttribute('data-page');
      }
      connectedCallback(){
        this.render();   
      }

      render(){
        this.shadowRoot.querySelector(".title").innerHTML =  this._currentPage|| "No title provided";
      }
    } 

    customElements.define('app-header', AppHeader);
