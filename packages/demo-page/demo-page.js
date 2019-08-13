import { html, css, LitElement } from 'lit-element';
import { headersStyles } from '../awc-docs/src/common-styles.js';
/* eslint class-methods-use-this: 0 */
/* global gtag */
/**
 * Base class for AWC demo pages.
 *
 * ## Usage
 *
 * ```javascript
 * class ComponentDemo extends ArcDemoPage {
 *  contentTemplate() {
 *    return html`
 *      return html`<my-component ?narrow="${this.narrowActive}"></my-component>`;
 *    `;
 *  }
 * }
 * const instance = new ComponentDemo();
 * instance.render();
 * ```
 */
export class DemoPage extends LitElement {
  static get styles() {
    return [
      headersStyles,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  constructor() {
    super();

    this.initObservableProperties([
      'narrowActive',
      'componentName',
      'stylesActive',
      'darkThemeActive',
    ]);

    this.narrowActive = false;
  }

  /**
   * Creates setters and getters to properties defined in the passed list of properties.
   * Property setter will trigger render function.
   *
   * @param {Array<String>} props List of properties to initialize.
   */
  initObservableProperties(props) {
    props.forEach(item => {
      Object.defineProperty(this, item, {
        get() {
          return this[`_${item}`];
        },
        set(newValue) {
          this._setObservableProperty(item, newValue);
        },
        enumerable: true,
        configurable: true,
      });
    });
  }

  _setObservableProperty(prop, value) {
    const key = `_${prop}`;
    const old = this[key];
    if (old === value) {
      return;
    }
    this[key] = value;
    this.requestUpdate(prop, old);
  }

  _darkThemeHandler(e) {
    this.darkThemeActive = e.target.checked;
    if (e.target.checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  _narrowHandler(e) {
    this.narrowActive = e.target.checked;
  }

  _stylesHandler(e) {
    this.stylesActive = e.target.checked;
    if (e.target.checked) {
      document.body.classList.add('styled');
    } else {
      document.body.classList.remove('styled');
    }
  }

  notifyStateChange(state, action = 'change') {
    gtag('event', action, {
      event_category: 'interactive-demo-state',
      event_label: state,
    });
  }

  notifyOptionChange(label, action = 'activate') {
    gtag('event', action, {
      event_category: 'interactive-demo-option',
      event_label: label,
    });
  }

  /**
   * Abstract method. When not overriding `render()` method you can use
   * this function to render content inside the standar API components layout.
   *
   * ```
   * contentTemplate() {
   *  return html`<p>Demo content</p>`;
   * }
   * ```
   */
  contentTemplate() {}

  render() {
    return html`
      ${this.contentTemplate()}
    `;
  }
}
