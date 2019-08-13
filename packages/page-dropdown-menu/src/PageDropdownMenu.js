import { html } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@polymer/iron-image/iron-image.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-button.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-group.js';
import '@anypoint-web-components/anypoint-dropdown-menu/anypoint-dropdown-menu.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';
import templateIntroduction from './templateIntroduction.js';

const hasFormAssociatedElements = 'attachInternals' in document.createElement('span');

/* eslint no-plusplus: 0 */
/* eslint no-continue: 0 */

export class PageDropdownMenu extends DemoPage {
  static get styles() {
    return [
      demoContentStyles,
      headersStyles
    ];
  }

  constructor() {
    super();
    this.initObservableProperties([
      'demoOutlined',
      'demoLegacy',
      'demoInfo',
      'demoError',
      'demoNoLabelFloat',
      'demoRtl',
      'formFieldsDisabled'
    ]);
    this.demoStates = ['Normal', 'Outlined', 'Legacy'];
    this.items = [
      'Allosaurus',
      'Brontosaurus',
      'Carcharodontosaurus',
      'Diplodocus',
      'Ekrixinatosaurus',
      'Fukuiraptor',
      'Gallimimus',
      'Hadrosaurus',
      'Iguanodon',
      'Jainosaurus',
      'Kritosaurus',
      'liaoceratops',
      'megalosaurus',
      'nemegtosaurus',
      'ornithomimus',
      'protoceratops',
      'quetecsaurus',
      'rajasaurus',
      'stegosaurus',
      'triceratops',
      'utahraptor',
      'vulcanodon',
      'wannanosaurus',
      'xenoceratops',
      'yandusaurus',
      'zephyrosaurus'
    ];
  }

  get formData() {
    return this._formData;
  }

  set formData(value) {
    this._setObservableProperty('formData', value);
  }

  _formSubmit(e) {
    e.preventDefault();
    const result = {};
    for (let i = 0; i < e.target.elements.length; i++) {
      const node = e.target.elements[i];
      if (!node.name) {
        continue;
      }
      result[node.name] = node.value;
    }
    this.formData = JSON.stringify(result, null, 2);
  }


  _headerControlsTemplate() {
    return html`${super._headerControlsTemplate()}
    <div class="settings-action-item">
      <paper-toggle-button checked @checked-changed="${this._stylesHandler}">Toggle styles</paper-toggle-button>
    </div>`;
  }

  _mainDemoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.demoOutlined = false;
        this.demoLegacy = false;
        break;
      case 1:
        this.demoOutlined = true;
        this.demoLegacy = false;
        break;
      case 2:
        this.demoOutlined = false;
        this.demoLegacy = true;
        break;
      default:
    }
  }

  _mainDemoAssistiveHandler(e) {
    const { name, checked } = e.target;
    if (!checked) {
      return;
    }
    if (name === 'info') {
      this.demoError = false;
      this.demoInfo = true;
    } else if (name === 'error') {
      this.demoError = true;
      this.demoInfo = false;
    } else {
      this.demoError = false;
      this.demoInfo = false;
    }
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      demoOutlined,
      demoLegacy,
      demoInfo,
      demoError,
      demoRtl,
      demoNoLabelFloat
    } = this;
    const infoMessage = demoInfo ? 'Assistive text label' : undefined;
    return html`<section class="documentation-section">
    <h3>Interactive demo</h3>
    <p>
      This demo lets you preview the dropdown menu element with various
      configuration options.
    </p>
    <arc-interactive-demo
      .states="${demoStates}"
      @state-chanegd="${this._mainDemoStateHandler}"
      ?dark="${darkThemeActive}"
    >
      <anypoint-dropdown-menu
        slot="content"
        name="mainDemo"
        title="Dropdown menu"
        ?outlined="${demoOutlined}"
        ?legacy="${demoLegacy}"
        .infoMessage="${infoMessage}"
        invalidmessage="This value is invalid"
        ?invalid="${demoError}"
        dir="${demoRtl ? 'rtl' : 'ltr'}"
        ?noLabelFloat="${demoNoLabelFloat}"
        >
        <label slot="label">Select a dinosaur</label>
        <anypoint-listbox slot="dropdown-content" tabindex="-1">
        ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
        </anypoint-listbox>
      </anypoint-dropdown-menu>

      <label slot="options" id="mainOptionsLabel">Options</label>
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="demoNoLabelFloat"
        @change="${this._toggleMainOption}"
        >No label float</anypoint-checkbox
      >
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="demoRtl"
        @change="${this._toggleMainOption}"
        >Right-to-left</anypoint-checkbox
      >

      <label slot="options" id="mainAssistiveLabel">Assistive text</label>
      <anypoint-radio-group
        slot="options"
        selectable="anypoint-radio-button"
        aria-labelledby="mainAssistiveLabel"
      >
        <anypoint-radio-button
          @change="${this._mainDemoAssistiveHandler}"
          checked
          name="none"
          >None</anypoint-radio-button
        >
        <anypoint-radio-button
          @change="${this._mainDemoAssistiveHandler}"
          name="info"
          >Info message</anypoint-radio-button
        >
        <anypoint-radio-button
          @change="${this._mainDemoAssistiveHandler}"
          name="error"
          >Error text</anypoint-radio-button
        >
      </anypoint-radio-group>
    </arc-interactive-demo>
    </section>`;
  }

  _usageTemplate() {
    return html`
      <section class="documentation-section">
        <h2>Usage</h2>
        <p>Anypoint dropdown menu comes with 3 predefied styles:</p>
        <ul>
          <li><b>Filled</b> (normal) - For low emphasis inputs</li>
          <li><b>Outlined</b> - For high emphasis inputs</li>
          <li>
            <b>Legacy</b> - To provide compatibility with legacy Anypoint design
          </li>
        </ul>

        <p>
          See
          <a href="https://material.io/design/components/menus.html#exposed-dropdown-menu"
            >Exposed dropdown menu</a
          >
          documentation in Material Defign documentation for principles and
          anatomy of dropdown menus.
        </p>

        <h3>Installation</h3>

        <code>
        npm install --save @anypoint-web-components/anypoint-dropdown-menu
        </code>

        <details>
          <summary>In a HTML document</summary>
          <code>
            <pre>
              ${`
<html>
  <head>
    <script type="module">
      import '@anypoint-web-components/anypoint-dropdown/anypoint-dropdown.js';
      import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
      import '@anypoint-web-components/anypoint-item/anypoint-item.js';
    </script>
  </head>
  <body>
    <anypoint-dropdown-menu aria-label="Select dinosaur from the list of available options">
      <label slot="label">Selected dinosaur</label>
      <anypoint-listbox slot="dropdown-content" tabindex="-1">
        <anypoint-item>item 1</anypoint-item>
        <anypoint-item>item 2</anypoint-item>
        <anypoint-item>item 3</anypoint-item>
      </anypoint-listbox>
    </anypoint-dropdown-menu>
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
import '@anypoint-web-components/anypoint-dropdown/anypoint-dropdown.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';

class SimpleElement extends LitElement {
  render() {
    return html\`
    <anypoint-dropdown-menu
      aria-label="Select dinosaur from the list of available options"
      @selected-changed="\${this._selectedHandler}">
      <label slot="label">Selected dinosaur</label>
      <anypoint-listbox slot="dropdown-content" tabindex="-1">
        <anypoint-item>item 1</anypoint-item>
        <anypoint-item>item 2</anypoint-item>
        <anypoint-item>item 3</anypoint-item>
      </anypoint-listbox>
    </anypoint-dropdown-menu>
    \`;
  }

  _selectedHandler(e) {
    this.selected = e.target.selected;
  }
}
window.customElements.define('simple-element', SimpleElement);`}
            </pre>
          </code>
        </details>

        <h3>Selection</h3>
        <p>
          The element does not provide an interface for list item selection.
          <code>anypoint-listbox</code>, which is suggested component to render a list of options,
          has <code>selected</code> attribute which should be used to preselect an item.
        </p>

        <anypoint-dropdown-menu aria-owns="preSelectedList">
          <label slot="label" id="preSelectedLabel">Pre-selected dinosaur</label>
          <anypoint-listbox slot="dropdown-content" tabindex="-1" selected="1" id="preSelectedList">
          ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
          </anypoint-listbox>
        </anypoint-dropdown-menu>

        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-dropdown-menu&gt;
                &lt;label slot="label"&gt;Pre-selected dinosaur&lt;/label&gt;
                &lt;anypoint-listbox slot="dropdown-content" selected="1"&gt;
                  &lt;anypoint-item label="Allosaurus"&gt;Allosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Brontosaurus"&gt;Brontosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Carcharodontosaurus"&gt;Carcharodontosaurus&lt;/anypoint-item&gt;
                &lt;/anypoint-listbox&gt;
              &lt;/anypoint-dropdown-menu&gt;
              </pre>
            </code>
        </details>

        <p>
          The <code>anypoint-listbox</code> component also allows to select an item by it's attribute
          by setting <code>attrforselected</code> attribute.
        </p>
        <anypoint-dropdown-menu>
          <label slot="label">Attribute as selection value</label>
          <anypoint-listbox slot="dropdown-content" tabindex="-1" attrforselected="label" selected="Brontosaurus">
          ${this.items.map((item) => html`<anypoint-item label="${item}">${item}</anypoint-item>`)}
          </anypoint-listbox>
        </anypoint-dropdown-menu>

        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-dropdown-menu&gt;
                &lt;label slot="label"&gt;Attribute as selection value&lt;/label&gt;
                &lt;anypoint-listbox slot="dropdown-content" attrforselected="label" selected="Brontosaurus"&gt;
                  &lt;anypoint-item label="Allosaurus"&gt;Allosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Brontosaurus"&gt;Brontosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Carcharodontosaurus"&gt;Carcharodontosaurus&lt;/anypoint-item&gt;
                &lt;/anypoint-listbox&gt;
              &lt;/anypoint-dropdown-menu&gt;
              </pre>
            </code>
        </details>

        <h3>Right-to-left languages</h3>
        <p>
          Use <code>dir</code> attribute to render the component in a right-to-left type language.
        </p>
        <anypoint-dropdown-menu dir="rtl">
          <label slot="label">Select a dinosaur</label>
          <anypoint-listbox slot="dropdown-content" tabindex="-1">
          ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
          </anypoint-listbox>
        </anypoint-dropdown-menu>

        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-dropdown-menu dir="rtl"&gt;
                &lt;label slot="label"&gt;Select a dinosaur&lt;/label&gt;
                &lt;anypoint-listbox slot="dropdown-content"&gt;
                  &lt;anypoint-item label="Allosaurus"&gt;Allosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Brontosaurus"&gt;Brontosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Carcharodontosaurus"&gt;Carcharodontosaurus&lt;/anypoint-item&gt;
                &lt;/anypoint-listbox&gt;
              &lt;/anypoint-dropdown-menu&gt;
              </pre>
            </code>
        </details>

        <h3>List direction</h3>
        <p>
          The list can be opened to the bottom (default) or to the top.
        </p>
        <p>
          Use the <code>dynamicAlign</code> property if the position cannot be determined
          beforehand.
        </p>

        <h4>Vertical align: bottom</h4>
        <anypoint-dropdown-menu verticalalign="bottom">
          <label slot="label">Select a dinosaur</label>
          <anypoint-listbox slot="dropdown-content" tabindex="-1">
          ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
          </anypoint-listbox>
        </anypoint-dropdown-menu>

        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-dropdown-menu verticalalign="bottom"&gt;
                &lt;label slot="label"&gt;Select a dinosaur&lt;/label&gt;
                &lt;anypoint-listbox slot="dropdown-content"&gt;
                  &lt;anypoint-item label="Allosaurus"&gt;Allosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Brontosaurus"&gt;Brontosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Carcharodontosaurus"&gt;Carcharodontosaurus&lt;/anypoint-item&gt;
                &lt;/anypoint-listbox&gt;
              &lt;/anypoint-dropdown-menu&gt;
              </pre>
            </code>
        </details>

        <h4>Dynamic align</h4>
        <anypoint-dropdown-menu dynamicalign>
          <label slot="label">Select a dinosaur</label>
          <anypoint-listbox slot="dropdown-content" tabindex="-1">
          ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
          </anypoint-listbox>
        </anypoint-dropdown-menu>

        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-dropdown-menu dynamicalign&gt;
                &lt;label slot="label"&gt;Select a dinosaur&lt;/label&gt;
                &lt;anypoint-listbox slot="dropdown-content"&gt;
                  &lt;anypoint-item label="Allosaurus"&gt;Allosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Brontosaurus"&gt;Brontosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Carcharodontosaurus"&gt;Carcharodontosaurus&lt;/anypoint-item&gt;
                &lt;/anypoint-listbox&gt;
              &lt;/anypoint-dropdown-menu&gt;
              </pre>
            </code>
        </details>
      </section>`;
  }

  _formsTemplate() {
    const {
      darkThemeActive,
      formFieldsDisabled
    } = this;
    return html`
      <section class="documentation-section">
        <h2>Working with forms</h2>
        <p>
          Anypoint dropdown menu support basic form states like <code>disabled</code> or <code>invalid</code>.
        </p>

        <h3>Disabled menu</h3>
        <p>
          When disabled, the user cannot interact with the control. Form associated with the
          component will ignore it's value when generating form values.
        </p>

        <anypoint-dropdown-menu disabled>
          <label slot="label">Select a dinosaur</label>
          <anypoint-listbox slot="dropdown-content" tabindex="-1">
          ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
          </anypoint-listbox>
        </anypoint-dropdown-menu>

        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-dropdown-menu disabled&gt;
                &lt;label slot="label"&gt;Select a dinosaur&lt;/label&gt;
                &lt;anypoint-listbox slot="dropdown-content"&gt;
                  &lt;anypoint-item label="Allosaurus"&gt;Allosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Brontosaurus"&gt;Brontosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Carcharodontosaurus"&gt;Carcharodontosaurus&lt;/anypoint-item&gt;
                &lt;/anypoint-listbox&gt;
              &lt;/anypoint-dropdown-menu&gt;
              </pre>
            </code>
        </details>

        <h3>Invalid selection</h3>
        <p>
          When invalid the component renders error colors and, if defiend, an error message.
        </p>

        <anypoint-dropdown-menu invalid>
          <label slot="label">Select a dinosaur</label>
          <anypoint-listbox slot="dropdown-content" tabindex="-1" selected="1">
          ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
          </anypoint-listbox>
        </anypoint-dropdown-menu>

        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-dropdown-menu invalid&gt;
                &lt;label slot="label"&gt;Select a dinosaur&lt;/label&gt;
                &lt;anypoint-listbox slot="dropdown-content" selected="1"&gt;
                  &lt;anypoint-item label="Allosaurus"&gt;Allosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Brontosaurus"&gt;Brontosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Carcharodontosaurus"&gt;Carcharodontosaurus&lt;/anypoint-item&gt;
                &lt;/anypoint-listbox&gt;
              &lt;/anypoint-dropdown-menu&gt;
              </pre>
            </code>
        </details>

        <h3>Auto validation</h3>
        <p>
          Set <code>autovalidate</code> and, for example, <code>required</code> proeprty to
          automatically validate the input when selection change.
        </p>

        <p>
          Anypoint web components offers <code>ValidatorMixin</code> that allows to define
          a custom element that validates an input field. This allows to reuse validation
          logic accross different parts of the application.
        </p>

        <anypoint-dropdown-menu autovalidate required>
          <label slot="label">Select a dinosaur</label>
          <anypoint-listbox slot="dropdown-content" tabindex="-1">
          ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
          </anypoint-listbox>
        </anypoint-dropdown-menu>

        <details>
            <summary>Code example</summary>
            <code>
              <pre>
              &lt;anypoint-dropdown-menu autovalidate required&gt;
                &lt;label slot="label"&gt;Select a dinosaur&lt;/label&gt;
                &lt;anypoint-listbox slot="dropdown-content"&gt;
                  &lt;anypoint-item label="Allosaurus"&gt;Allosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Brontosaurus"&gt;Brontosaurus&lt;/anypoint-item&gt;
                  &lt;anypoint-item label="Carcharodontosaurus"&gt;Carcharodontosaurus&lt;/anypoint-item&gt;
                &lt;/anypoint-listbox&gt;
              &lt;/anypoint-dropdown-menu&gt;
              </pre>
            </code>
        </details>

        <h3>Form-associated custom elements</h3>
        <p>
          Form-associated custom elements enable web authors to define and create
          custom elements which participate in form submission.

          Learn more: <a href="https://www.chromestatus.com/feature/4708990554472448" target="_blank">Chrome status</a>
        </p>

        ${hasFormAssociatedElements ?
          html`<p>Your browser support this API</p>` :
          html`<p>Your browser <b>does not</b> support this API</p>`}
        <arc-interactive-demo
          states='["Native form"]'
          ?dark="${darkThemeActive}"
        >
          <form enctype="application/json" @submit="${this._formSubmit}" slot="content">
            <fieldset ?disabled="${formFieldsDisabled}">
              <legend>Form fields group</legend>
              <anypoint-dropdown-menu required name="dino">
                <label slot="label">Select a dinosaur</label>
                <anypoint-listbox slot="dropdown-content" tabindex="-1">
                ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
                </anypoint-listbox>
              </anypoint-dropdown-menu>
              <br/>
              <input type="text" name="textInput" aria-label="Input text" />
            </fieldset>
            <input type="reset" value="Reset">
            <input type="submit" value="Submit">
          </form>

          <label slot="options" id="formOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="formOptionsLabel"
            slot="options"
            name="formFieldsDisabled"
            @change="${this._toggleMainOption}"
            >Disable fieldset</anypoint-checkbox
          >
        </arc-interactive-demo>

        ${this.formData ? html`<b>Form values</b><output>${this.formData}</output>`:undefined}

        <p>
          Note <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=992504">this bug</a>
          when toggling disabled state.
        </p>
      </section>
    `;
  }

  _assistiveTemplate() {
    return html`<section class="documentation-section">
      <h2>Assistive text</h2>
      <p>
        Assistive text allows the user to better understand what kind of selection is
        required. It can be an info message or invalid message when invalid
        input has been detected.
      </p>

      <h3>Info message</h3>
      <p>
        Info message provides the user with additional description for the
        field. It should be used when the label can be confusing or to ensure
        the user about the reason of collecting the input.
      </p>

      <anypoint-dropdown-menu infomessage="Will be added to your order.">
        <label slot="label">Select a dinosaur</label>
        <anypoint-listbox slot="dropdown-content" tabindex="-1">
        ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
        </anypoint-listbox>
      </anypoint-dropdown-menu>

      <p>
        Do not try to put too detailed information. The user should be able to
        scan the message in a fraction of a second. Treat it as an additional
        text for the label.
      </p>

      <h3>Invalid message</h3>
      <p>
        Error message should help the user recover from the error state. Use
        clear message with simple instructions of how to fix the problem, for
        example <code>Selection is required</code>.
      </p>

      <anypoint-dropdown-menu invalidmessage="Dino is required with the order" invalid required>
        <label slot="label">Select a dinosaur</label>
        <anypoint-listbox slot="dropdown-content" tabindex="-1">
        ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
        </anypoint-listbox>
      </anypoint-dropdown-menu>

      <h3>Invalid and info message</h3>
      <p>
        Error message has higher priority and info message is hidden when error is rendered.
      </p>

      <anypoint-dropdown-menu
        invalidmessage="Dino is required with the order"
        infomessage="Will be added to your order."
        invalid required>
        <label slot="label">Select a dinosaur</label>
        <anypoint-listbox slot="dropdown-content" tabindex="-1">
        ${this.items.map((item) => html`<anypoint-item>${item}</anypoint-item>`)}
        </anypoint-listbox>
      </anypoint-dropdown-menu>
    </section>`;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint dropdown menu</h2>
      ${this._demoTemplate()}
      ${templateIntroduction}
      ${this._usageTemplate()}
      ${this._formsTemplate()}
      ${this._assistiveTemplate()}
    `;
  }
}
