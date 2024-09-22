
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";

// This can extend HTMLElement in it's absolute core
//class CurrentDate extends HTMLElement {
class CurrentDate extends UmbElementMixin(HTMLElement) {
    #modalManagerContext;

    counter = 0;
    shadow = null;

    constructor() {
        super();


        this.consumeContext("UmbModalManagerContext", (instance) => {
            this.#modalManagerContext = instance;
            // modalManagerContext is now ready to be used.
        });

        this.name = 'World';
        this.shadow = this.attachShadow({ mode: 'closed' });

        this.renderComponent();
    }

    static get observedAttributes() {
        return ['name'];
    }

    // This is an inbuilt function of web components and gets called automatically
    attributeChangedCallback(property, oldValue, newValue) {
        console.log("c-c-c-c-c-c-c-c-changin", { property, oldValue, newValue
            });
        if (oldValue === newValue) return;
        this[property] = newValue;

        this.renderComponent();
    }

    // The browser calls this method when the element is added to the DOM.
    connectedCallback() {

    }

    renderComponent() {
        const container = document.createElement('uui-box');
        container.innerHTML = `Hello ${this.name}`;
        container.addEventListener('click', e => {
            this.clickMe();
        });


        this.shadow.innerHTML = `
            <style>
              p {
                text-align: center;
                font-weight: normal;
                padding: 1em;
                margin: 0 0 2em 0;
                background-color: #eee;
                border: 1px solid #666;
              }
            </style>`;

        this.shadow.appendChild(container);
    }


    clickMe() {
        console.log("Hello");
        this.setAttribute("name", "trevor");
    }
}

// Register the CurrentDate component using the tag name <current-date>.
customElements.define("current-date", CurrentDate);