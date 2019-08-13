import { html, css, LitElement } from 'lit-element';
import { headersStyles } from '../../awc-docs/src/common-styles.js';


export class PageMain extends LitElement {
  static get styles() {
    return [
      headersStyles,
      css`
      :host {
        display: block;
      }
    `];
  }

  render() {
    return html`
      <h2>Anypoint Web Components for OSS projects</h2>
      <p>
        This is a library of web components made for open source applications
        running in MuleSoft Anypoint platform.
      </p>

      <p>
        The components implements Material Design and adjust it for Anypoint styles.
      </p>

      <p>
        You are free to use the components in your own project. The components are
        shared under Apache 2.0 license.
      </p>

      <h3>Web components</h3>
      <p>
        All components are created on native web platform using <a href="https://lit-element.polymer-project.org/">LitElement</a>
        as a base class. Learn basics of custom elements on <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements">MDN documentation page</a>.
      </p>

      <p>
        This documentation assumes you have at least basic knowledge about custom elements.
        You don't need to learn LitElement to start. However, if you are planning to develop new components you should read the documentation for LitElement.
      </p>

      <h3>Open-WC</h3>
      <p>The components in most cases follow recommendations provided by the <a href="https://open-wc.org/">open-wc.org</a> project.</p>
      <p>Linting, code style, and automated tests has been adjusted for API Components.</p>
    `;
  }
}
