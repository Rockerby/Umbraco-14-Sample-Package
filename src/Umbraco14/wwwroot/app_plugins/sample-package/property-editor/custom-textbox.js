import { LitElement, html, css, customElement, property } from '@umbraco-cms/backoffice/external/lit';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UmbPropertyValueChangeEvent } from '@umbraco-cms/backoffice/property-editor';


const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      padding: 20px;
      display: block;
      box-sizing: border-box;
    }
  </style>
    <p>What what WHAAAAAAT</p>
  <uui-input type="text" id="txtInput"></uui-input>
`;

export default class MyTextBox extends UmbElementMixin(HTMLElement) {
    config = {}; //: UmbPropertyEditorConfigCollection | undefined;
    value;
    inputField;

    onInput(e) {
        console.log("updating", (e.target).value);
        this.value = (e.target).value;
        this.dispatchEvent(new UmbPropertyValueChangeEvent());
    }

    static get observedAttributes() {
        return ['value', 'config'];
    }

    // This is an inbuilt function of web components and gets called automatically
    attributeChangedCallback(property, oldValue, newValue) {
        console.log("c-c-c-c-c-c-c-c-changin", {
            property, oldValue, newValue
        });
        if (oldValue === newValue) return;
        this[property] = newValue;

        this.renderComponent();
    }

    constructor() {
        super();
        console.log("I am a value", this.value);

        //this.setAttribute("value", '');
        //this["value"] = '';
        //console.log("attribute", this.getAttribute('value'));
        var p = this.properties;
        console.log("Config", { config: this.config, value : this.value, p });
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.inputField =
            this.shadowRoot
                .getElementById("txtInput");
        //input.value = this.value;
        this.inputField.addEventListener("input", this.onInput.bind(this));

        /*this.consumeContext(UMB_NOTIFICATION_CONTEXT, (instance) => {
            this.#notificationContext = instance;
        });*/
    }



    // The browser calls this method when the element is added to the DOM.
    connectedCallback() {
        console.log("I am a value", this.value);
        console.log("attribute", this.getAttribute('value'));
        this.inputField.value = this.value;
        //setInterval
    }

    // onClick = () => {
    //     this.#notificationContext?.peek("positive", {
    //         data: { headline: "Hello" },
    //     });
    // };

}

customElements.define("my-text-box", MyTextBox);
