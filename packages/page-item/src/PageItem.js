import { html, css } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@anypoint-web-components/anypoint-item/anypoint-icon-item.js';
import '@anypoint-web-components/anypoint-item/anypoint-item-body.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';
import templateIntroduction from './templateIntroduction.js';

export class PageItem extends DemoPage {
  static get styles() {
    return [
      demoContentStyles,
      headersStyles,
      css`
      .circle {
        width: 25px;
        height: 25px;
        background-color: red;
        border-radius: 50%;
      }
      .avatar {
        display: inline-block;
        box-sizing: border-box;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: orange;
      }
      .blue {
        background-color: #BBDEFB;
      }`
    ];
  }

  constructor() {
    super();
    this.initObservableProperties([
      'demoLegacy',
      'twoLineLegacy',
      'iconLegacy',
      'demoWithIcon',
      'demoTwoLines',
      'complexLegacy',
      'linksLegacy'
    ]);
    this.demoStates = ['Normal', 'Legacy'];
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

  _twoLineDemoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.twoLineLegacy = false;
        break;
      case 1:
        this.twoLineLegacy = true;
        break;
      default:
    }
  }

  _iconDemoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.iconLegacy = false;
        break;
      case 1:
        this.iconLegacy = true;
        break;
      default:
    }
  }

  _complexStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.complexLegacy = false;
        break;
      case 1:
        this.complexLegacy = true;
        break;
      default:
    }
  }

  _linksStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.linksLegacy = false;
        break;
      case 1:
        this.linksLegacy = true;
        break;
      default:
    }
  }

  _toggleDemoOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
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
      This demo lets you preview the dropdown menu element with various
      configuration options.
    </p>
    <arc-interactive-demo
      .states="${demoStates}"
      @state-chanegd="${this._mainDemoStateHandler}"
      ?dark="${darkThemeActive}"
    >
      <div
        role="listbox"
        slot="content">
        <anypoint-item ?legacy="${demoLegacy}">
          Option 1
        </anypoint-item>
        <anypoint-item ?legacy="${demoLegacy}">
          Option 2
        </anypoint-item>
        <anypoint-item ?legacy="${demoLegacy}">
          Option 3
        </anypoint-item>
        <anypoint-item ?legacy="${demoLegacy}">
          <p>Paragraph as a child</p>
        </anypoint-item>
      </div>
    </arc-interactive-demo>
    </section>`;
  }

  _twoLineDemoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      twoLineLegacy
    } = this;
    return html`<section class="documentation-section">
    <h3>Two line list item</h3>
    <p>
      Two line item allows you to create a list with main and secondary
      information.
    </p>
    <p>
      The secondary label should have <code>secondary</code> attribute
    </p>
    <arc-interactive-demo
      .states="${demoStates}"
      @state-chanegd="${this._twoLineDemoStateHandler}"
      ?dark="${darkThemeActive}"
    >
      <div
        role="listbox"
        slot="content">
        <anypoint-item ?legacy="${twoLineLegacy}">
          <anypoint-item-body twoline ?legacy="${twoLineLegacy}">
            <div>Pawel Psztyc</div>
            <div secondary>Sr. Software Engineer</div>
          </anypoint-item-body>
        </anypoint-item>
        <anypoint-item ?legacy="${twoLineLegacy}">
          <anypoint-item-body twoline ?legacy="${twoLineLegacy}">
            <div>John Smith</div>
            <div secondary>QA specialist</div>
          </anypoint-item-body>
        </anypoint-item>
        <anypoint-item ?legacy="${twoLineLegacy}">
          <anypoint-item-body twoline ?legacy="${twoLineLegacy}">
            <div>John Q. Public</div>
            <div secondary>Interaction designer</div>
          </anypoint-item-body>
        </anypoint-item>
      </div>
    </arc-interactive-demo>
    </section>`;
  }

  _iconDemoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      iconLegacy
    } = this;
    return html`<section class="documentation-section">
    <h3>Icon item</h3>
    <p>
      You can add a leading icon to the element.
    </p>
    <arc-interactive-demo
      .states="${demoStates}"
      @state-chanegd="${this._iconDemoStateHandler}"
      ?dark="${darkThemeActive}"
    >
      <div
        role="listbox"
        slot="content">
        <anypoint-icon-item ?legacy="${iconLegacy}">
          <iron-icon icon="add" slot="item-icon"></iron-icon> Add
        </anypoint-icon-item>
        <anypoint-icon-item ?legacy="${iconLegacy}">
          <iron-icon icon="refresh" slot="item-icon"></iron-icon> Refresh
        </anypoint-icon-item>
        <anypoint-icon-item ?legacy="${iconLegacy}">
          <span slot="item-icon" class="circle"></span> Refresh
        </anypoint-icon-item>
      </div>
    </arc-interactive-demo>
    </section>`;
  }

  _complexDemoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      complexLegacy
    } = this;
    return html`<section class="documentation-section">
    <h3>Complex layouts</h3>
    <p>
      Complex layouts are usually a combination of all these elements.
    </p>
    <arc-interactive-demo
      .states="${demoStates}"
      @state-chanegd="${this._complexStateHandler}"
      ?dark="${darkThemeActive}"
    >
      <div
        role="listbox"
        slot="content">
        <anypoint-icon-item ?legacy="${complexLegacy}">
          <div class="avatar blue" slot="item-icon"></div>
          <anypoint-item-body twoline ?legacy="${complexLegacy}">
            <div>Photos</div>
            <div secondary>Jan 9, 2014</div>
          </anypoint-item-body>
          <anypoint-icon-button
            ?legacy="${complexLegacy}"
            aria-label="Activate to toggle favourite">
            <iron-icon icon="star" alt="favourite this!"></iron-icon>
          </anypoint-icon-button>
        </anypoint-icon-item>
        <anypoint-icon-item ?legacy="${complexLegacy}">
          <div class="avatar" slot="item-icon"></div>
          <anypoint-item-body twoline ?legacy="${complexLegacy}">
            <div>Recipes</div>
            <div secondary>Jan 17, 2014</div>
          </anypoint-item-body>
          <anypoint-icon-button
            ?legacy="${complexLegacy}"
            aria-label="Activate to toggle favourite">
            <iron-icon icon="star" alt="favourite this!"></iron-icon>
          </anypoint-icon-button>
        </anypoint-icon-item>
      </div>
    </arc-interactive-demo>
    </section>`;
  }

  _linksTemplate() {
    const {
      demoStates,
      darkThemeActive,
      linksLegacy
    } = this;
    return html`<section class="documentation-section">
    <h3>Item as a link</h3>
    <p>
      <code>anypoint-items</code> can be used as links. Wrap the item in the <code>a</code> element.
    </p>
    <arc-interactive-demo
      .states="${demoStates}"
      @state-chanegd="${this._linksStateHandler}"
      ?dark="${darkThemeActive}"
    >
      <div
        role="listbox"
        slot="content">
        <a class="anypoint-item-link" href="#inbox" tabindex="-1">
          <anypoint-item ?legacy="${linksLegacy}">Inbox</anypoint-item>
        </a>
        <a class="anypoint-item-link" href="#starred" tabindex="-1">
          <anypoint-item ?legacy="${linksLegacy}">Starred</anypoint-item>
        </a>
        <a class="anypoint-item-link" href="#sent" tabindex="-1">
          <anypoint-item ?legacy="${linksLegacy}">Sent mail</anypoint-item>
        </a>
      </div>
    </arc-interactive-demo>
    </section>`;
  }

  contentTemplate() {
    return html`
    <h2>Anypoint item</h2>
    ${this._demoTemplate()}
    ${templateIntroduction}
    ${this._twoLineDemoTemplate()}
    ${this._iconDemoTemplate()}
    ${this._complexDemoTemplate()}
    ${this._linksTemplate()}
    `;
  }
}
