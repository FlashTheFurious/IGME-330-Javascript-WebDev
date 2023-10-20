
    const template = document.createElement("template");
    template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <div class="title has-background-black pl-5 has-text-white is-size-4 is-size-6-mobile">
      ???
    </div>
    `;

    class AppFooter extends HTMLElement{
      constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._footerData = this.getAttribute('data-footer');
      }
      connectedCallback(){
        this.render();   
      }

      render(){
        this.shadowRoot.querySelector(".title").innerHTML =  this._footerData|| "No footer provided";
      }
    } 

    customElements.define('app-footer', AppFooter);
