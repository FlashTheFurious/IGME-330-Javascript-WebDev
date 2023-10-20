const template = document.createElement("template");
template.innerHTML = `
<style>
:host{
    background-color: #ddd;
    display: block;
    }
    span {
        color: #F76902;
        font-variant: small-caps;
        font-weight: bolder;
        font-family: sans-serif;
    }
</style>
<span></span>
<hr>
`;

class IGMFooter extends HTMLElement {
  constructor() {
    super();
    // 1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot` for us
    this.attachShadow({ mode: "open" });
    // 2 - Clone `template` and append it
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // called when the component is added to the page
  connectedCallback() {
    // create the <span> element and add to shadow DOM
    this.shadowRoot.appendChild(document.createElement("span"));

    // 3 - (for illustrative purposes) we will create and add an <hr> to the shadow DOM
    this.shadowRoot.appendChild(document.createElement("hr"));
    this.render();
  }

  // 6 - a helper method to display the values of the attributes
  render() {
    // grab the attribute values, and assign a default value if necessary
    const year = this.getAttribute("data-year")
      ? this.getAttribute("data-year")
      : "1995";
    const text = this.getAttribute("data-text")
      ? this.getAttribute("data-text")
      : "Nobody";
    const org = this.getAttribute("data-organization")
      ? this.getAttribute("data-organization")
      : "IGM";
    this.shadowRoot.querySelector(
      "span"
    ).innerHTML = `&copy; Copyright ${year}, ${text}, <span id="org">${org}</span>`;
  }
}

customElements.define("igm-footer", IGMFooter);

window.onload = () => {};
