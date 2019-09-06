import { html, css } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-input/anypoint-input.js';
import '@anypoint-web-components/anypoint-autocomplete/anypoint-autocomplete.js';
import 'chance/chance.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';

import usageTemplate from './uageTemplate.js';
import usabilityTemplate from './usabilityTemplate.js';
import introTemplate from './introTemplate.js';

const suggestions = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Bilberry',
  'Blackberry',
  'Blackcurrant',
  'Blueberry',
  'Boysenberry',
  'Cantaloupe',
  'Currant',
  'Cherry',
  'Cherimoya',
  'Cloudberry',
  'Coconut',
  'Cranberry',
  'Damson',
  'Date',
  'Dragonfruit',
  'Durian',
  'Elderberry',
  'Feijoa',
  'Fig',
  'Goji berry',
  'Gooseberry',
  'Grape',
  'Grapefruit',
  'Guava',
  'Huckleberry',
  'Jabuticaba',
  'Jackfruit',
  'Jambul',
  'Jujube',
  'Juniper berry',
  'Kiwi fruit',
  'Kumquat',
  'Lemon',
  'Lime',
  'Loquat',
  'Lychee',
  'Mango',
  'Marion berry',
  'Melon',
  'Miracle fruit',
  'Mulberry',
  'Nectarine',
  'Olive',
  'Orange',
];

/* global chance */

export class PageAutocomplete extends DemoPage {
  static get styles() {
    return [
      demoContentStyles,
      headersStyles,
      css`
        :host {
          --anypoiont-autocomplete-dropdown-shaddow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
            0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
        }
      `,
    ];
  }

  constructor() {
    super();
    this.initObservableProperties([
      'demoOutlined',
      'demoCompatibility',
      'demoNoink',
      'demoUseLoader',
      'demoNoAnimation',
    ]);
    this.demoStates = ['Filled', 'Outlined', 'Anypoint'];
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _mainDemoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 1:
        this.demoOutlined = true;
        this.demoCompatibility = false;
        break;
      case 2:
        this.demoOutlined = false;
        this.demoCompatibility = true;
        break;
      case 0:
      default:
        this.demoOutlined = false;
        this.demoCompatibility = false;
    }
  }

  _demoQuery(e) {
    if (!this.demoUseLoader) {
      return;
    }
    const { value } = e.detail;
    const { target } = e;
    setTimeout(() => {
      const _suggestions = [];
      /* eslint-disable-next-line */
      for (let i = 0; i < 25; i++) {
        _suggestions.push(`${value}${chance.word()}`);
      }
      target.source = _suggestions;
    }, 700);
  }

  _demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      demoOutlined,
      demoCompatibility,
      demoNoink,
      demoUseLoader,
      demoNoAnimation,
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the autocomplete element with various configuration options.
        </p>
        <arc-interactive-demo
          .states="${demoStates}"
          @state-chanegd="${this._mainDemoStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <div role="combobox" slot="content" aria-label="Input field with list suggestions">
            <anypoint-input
              ?outlined="${demoOutlined}"
              ?compatibility="${demoCompatibility}"
              id="fruitsSuggestions1"
            >
              <label slot="label">Enter fruit name</label>
            </anypoint-input>

            <anypoint-autocomplete
              slot="content"
              openonfocus
              target="fruitsSuggestions1"
              ?outlined="${demoOutlined}"
              ?compatibility="${demoCompatibility}"
              ?noink="${demoNoink}"
              ?noAnimations="${demoNoAnimation}"
              ?loader="${demoUseLoader}"
              .source="${suggestions}"
              @query="${this._demoQuery}"
            >
            </anypoint-autocomplete>
          </div>

          <label slot="options" id="mainOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoNoink"
            @change="${this._toggleMainOption}"
            >No ink</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoNoAnimation"
            @change="${this._toggleMainOption}"
            >No animation</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoUseLoader"
            @change="${this._toggleMainOption}"
            >Async suggestions</anypoint-checkbox
          >
        </arc-interactive-demo>
      </section>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint Autocomplete</h2>
      ${this._demoTemplate()} ${introTemplate} ${usageTemplate} ${usabilityTemplate}
    `;
  }
}
