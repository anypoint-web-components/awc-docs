import { html, css } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';
import introTemplate from './templateIntroduction.js';
import usageTemplate from './templateUsage.js';

export class PageRadioButton extends DemoPage {
  static get styles() {
    return [
      demoContentStyles,
      headersStyles,
      css`
      .block-label {
        display: block;
      }
      `
    ];
  }

  constructor() {
    super();
    this.initObservableProperties([
      'demoDisabled'
    ]);
    this.componentName = 'anypoint-radio-button';
    this.demoStates = ['Normal'];
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      demoDisabled
    } = this;
    return html`<section class="documentation-section">
      <h3>Interactive demo</h3>
      <p>
        This demo lets you preview the radio button in a radio group with various
        configuration options.
      </p>
      <arc-interactive-demo
        .states="${demoStates}"
        ?dark="${darkThemeActive}"
      >
        <label id="mainLabel">Radio group</label>
        <anypoint-radio-group
          aria-labelledby="mainLabel"
          slot="content"
          ?disabled="${demoDisabled}"
          >
          <anypoint-radio-button name="fruit">Apple</anypoint-radio-button>
          <anypoint-radio-button name="fruit">Banana</anypoint-radio-button>
          <anypoint-radio-button name="fruit">Orange</anypoint-radio-button>
        </anypoint-radio-group>
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

  contentTemplate() {
    return html`
      <h2>Anypoint Radio Button</h2>
      ${this._demoTemplate()}
      ${introTemplate}
      ${usageTemplate}
    `;
  }
}
