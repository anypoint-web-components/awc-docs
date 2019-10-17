import { html, css } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-chip-input/anypoint-chip-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import * as mapIcons from './maps-icons.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';

import introTemplate from './introTemplate.js';

export class PageChipInput extends DemoPage {
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
      'demoCompatibility',
      'demoRemovable',
      'demoDisabled',
      'demoAllowedOnly',
      'demoSuggestions',
    ]);
    this.demoStates = ['Material Design', 'Anypoint'];
    this.simpleSuggestions = [
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

    this.auto4Out = ['activity-1', 'activity-2'];
    this.auto5Out = ['Biking', 'Shopping'];

    this.predefChips = [
      {
        label: 'Chip #1',
      },
      {
        label: 'Chip #2',
        removable: true,
      },
      {
        label: 'Chip #3',
        icon: mapIcons.directionsBike,
      },
    ];

    this.iconSuggestions = [
      {
        value: 'Biking',
        icon: mapIcons.directionsBike,
      },
      {
        value: 'Boat trip',
        icon: mapIcons.directionsBoat,
      },
      {
        value: 'Bus trip',
        icon: mapIcons.directionsBus,
      },
      {
        value: 'Car trip',
        icon: mapIcons.directionsCar,
      },
      {
        value: 'Train trip',
        icon: mapIcons.directionsRailway,
      },
      {
        value: 'Running',
        icon: mapIcons.directionsRun,
      },
      {
        value: 'Hiking',
        icon: mapIcons.directionsWalk,
      },
      {
        value: 'Reading',
        icon: mapIcons.localLibrary,
      },
      {
        value: 'Shopping',
        icon: mapIcons.localGroceryStore,
      },
      {
        value: 'Movies!',
        icon: mapIcons.localMovies,
      },
    ];

    this.allowedChips = ['apple', 'Orange', 'BANANA'];

    this.idSuggestions = [
      {
        value: 'Biking',
        icon: mapIcons.directionsBike,
        id: 'activity-1',
      },
      {
        value: 'Boat trip',
        icon: mapIcons.directionsBoat,
        id: 'activity-2',
      },
      {
        value: 'Bus trip',
        icon: mapIcons.directionsBus,
        id: 'activity-3',
      },
      {
        value: 'Car trip',
        icon: mapIcons.directionsCar,
        id: 'activity-4',
      },
      {
        value: 'Train trip',
        icon: mapIcons.directionsRailway,
        id: 'activity-5',
      },
      {
        value: 'Running',
        icon: mapIcons.directionsRun,
        id: 'activity-6',
      },
      {
        value: 'Hiking',
        icon: mapIcons.directionsWalk,
        id: 'activity-7',
      },
      {
        value: 'Reading',
        icon: mapIcons.localLibrary,
        id: 'activity-8',
      },
      {
        value: 'Shopping',
        icon: mapIcons.localGroceryStore,
        id: 'activity-9',
      },
      {
        value: 'Movies!',
        icon: mapIcons.localMovies,
        id: 'activity-10',
      },
    ];
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoStateHandler(e) {
    const state = e.detail.value;
    this.demoCompatibility = state === 1;
  }

  _demoTemplate() {
    const {
      demoStates,
      demoCompatibility,
      darkThemeActive,
      demoRemovable,
      demoDisabled,
      demoAllowedOnly,
      demoSuggestions,
    } = this;
    const allowed = demoAllowedOnly ? this.allowedChips : undefined;
    const info = allowed ? `Only: ${allowed.join(', ')}` : undefined;
    const source = demoSuggestions ? this.simpleSuggestions : undefined;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the chip text field element with various configuration options.
        </p>
        <arc-interactive-demo
          .states="${demoStates}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-chip-input
            slot="content"
            ?compatibility="${demoCompatibility}"
            ?removable="${demoRemovable}"
            ?disabled="${demoDisabled}"
            .allowed="${allowed}"
            .infoMessage="${info}"
            .source="${source}"
          >
            <label slot="label">Chips input</label>
          </anypoint-chip-input>

          <label slot="options" id="mainOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoDisabled"
            @change="${this._toggleMainOption}"
            >Disabled</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoAllowedOnly"
            @change="${this._toggleMainOption}"
            >Allowed only</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoSuggestions"
            @change="${this._toggleMainOption}"
            >Suggestions</anypoint-checkbox
          >
        </arc-interactive-demo>
      </section>
    `;
  }

  _usageTemplate() {
    return html`
      <section class="documentation-section">
        <h2>Usage</h2>
        <p>Anypoint chip comes with 2 predefied styles:</p>
        <ul>
          <li><b>Material</b> - Normal state</li>
          <li><b>Compatibility</b> - To provide compatibility with Anypoint design</li>
        </ul>

        <p>
          See
          <a href="https://material.io/components/chips/">chips</a>
          documentation in Material Defign documentation for principles and anatomy of a chip.
        </p>

        <h3>Input value</h3>

        <p>
          The <code>value</code> property represents current user input. The input is cleared each
          time a suggestion is accepted.
        </p>

        <p>
          Chips value can be read from <code>chipsValue</code> property. It also accepts previous
          values as long as suggestions (<code>source</code> property) is set.
        </p>

        <p>
          You can directly manipulate chips data model by accessing <code>chips</code> property.
          Note, that the element does not observe deep changes in the array. Re-assign the array
          when changing the model. lit-html handles template rendering efficiently in this case.
        </p>

        <h3>Predefined suggestions</h3>
        <p>
          The input accepts chips value via <code>chips</code> property. It is an array of values to
          render when the element is initialized or at runtime.
        </p>

        <anypoint-chip-input
          data-property="predefOut"
          label="Chips input demo"
          .chips="${this.predefChips}"
        ></anypoint-chip-input>

        <p>
          Chips are required to have a <code>label</code> property that is used to render the value.
        </p>

        <p>
          A chip can have a <code>removable</code> property that allows the user to remove the chip
          from the input.
        </p>

        <p>An <code>icon</code> property allows to render a chip with an icon.</p>

        <details>
          <summary>Code example</summary>
          <code>
            <pre>
            ${`const chips = [
              {
                label: 'Chip #1'
              },
              {
                label: 'Chip #2', removable: true
              },
              {
                label: 'Chip #3', icon: mapIcons.directionsBike
              }
            ];
            ...
            <anypoint-chip-input
              .chips="\${chips}"
            >
              <label slot="label">Enter value</label>
            </anypoint-chip-input>`}
            </pre
            >
          </code>
        </details>

        <h3>Chip suggestions</h3>
        <p>
          Chip input accepts <code>source</code> array with a list of suggestions to render in a
          dropdown on user input. It can be list of strings or a list of maps with
          <code>value</code> property and optionally <code>icon</code>
          property.
        </p>

        <h4>Simple suggestions</h4>
        <anypoint-chip-input .source="${this.simpleSuggestions}">
          <label slot="label">Type your favourite fruits</label>
        </anypoint-chip-input>

        <details>
          <summary>Code example</summary>
          <code>
            <pre>
            ${`const source = [
              'Apple', 'Apricot', 'Avocado', ...
            ];
            ...
            <anypoint-chip-input
              .source="\${source}"
            >
              <label slot="label">Type your favourite fruits</label>
            </anypoint-chip-input>`}
            </pre
            >
          </code>
        </details>

        <h4>Icons suggestions</h4>
        <p>
          The icon is rendered in a chip only.
        </p>
        <anypoint-chip-input .source="${this.iconSuggestions}" infoMessage="Type 'b' in the input">
          <label slot="label">Type your favourite fruits</label>
        </anypoint-chip-input>
        <details>
          <summary>Code example</summary>
          <code>
            <pre>
            ${`const source = [
              {
                value: 'Biking',
                icon: mapIcons.directionsBike
              }, {
                value: 'Boat trip',
                icon: mapIcons.directionsBoat
              }, {
                value: 'Bus trip',
                icon: mapIcons.directionsBus
              }
              ...
            ];
            ...
            <anypoint-chip-input
              .source="\${source}"
            >
              <label slot="label">Enter value</label>
            </anypoint-chip-input>`}
            </pre
            >
          </code>
        </details>

        <h3>Restoring values from suggestions with icons</h3>
        <p>
          Value can be restored by passing previous value to <code>chipsValue</code>
          property.
        </p>
        <anypoint-chip-input .chipsValue="${this.auto5Out}" .source="${this.iconSuggestions}">
          <label slot="label">Type your favourite fruits</label>
        </anypoint-chip-input>
        <details>
          <summary>Code example</summary>
          <code>
            <pre>
            ${`const source = [
              {
                value: 'Biking',
                icon: mapIcons.directionsBike
              }, {
                value: 'Boat trip',
                icon: mapIcons.directionsBoat
              }, {
                value: 'Bus trip',
                icon: mapIcons.directionsBus
              }
              ...
            ];
            const chipsValue = ['Biking', 'Shopping'];
            ...
            <anypoint-chip-input
              .source="\${source}"
              .chipsValue="\${chipsValue}"
            >
              <label slot="label">Enter value</label>
            </anypoint-chip-input>`}
            </pre
            >
          </code>
        </details>

        <h3>Allowed chips</h3>
        <p>
          It is possible to limit the input to a set list of values by passing allowed list to the
          <code>allowed</code> property.
        </p>
        <anypoint-chip-input
          .allowed="${this.allowedChips}"
          infoMessage="Only: Apple, Orange, and Banana"
        >
          <label slot="label">Only allowed will become chips and value</label>
        </anypoint-chip-input>
        <h3>Suggestions with IDs</h3>
        <p>
          When <code>source</code> contains an <code>id</code> property on an item, the
          <code>id</code> is returned in the chipsValue instead of <code>value</code>
        </p>
        <anypoint-chip-input .source="${this.idSuggestions}">
          <label slot="label">Type your favourite fruits</label>
        </anypoint-chip-input>
        <details>
          <summary>Code example</summary>
          <code>
            <pre>
            ${`const source = [
              {
                value: 'Biking',
                icon: mapIcons.directionsBike
                id: 'activity-1'
              }, {
                value: 'Boat trip',
                icon: mapIcons.directionsBoat
                id: 'activity-2'
              }, {
                value: 'Bus trip',
                icon: mapIcons.directionsBus
                id: 'activity-3'
              }
              ...
            ];
            ...
            <anypoint-chip-input
              .source="\${source}"
            >
              <label slot="label">Type your favourite fruits</label>
            </anypoint-chip-input>`}
            </pre
            >
          </code>
        </details>

        <h3>Restoring from IDs</h3>
        <p>
          Value can be restored by passing previous value to <code>chipsValue</code>
          property.
        </p>
        <anypoint-chip-input .chipsValue="${this.auto4Out}" .source="${this.idSuggestions}">
          <label slot="label">Type your favourite fruits</label>
        </anypoint-chip-input>
        <details>
          <summary>Code example</summary>
          <code>
            <pre>
            ${`const source = [
              {
                value: 'Biking',
                icon: mapIcons.directionsBike
                id: 'activity-1'
              }, {
                value: 'Boat trip',
                icon: mapIcons.directionsBoat
                id: 'activity-2'
              }, {
                value: 'Bus trip',
                icon: mapIcons.directionsBus
                id: 'activity-3'
              }
              ...
            ];
            const chipsValue = ['activity-1', 'activity-2'];
            ...
            <anypoint-chip-input
              .source="\${source}"
              .chipsValue="\${chipsValue}"
            >
              <label slot="label">Type your favourite fruits</label>
            </anypoint-chip-input>`}
            </pre
            >
          </code>
        </details>
      </section>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint chip text field</h2>
      ${this._demoTemplate()} ${introTemplate} ${this._usageTemplate()}
    `;
  }
}
