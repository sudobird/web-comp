import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import {h, render} from "preact";

export const registerComponent = (config) => {
  const WebComponent = createWebComponent(config.component);
  customElements.define(config.name, WebComponent);
};

const createWebComponent = (Component) => {
  return class extends HTMLElement {
    constructor() {
      super();
      this.root = this.attachShadow({mode: 'open'});
      this.observer = new MutationObserver((mutations, observer) => {
        this.updateProps(mutations, observer)
      });
      this.observer.observe(this, {attributes: true});
    }

    updateProps(mutations, observer) {
      this.mount();
    }

    connectedCallback() {
      this.mount();
    }

    mount() {
      const props = this.getProps();
      render(<Component {...props}/>, this.root);
    }

    getProps() {
      let props = {};
      props = [...this.attributes].reduce((propsObj, attr) => {
        propsObj[attr.name] = attr.value;
        return propsObj;
      }, props);

      props.dispatchEvent = (eventName, data) => {
        const event = new CustomEvent(eventName, {detail: data});
        this.dispatchEvent(event);
      };
      return props;
    }

    disconnectedCallback() {
      this.unMount();
    }

    unMount() {
      render(null, this.root);
    }
  }
};




