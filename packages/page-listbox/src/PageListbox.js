import { html, css } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';
import templateIntroduction from './templateIntroduction.js';

export class PageListbox extends DemoPage {
  static get styles() {
    return [
      demoContentStyles,
      headersStyles,
      css`
        hr {
        border-left: 1px #cacbcc solid;
        border-right: 1px #cacbcc solid;
        margin: 0;
      }

      .scrolled {
        max-height: 250px;
        overflow: auto;
      }
      `
    ];
  }

  constructor() {
    super();
    this.initObservableProperties([
      'demoLegacy'
    ]);
    this.demoStates = ['Normal', 'Legacy'];
    this.fruits = ['Apple', 'Apricot', 'Avocado',
      'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
      'Boysenberry', 'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya',
      'Cloudberry', 'Coconut', 'Cranberry', 'Damson', 'Date', 'Dragonfruit',
      'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Goji berry', 'Gooseberry',
      'Grape', 'Grapefruit', 'Guava', 'Huckleberry', 'Jabuticaba', 'Jackfruit',
      'Jambul', 'Jujube', 'Juniper berry', 'Kiwi fruit', 'Kumquat', 'Lemon',
      'Lime', 'Loquat', 'Lychee', 'Mango', 'Marion berry', 'Melon', 'Miracle fruit',
      'Mulberry', 'Nectarine', 'Olive', 'Orange'
    ];
  }

  _mainDemoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.demoLegacy = false;
        break;
      case 1:
        this.demoLegacy = true;
        break;
      default:
    }
  }

  _demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      demoLegacy
    } = this;
    return html`<section class="documentation-section">
    <h3>Interactive demo</h3>
    <p>
      This demo lets you preview the listbox element with various
      configuration options.
    </p>
    <arc-interactive-demo
      .states="${demoStates}"
      @state-chanegd="${this._mainDemoStateHandler}"
      ?dark="${darkThemeActive}"
    >
      <anypoint-listbox slot="content" ?legacy="${demoLegacy}">
        <anypoint-item>API project 1</anypoint-item>
        <anypoint-item>API project 2</anypoint-item>
        <anypoint-item>API project 3</anypoint-item>
        <anypoint-item>API project 4</anypoint-item>
      </anypoint-listbox>
    </arc-interactive-demo>
    </section>`;
  }

  _usageTemplate() {
    return html`
      <section class="documentation-section">
        <h2>Usage</h2>
        <p>Anypoint listbox comes with 2 predefied styles:</p>
        <ul>
          <li><b>Normal</b></li>
          <li>
            <b>Legacy</b> - To provide compatibility with legacy Anypoint design
          </li>
        </ul>

        <p>
          The element has no particular styling options for legacy style but it
          it sets <code>legacy</code> attribute on children. This way you can
          propagate Anypoint theme without setting the attribute on each element.
        </p>

        <h3>Installation</h3>

        <code>
        npm install --save @anypoint-web-components/anypoint-listbox
        </code>

        <details>
          <summary>In a HTML document</summary>
          <code>
            <pre>
              ${`
<html>
  <head>
    <script type="module">
      import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
      import '@anypoint-web-components/anypoint-item/anypoint-item.js';
    </script>
  </head>
  <body>
    <anypoint-listbox>
      <anypoint-item>item 1</anypoint-item>
      <anypoint-item>item 2</anypoint-item>
      <anypoint-item>item 3</anypoint-item>
    </anypoint-listbox>
  </body>
</html>`}
            </pre>
          </code>
        </details>

        <details>
          <summary>In a LitElement template</summary>
          <code>
            <pre>
            ${`
import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';

class SimpleElement extends LitElement {
  render() {
    const { options, selected } = this;
    return html\`
    <anypoint-listbox .selected="\${selected}" @selected-changed="\${this._selectedHandler}">
    \${options.map((item) => html\`<anypoint-item>\${item}</anypoint-item>\`)}
    </anypoint-listbox>
    \`;
  }

  _selectedHandler(e) {
    this.selected = e.target.value;
  }
}
window.customElements.define('simple-element', SimpleElement);`}
            </pre>
          </code>
        </details>

        <h3>Selection</h3>
        <p>
          Use <code>selected</code> attribute to select an item. By default the index of the
          item is used to make the selection.
        </p>
        <anypoint-listbox selected="1">
          <anypoint-item>API project 1</anypoint-item>
          <anypoint-item>API project 2</anypoint-item>
          <anypoint-item>API project 3</anypoint-item>
          <anypoint-item>API project 4</anypoint-item>
        </anypoint-listbox>
        <details>
            <summary>Code example</summary>
            <code>
              <pre>
                &lt;anypoint-listbox selected="1"&gt;
                  &lt;anypoint-item&gt;API project 1&lt;/anypoint-item&gt;
                  &lt;anypoint-item&gt;API project 2&lt;/anypoint-item&gt;
                  &lt;anypoint-item&gt;API project 3&lt;/anypoint-item&gt;
                  &lt;anypoint-item&gt;API project 4&lt;/anypoint-item&gt;
                &lt;/anypoint-listbox&gt;
              </pre>
            </code>
        </details>
        <p>
          Use <code>attrforselected</code> attribute to make a selection based on the attribute value.
        </p>
        <anypoint-listbox attrforselected="data-project-id" selected="p2">
          <anypoint-item data-project-id="p1">API project 1</anypoint-item>
          <anypoint-item data-project-id="p2">API project 2</anypoint-item>
          <anypoint-item data-project-id="p3">API project 3</anypoint-item>
          <anypoint-item data-project-id="p4">API project 4</anypoint-item>
        </anypoint-listbox>
        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-listbox attrforselected="data-project-id" selected="p2"&gt;
                &lt;anypoint-item data-project-id="p1"&gt;API project 1&lt;/anypoint-item&gt;
                &lt;anypoint-item data-project-id="p2"&gt;API project 2&lt;/anypoint-item&gt;
                &lt;anypoint-item data-project-id="p3"&gt;API project 3&lt;/anypoint-item&gt;
                &lt;anypoint-item data-project-id="p4"&gt;API project 4&lt;/anypoint-item&gt;
              &lt;/anypoint-listbox&gt;
              </pre>
            </code>
        </details>
        <h3>Multi selection</h3>
        <p>
          Use <code>multi</code> attribute to enable multi selection of list items.
        </p>
        <anypoint-listbox multi>
          <anypoint-item>API project 1</anypoint-item>
          <anypoint-item>API project 2</anypoint-item>
          <anypoint-item>API project 3</anypoint-item>
          <anypoint-item>API project 4</anypoint-item>
        </anypoint-listbox>
        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-listbox multi&gt;
                &lt;anypoint-item&gt;API project 1&lt;/anypoint-item&gt;
                &lt;anypoint-item&gt;API project 2&lt;/anypoint-item&gt;
                &lt;anypoint-item&gt;API project 3&lt;/anypoint-item&gt;
                &lt;anypoint-item&gt;API project 4&lt;/anypoint-item&gt;
              &lt;/anypoint-listbox&gt;
              </pre>
            </code>
        </details>
      </section>
      <h3>Explicit selection</h3>
      <p>
        Use <code>selectable</code> attribute define a css selector of items that can be selected
        on the list. It is helpful if the list contain non-selctable items like horizontal lines.
      </p>
      <anypoint-listbox selectable=".allowed">
      <anypoint-item class="allowed">API project 1</anypoint-item>
      <anypoint-item class="allowed">API project 2</anypoint-item>
      <hr>
      <anypoint-item class="allowed">API project 3</anypoint-item>
      <anypoint-item class="allowed">API project 4</anypoint-item>
      </anypoint-listbox>
      <details>
        <summary>Code example</summary>
        <code>
          <pre>
            &lt;anypoint-listbox selectable=".allowed"&gt;
            &lt;anypoint-item class="allowed"&gt;API project 1&lt;/anypoint-item&gt;
            &lt;anypoint-item class="allowed"&gt;API project 2&lt;/anypoint-item&gt;
            &lt;hr&gt;
            &lt;anypoint-item class="allowed"&gt;API project 3&lt;/anypoint-item&gt;
            &lt;anypoint-item class="allowed"&gt;API project 4&lt;/anypoint-item&gt;
            &lt;/anypoint-listbox&gt;
          </pre>
        </code>
      </details>
    </section>
    <h3>Selection while typping</h3>
    <p>
      When the element is focused after the user start typing item name, the matching item
      becomes focused item. The user can confirm selection via space bar / enter key.
    </p>
    <anypoint-listbox class="scrolled">
    ${this.fruits.map((item) => html`<anypoint-item role="option">${item}</anypoint-item>`)}
    </anypoint-listbox>
    `;
  }

  contentTemplate() {
    return html`
    <h2>Anypoint listbox</h2>
    ${this._demoTemplate()}
    ${templateIntroduction}
    ${this._usageTemplate()}`;
  }
}
