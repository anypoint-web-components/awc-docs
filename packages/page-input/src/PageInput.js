import { html, css } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-button.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-group.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@anypoint-web-components/anypoint-input/anypoint-input.js';
import '@anypoint-web-components/anypoint-input/anypoint-textarea.js';
import '@anypoint-web-components/anypoint-input/anypoint-masked-input.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';
import templateIntroduction from './templateIntroduction.js';
import templateUsage from './templateUsage.js';
import templateCustomValidation from './templateCw.js';

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-plusplus: 0 */
/* eslint no-continue: 0 */

export class PageInput extends DemoPage {
  static get styles() {
    return [
      demoContentStyles,
      headersStyles,
      css`
        anypoint-radio-button {
          display: block;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.initObservableProperties([
      'readonly',
      'formData',
      'textFieldOutlined',
      'textFieldCompatibility',
      'textFiledLeading',
      'textFiledTrailing',
      'textFieldError',
      'textFieldInfo',
      'textFiledNoLabelFloat',
      'typeSelector',
      'textAreaOutlined',
      'textAreaCompatibility',
      'textAreaInfo',
      'textAreaError',
      'textAreaNoLabelFloat',
      'typeFieldOutlined',
      'typeFieldCompatibility',
      'mainFiledReadOnly',
      'mainFiledDisabled',
      'maskedOutlined',
      'maskedCompatibility',
      'maskedNoLabelFloat',
      'maskedDisabled',
      'maskedReadOnly',
    ]);

    this.textFieldStates = ['Filled', 'Outlined', 'Anypoint'];
    this.textFieldCompatibility = false;
    this.textFieldOutlined = false;
    this.typeSelector = 'text';
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _readonlyHandler(e) {
    this.readonly = e.target.checked;
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

  _textFiledStateHandler(e) {
    const state = e.detail.value;
    let gaValue;
    switch (state) {
      case 0:
        this.textFieldOutlined = false;
        this.textFieldCompatibility = false;
        gaValue = 'normal';
        break;
      case 1:
        this.textFieldOutlined = true;
        this.textFieldCompatibility = false;
        gaValue = 'outlined';
        break;
      case 2:
        this.textFieldOutlined = false;
        this.textFieldCompatibility = true;
        gaValue = 'compatibility';
        break;
      default:
        gaValue = 'default';
    }
    this.notifyStateChange(gaValue, 'main-demo-change');
  }

  _typesFiledStateHandler(e) {
    const state = e.detail.value;
    let gaValue;
    switch (state) {
      case 0:
        this.typeFieldOutlined = false;
        this.typeFieldCompatibility = false;
        gaValue = 'normal';
        break;
      case 1:
        this.typeFieldOutlined = true;
        this.typeFieldCompatibility = false;
        gaValue = 'outlined';
        break;
      case 2:
        this.typeFieldOutlined = false;
        this.typeFieldCompatibility = true;
        gaValue = 'compatibility';
        break;
      default:
        gaValue = 'default';
    }
    this.notifyStateChange(gaValue, 'types-demo-change');
  }

  _textAreaStateHandler(e) {
    const state = e.detail.value;
    let gaValue;
    switch (state) {
      case 0:
        this.textAreaOutlined = false;
        this.textAreaCompatibility = false;
        gaValue = 'normal';
        break;
      case 1:
        this.textAreaOutlined = true;
        this.textAreaCompatibility = false;
        gaValue = 'outlined';
        break;
      case 2:
        this.textAreaOutlined = false;
        this.textAreaCompatibility = true;
        gaValue = 'compatibility';
        break;
      default:
        gaValue = 'default';
    }
    this.notifyStateChange(gaValue, 'textarea-demo-change');
  }

  _maskedStateHandler(e) {
    const state = e.detail.value;
    let gaValue;
    switch (state) {
      case 0:
        this.maskedOutlined = false;
        this.maskedCompatibility = false;
        gaValue = 'normal';
        break;
      case 1:
        this.maskedOutlined = true;
        this.maskedCompatibility = false;
        gaValue = 'outlined';
        break;
      case 2:
        this.maskedOutlined = false;
        this.maskedCompatibility = true;
        gaValue = 'compatibility';
        break;
      default:
        gaValue = 'default';
    }
    this.notifyStateChange(gaValue, 'marked-demo-change');
  }

  _textFiledAssistiveHandler(e) {
    const { name, checked } = e.target;
    if (!checked) {
      return;
    }
    if (name === 'info') {
      this.textFieldError = false;
      this.textFieldInfo = true;
    } else if (name === 'error') {
      this.textFieldError = true;
      this.textFieldInfo = false;
    } else {
      this.textFieldError = false;
      this.textFieldInfo = false;
    }
    this.notifyOptionChange(name, 'text-field-activate');
  }

  _textAreaAssistiveHandler(e) {
    const { name, checked } = e.target;
    if (!checked) {
      return;
    }
    if (name === 'info') {
      this.textAreaError = false;
      this.textAreaInfo = true;
    } else if (name === 'error') {
      this.textAreaError = true;
      this.textAreaInfo = false;
    } else {
      this.textAreaError = false;
      this.textAreaInfo = false;
    }
    this.notifyOptionChange(name, 'text-area-activate');
  }

  _textFiledTypeHandler(e) {
    const { name, checked } = e.target;
    if (!checked) {
      return;
    }
    this.typeSelector = name;
    this.notifyOptionChange(name, 'text-field-type');
  }

  _headerControlsTemplate() {
    return html`
      ${super._headerControlsTemplate()}
      <div class="settings-action-item">
        <paper-toggle-button checked @checked-changed="${this._stylesHandler}"
          >Toggle styles</paper-toggle-button
        >
      </div>
    `;
  }

  _demoTemplate() {
    const {
      textFieldStates,
      textFieldOutlined,
      textFieldCompatibility,
      darkThemeActive,
      textFiledLeading,
      textFiledTrailing,
      textFiledNoLabelFloat,
      textFieldInfo,
      textFieldError,
      mainFiledReadOnly,
      mainFiledDisabled,
    } = this;
    const infoMessage = textFieldInfo ? 'Assistive text label' : undefined;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the text field element with various configuration options.
        </p>
        <arc-interactive-demo
          .states="${textFieldStates}"
          @state-chanegd="${this._textFiledStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-input
            slot="content"
            name="main"
            title="Text field"
            ?outlined="${textFieldOutlined}"
            ?compatibility="${textFieldCompatibility}"
            .infoMessage="${infoMessage}"
            invalidmessage="This value is invalid"
            ?invalid="${textFieldError}"
            ?nolabelfloat="${textFiledNoLabelFloat}"
            ?readOnly="${mainFiledReadOnly}"
            ?disabled="${mainFiledDisabled}"
          >
            <label slot="label">Label</label>
            ${textFiledLeading
              ? html`
                  <iron-icon icon="lock-outline" slot="prefix"></iron-icon>
                `
              : undefined}
            ${textFiledTrailing
              ? html`
                  <iron-icon icon="clear" slot="suffix"></iron-icon>
                `
              : undefined}
          </anypoint-input>

          <label slot="options" id="mainOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="textFiledLeading"
            @change="${this._toggleMainOption}"
            >Leading icon</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="textFiledTrailing"
            @change="${this._toggleMainOption}"
            >Trailing icon</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="textFiledNoLabelFloat"
            @change="${this._toggleMainOption}"
            >No label float</anypoint-checkbox
          >

          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="mainFiledDisabled"
            @change="${this._toggleMainOption}"
            >Disabled</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="mainFiledReadOnly"
            @change="${this._toggleMainOption}"
            >Read only</anypoint-checkbox
          >

          <label slot="options" id="mainAssistiveLabel">Assistive text</label>
          <anypoint-radio-group
            slot="options"
            selectable="anypoint-radio-button"
            aria-labelledby="mainAssistiveLabel"
          >
            <anypoint-radio-button @change="${this._textFiledAssistiveHandler}" checked name="none"
              >None</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledAssistiveHandler}" name="info"
              >Info message</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledAssistiveHandler}" name="error"
              >Error text</anypoint-radio-button
            >
          </anypoint-radio-group>
        </arc-interactive-demo>
      </section>
    `;
  }

  _typesTemplate() {
    const {
      textFieldStates,
      typeFieldOutlined,
      typeFieldCompatibility,
      darkThemeActive,
      typeSelector,
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Input types</h3>
        <p>
          The component support all native input types.
        </p>

        <arc-interactive-demo
          opened
          .states="${textFieldStates}"
          @state-chanegd="${this._typesFiledStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-input
            slot="content"
            title="Text field"
            ?outlined="${typeFieldOutlined}"
            ?compatibility="${typeFieldCompatibility}"
            .type="${typeSelector}"
            name="ex7"
          >
            <label slot="label">Text field</label>
          </anypoint-input>

          <label slot="options" id="typesLabel">Input type</label>
          <anypoint-radio-group
            slot="options"
            selectable="anypoint-radio-button"
            aria-labelledby="typesLabel"
          >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" checked name="text"
              >Text</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="number"
              >Number</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="password"
              >Password</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="date"
              >Date</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="time"
              >Time</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="datetime-local"
              >Datetime-local</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="month"
              >Month</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="week"
              >Week</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="color"
              >Color</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="email"
              >Email</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="url"
              >URL</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="tel"
              >Tel</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="search"
              >Search</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textFiledTypeHandler}" name="file"
              >File</anypoint-radio-button
            >
          </anypoint-radio-group>
        </arc-interactive-demo>
      </section>
    `;
  }

  _texareaTemplate() {
    const {
      textFieldStates,
      darkThemeActive,
      textAreaInfo,
      textAreaOutlined,
      textAreaCompatibility,
      textAreaError,
      textAreaNoLabelFloat,
    } = this;
    const infoMessage = textAreaInfo ? 'Assistive text label' : undefined;
    return html`
      <section class="documentation-section">
        <h3>Text area field</h3>
        <p>
          Text area field focuses user attention on entering more complex text input.
        </p>

        <p>
          It does not accept prefixes and suffixes as the user needs an space to imput the value.
        </p>

        <arc-interactive-demo
          .states="${textFieldStates}"
          @state-chanegd="${this._textAreaStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <section slot="content">
            <anypoint-textarea
              name="main"
              title="Text field"
              ?outlined="${textAreaOutlined}"
              ?compatibility="${textAreaCompatibility}"
              .infoMessage="${infoMessage}"
              invalidmessage="This value is invalid"
              ?invalid="${textAreaError}"
              ?nolabelfloat="${textAreaNoLabelFloat}"
            >
              <label slot="label">Label</label>
            </anypoint-textarea>
          </section>

          <label slot="options" id="textAreaOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="textAreaOptionsLabel"
            slot="options"
            name="textAreaNoLabelFloat"
            @change="${this._toggleMainOption}"
            >No label float</anypoint-checkbox
          >

          <label slot="options" id="areaAssistiveLabel">Assistive text</label>
          <anypoint-radio-group
            slot="options"
            selectable="anypoint-radio-button"
            aria-labelledby="areaAssistiveLabel"
          >
            <anypoint-radio-button @change="${this._textAreaAssistiveHandler}" checked name="none"
              >None</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textAreaAssistiveHandler}" name="info"
              >Info message</anypoint-radio-button
            >
            <anypoint-radio-button @change="${this._textAreaAssistiveHandler}" name="error"
              >Error text</anypoint-radio-button
            >
          </anypoint-radio-group>
        </arc-interactive-demo>
        <h3>Positioning</h3>
        <p>
          Text area field should be the only element in a row. The user may choose to resize the
          text area using native resize control. You should not make that decission on behalf of the
          user. Additional UI widgets placed aside of the text area may obscure the view and make
          providing input harder to some users.
        </p>
      </section>
    `;
  }

  _maskedInputTemplate() {
    const {
      textFieldStates,
      darkThemeActive,
      maskedOutlined,
      maskedCompatibility,
      maskedNoLabelFloat,
      maskedDisabled,
      maskedReadOnly,
    } = this;

    return html`
      <section class="documentation-section">
        <h3>Masked inputs</h3>
        <p>
          You can mask the input and toggle value visibility by using
          <code>anypoint-masked-input</code>. The input renders an icon to toggle input's
          visibility.
        </p>

        <arc-interactive-demo
          .states="${textFieldStates}"
          @state-chanegd="${this._maskedStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <section slot="content">
            <anypoint-masked-input
              name="main"
              title="Text field"
              ?outlined="${maskedOutlined}"
              ?compatibility="${maskedCompatibility}"
              ?nolabelfloat="${maskedNoLabelFloat}"
              ?disabled="${maskedDisabled}"
              ?readOnly="${maskedReadOnly}"
            >
              <label slot="label">Label</label>
            </anypoint-masked-input>
          </section>

          <label slot="options" id="maskedOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="maskedOptionsLabel"
            slot="options"
            name="maskedNoLabelFloat"
            @change="${this._toggleMainOption}"
            >No label float</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="maskedOptionsLabel"
            slot="options"
            name="maskedDisabled"
            @change="${this._toggleMainOption}"
            >Disabled</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="maskedOptionsLabel"
            slot="options"
            name="maskedReadOnly"
            @change="${this._toggleMainOption}"
            >Read only</anypoint-checkbox
          >
        </arc-interactive-demo>
      </section>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint text field</h2>
      ${this._demoTemplate()} ${templateIntroduction} ${templateUsage} ${this._typesTemplate()}
      ${templateCustomValidation} ${this._texareaTemplate()} ${this._maskedInputTemplate()}
    `;
  }
}
