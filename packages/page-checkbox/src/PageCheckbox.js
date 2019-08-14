import { html, css } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@polymer/iron-form/iron-form.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';
import introTemplate from './templateIntroduction.js';

const hasFormAssociatedElements = 'attachInternals' in document.createElement('span');
/* eslint no-plusplus: 0 */

export class PageCheckbox extends DemoPage {
  static get styles() {
    return [
      demoContentStyles,
      headersStyles,
      css`
      .communication-options {
        padding-left: 20px;
      }

      .communication-options anypoint-checkbox {
        display: block;
      }

      anypoint-checkbox {
        display: block;
      }

      #supportsForm {
        font-weight: bold;
      }
      `
    ];
  }

  constructor() {
    super();
    this.initObservableProperties([
      'demoDisabled'
    ]);
    this.demoStates = ['Normal'];
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _communicationHandler(e) {
    if (this.__cancelCommunicationChange) {
      return;
    }
    const nodes = this.shadowRoot.querySelectorAll('.communication-options anypoint-checkbox');
    const state = e.target.checked;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].checked = state;
    }
  }

  _communicationItemHandler() {
    const nodes = this.shadowRoot.querySelectorAll('.communication-options anypoint-checkbox');
    const checkedNodes = [];
    const notCheckedNodes = [];
    // at the time when event is dispatched the attribute is not yet reflected.
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].checked) {
        checkedNodes[checkedNodes.length] = nodes[i];
      } else {
        notCheckedNodes[notCheckedNodes.length] = nodes[i];
      }
    }
    const indeterminate = !!checkedNodes.length && !!notCheckedNodes.length;
    const parent = this.shadowRoot.querySelector('#communication');
    if (indeterminate) {
      this.__cancelCommunicationChange = true;
      parent.checked = false;
      parent.indeterminate = true;
      this.__cancelCommunicationChange = false;
    } else {
      parent.indeterminate = false;
      if (checkedNodes.length) {
        parent.checked = true;
      } else {
        parent.checked = false;
      }
    }
  }

  _ironFormSubmit() {
    const form = this.shadowRoot.getElementById('form');
    const out = this.shadowRoot.querySelector('#formValues');
    const values = form.serializeForm();
    out.innerText = JSON.stringify(values, null, 2);
  }

  _nativeSubmit(e) {
    e.preventDefault();
    const out = this.shadowRoot.querySelector('#nativeFormValues');
    const fd = new FormData(e.target);
    let result = 'Collected values:\n';
    fd.forEach((value, name) => {
      result += `${name}: ${value}\n`;
    });
    out.innerText = result;
  }

  _demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      demoDisabled
    } = this;
    return html`<section class="this.shadowRootation-section">
      <h3>Interactive demo</h3>
      <p>
        This demo lets you preview the radio button in a radio group with various
        configuration options.
      </p>
      <arc-interactive-demo
        .states="${demoStates}"
        ?dark="${darkThemeActive}"
      >

        <anypoint-checkbox
          slot="content"
          ?disabled="${demoDisabled}"
          >
          Label
        </anypoint-checkbox>

        <label slot="options" id="mainOptionsLabel">Options</label>
        <anypoint-checkbox
          aria-describedby="mainOptionsLabel"
          slot="options"
          name="demoDisabled"
          @change="${this._toggleMainOption}"
          >Disabled</anypoint-checkbox
        >
      </arc-interactive-demo>
    </section>`;
  }

  _usageTemplate() {
    return html`
    <section class="documentation-section">
      <h2>Usage</h2>

      <p>
        Checkbox allows to select one or more option from a set of options.
        If the user is expected to toggle a view, a switch should be used instead.
      </p>

      <p>
        See
        <a href="https://material.io/design/components/selection-controls.html#checkboxes"
          >Checkboxes</a
        >
        documentation in Material Design documentation for principles and
        anatomy of a checkbox.
      </p>

      <h3>Installation</h3>

      <code>npm install --save @anypoint-web-components/anypoint-checkbox</code>

      <details>
        <summary>In a HTML document</summary>
        <code>
          <pre>
    ${`<html>
      <head>
        <script type="module">
          import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
        </script>
      </head>
      <body>
        <anypoint-checkbox>Regular checkbox</anypoint-checkbox>
        <anypoint-checkbox checked>Checked checkbox</anypoint-checkbox>
        <anypoint-checkbox indeterminate>Indeterminate checkbox</anypoint-checkbox>
        <anypoint-checkbox required>Required checkbox</anypoint-checkbox>
        <anypoint-checkbox disabled>Disabled checkbox</anypoint-checkbox>
      </body>
    </html>`}
          </pre>
        </code>
      </details>

      <h3>Selection state</h3>

      <p>
        A chekcbox can be <b>unselected</b>, <b>selected</b>, or <b>indeterminate</b>.
      </p>

      <h4>Indeterminate state</h4>
      <p>
        The indeterminate state is when a parent checkbox on complex selection group has
        child checkboxes that are both selected and unselected.
      </p>

      <div class="centered">
        <anypoint-checkbox
          indeterminate
          id="communication"
          @change="${this._communicationHandler}">Communication</anypoint-checkbox>
        <div class="communication-options">
          <anypoint-checkbox
            name="email"
            checked
            @change="${this._communicationItemHandler}">Email</anypoint-checkbox>
          <anypoint-checkbox
            name="sms"
            @change="${this._communicationItemHandler}">SMS</anypoint-checkbox>
          <anypoint-checkbox
            name="push"
            @change="${this._communicationItemHandler}">Push notification</anypoint-checkbox>
          <anypoint-checkbox
            name="mail"
            @change="${this._communicationItemHandler}">Mail</anypoint-checkbox>
        </div>
      </div>

      <details>
          <summary>Code example</summary>
          <code>
            <pre>
    ${`<anypoint-checkbox indeterminate>Communication</anypoint-checkbox>
    <div class="communication-options">
      <anypoint-checkbox name="email" checked>Email</anypoint-checkbox>
      <anypoint-checkbox name="sms">SMS</anypoint-checkbox>
      <anypoint-checkbox name="push">Push notification</anypoint-checkbox>
      <anypoint-checkbox name="mail">Mail</anypoint-checkbox>
    </div>`}
            </pre>
          </code>
      </details>
    </section>
    `;
  }

  _ironFormTemplate() {
    return html`
    <section class="documentation-section">
      <h3>Form usage with iron-form</h3>

      <p>
        Currently the spec allowing custom elements to be accepted by the &lt;form&gt; element
        is work in progress. We suggest using
        <a href="https://www.webcomponents.org/element/@polymer/iron-form">iron-form</a>
        to handle forms with custom elements.
      </p>

      <div class="centered">
        <iron-form id="form">
          <form>
            <fieldset>
              <anypoint-checkbox
                name="subscribe"
                value="newsletetr">Subsceribe to our newsletter</anypoint-checkbox>
              <anypoint-checkbox
                name="tems"
                value="accepted" checked required>Agree to terms and conditions</anypoint-checkbox>
              <anypoint-checkbox
                name="disabled"
                value="noop" disabled>This is never included</anypoint-checkbox>
            </fieldset>
          </form>
        </iron-form>
        <button id="submitButton" @click="${this._ironFormSubmit}">Submit</button>
        <div>
          <code id="formValues"></code>
        </div>
      </div>
    </section>
    `;
  }

  _formTemplate() {
    return html`
    <section class="documentation-section">
      <h3>Form-associated custom elements</h3>
      <p>
        Form-associated custom elements enable web authors to define and create
        custom elements which participate in form submission.

        Learn more: <a href="https://www.chromestatus.com/feature/4708990554472448" target="_blank">Chrome status</a>
      </p>

      ${hasFormAssociatedElements ?
          html`<p>Your browser support this API</p>` :
          html`<p>Your browser <b>does not</b> support this API</p>`}

      <div class="centered">
        <form id="nativeForm" @submit="${this._nativeSubmit}">
          <fieldset>
            <anypoint-checkbox
              name="options"
              value="newsletetr" required>Subsceribe to our newsletter</anypoint-checkbox>
            <anypoint-checkbox
              name="options"
              value="accepted" checked required>Agree to terms and conditions</anypoint-checkbox>
            <anypoint-checkbox
              name="options"
              value="optional">This is optional</anypoint-checkbox>
            <anypoint-checkbox
              name="options"
              value="noop" disabled>This is never included</anypoint-checkbox>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
        <div>
          <code id="nativeFormValues"></code>
        </div>
      </div>
    </section>
    `;
  }

  _workingWithFormsTemplate() {
    return html`<section class="documentation-section">
      <h2>Working with forms</h2>
      ${this._ironFormTemplate()}
      ${this._formTemplate()}
    </section>`;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint Checkbox</h2>
      ${this._demoTemplate()}
      ${introTemplate}
      ${this._usageTemplate()}
      ${this._workingWithFormsTemplate()}
    `;
  }
}
