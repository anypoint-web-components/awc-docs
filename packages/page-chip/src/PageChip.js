import { html, css } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-chip/anypoint-chip.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@polymer/paper-toast/paper-toast.js';
import { clearAll } from '@advanced-rest-client/arc-icons/ArcIcons.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';

import introTemplate from './introTemplate.js';

let partsTestMessage;
{
  const p = document.createElement('span');
  const hasParts = p.part !== undefined;
  partsTestMessage = hasParts
    ? html`
        <p>Your browser support CSS Shadow Parts</p>
      `
    : html`
        <p>Your browser do not support CSS Shadow Parts</p>
      `;
}

const types = ['Extra soft', 'Soft', 'Medium', 'Hard', 'Extra hard'];

export class PageChip extends DemoPage {
  static get styles() {
    return [
      demoContentStyles,
      headersStyles,
      css`
        .wrap-horizontal {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
        }

        .types anypoint-chip,
        .actions anypoint-chip {
          cursor: pointer;
        }

        .selected {
          --anypoint-chip-label-color: #673ab7;
          --anypoint-chip-background-color: #d1c4e9;
          --anypoint-chip-focused-background-color: #d1c4e9;
        }

        .themed {
          --anypoint-chip-background-color: rgb(176, 190, 197);
          --anypoint-chip-icon-color: yellow;
          --anypoint-chip-label-color: red;
          --anypoint-chip-label-focused-color: pink;
          --anypoint-chip-focused-background-color: #fff;
        }

        .themed-parts anypoint-chip::part(anypoint-chip-container) {
          background-color: #cddc39;
          padding: 4px;
        }

        .themed-parts anypoint-chip::part(anypoint-chip-label) {
          color: black;
        }

        .themed-parts anypoint-chip::part(anypoint-chip-remove) {
          color: white;
          background-color: #f44336;
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
      'demoLeadingIcon',
    ]);
    this.demoStates = ['Material Design', 'Anypoint'];
    this.amenities = [
      { label: 'Elevator' },
      { label: 'Washer / Dryer' },
      { label: 'Fireplace' },
      { label: 'Wheelchair access' },
      { label: 'Dogs ok' },
      { label: 'Cats ok' },
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

  _toggleAmenitiesFilter(e) {
    const index = Number(e.target.dataset.index);
    const item = { ...this.amenities[index] };
    item.selected = !item.selected;
    this.amenities[index] = item;
    this.render();
  }

  _toggleTypesChoice(e) {
    const selectedClass = 'selected';
    const selected = this.shadowRoot.querySelector(`.types .${selectedClass}`);
    if (selected) {
      selected.classList.remove(selectedClass);
    }
    e.currentTarget.classList.add(selectedClass);
  }

  _handleAction(e) {
    const { action } = e.currentTarget.dataset;
    if (!action) {
      return;
    }
    const toast = this.shadowRoot.querySelector(`#${action}Action`);
    toast.opened = true;
  }

  _demoTemplate() {
    const {
      demoStates,
      demoCompatibility,
      darkThemeActive,
      demoLeadingIcon,
      demoRemovable,
      demoDisabled,
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the chip element with various configuration options.
        </p>
        <arc-interactive-demo
          .states="${demoStates}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-chip
            slot="content"
            ?compatibility="${demoCompatibility}"
            ?removable="${demoRemovable}"
            ?disabled="${demoDisabled}"
          >
            ${demoLeadingIcon
              ? html`
                  <iron-icon icon="maps:directions-bike" slot="icon"></iron-icon>
                `
              : ''}
            Biking
          </anypoint-chip>

          <label slot="options" id="mainOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoLeadingIcon"
            @change="${this._toggleMainOption}"
            >Leading icon</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoRemovable"
            @change="${this._toggleMainOption}"
            >Removable</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoDisabled"
            @change="${this._toggleMainOption}"
            >Disabled</anypoint-checkbox
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

        <h3>Input chips</h3>
        <p>
          Chips can be used in input elements representing a tag or category.
        </p>
        <div>
          <anypoint-chip removable="">
            <iron-icon icon="communication:location-on" slot="icon"></iron-icon>
            Portland
          </anypoint-chip>

          <anypoint-chip removable="">
            <iron-icon icon="maps:directions-bike" slot="icon"></iron-icon>
            Biking
          </anypoint-chip>
        </div>

        <h3>Choice chips</h3>
        <p>
          Chips can represent one of selected options.
        </p>
        <div>
          <h4>Select type</h4>
          <div class="wrap-horizontal types">
            ${types.map(
              item => html`
                <anypoint-chip @click="${this._toggleTypesChoice}">
                  ${item}
                </anypoint-chip>
              `,
            )}
          </div>
        </div>

        <h3>Filter chips</h3>
        <p>
          Chips represents an attribute.
        </p>
        <h4>Choose amenities</h4>
        <div class="wrap-horizontal">
          ${this.amenities.map(
            (item, index) => html`
              <anypoint-chip @click="${this._toggleAmenitiesFilter}" toggles data-index="${index}">
                ${item.selected
                  ? html`
                      <iron-icon icon="check" slot="icon"></iron-icon>
                    `
                  : ''}
                ${item.label}
              </anypoint-chip>
            `,
          )}
        </div>

        <h3>Action chips</h3>
        <p>
          Chips represents an action that can be taken in the UI.
        </p>
        <div class="wrap-horizontal actions">
          <anypoint-chip @click="${this._handleAction}" data-action="brightness">
            <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
            <span>Turn on lights</span>
          </anypoint-chip>

          <anypoint-chip @click="${this._handleAction}" data-action="alarm">
            <iron-icon icon="alarm" slot="icon"></iron-icon>
            <span>Set alarm</span>
          </anypoint-chip>

          <anypoint-chip @click="${this._handleAction}" data-action="clear">
            <iron-icon icon="communication:clear-all" slot="icon"></iron-icon>
            <span>Clear all</span>
          </anypoint-chip>
        </div>

        <h3>Themed chips</h3>
        <p>
          The chips can be styled via CSS variables.
        </p>
        <section class="demo">
          <div class="wrap-horizontal actions">
            <div class="themed">
              <anypoint-chip>
                <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
                Styled text child
              </anypoint-chip>

              <anypoint-chip>
                <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
                <span>Styled element child</span>
              </anypoint-chip>
            </div>
          </div>
        </section>

        <h3>Themed chips with CSS parts</h3>
        <p>
          The chips can be styled via CSS parts.
        </p>
        ${partsTestMessage}
        <div class="wrap-horizontal actions">
          <div class="themed-parts">
            <anypoint-chip removable>
              <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
              Styled with CSS parts
            </anypoint-chip>

            <anypoint-chip>
              <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
              <span>Also styled with parts</span>
            </anypoint-chip>
          </div>
        </div>

        <h3>Custom "close" icon</h3>
        <p>
          The close icon can be replaced by other icon by setting
          <code>removeIcon</code> property. The value must be a <code>SVGTemplateResult</code> from
          <code>lit-html</code> library.
        </p>
        <div class="wrap-horizontal actions">
          <anypoint-chip .removeIcon="${clearAll}" removable>
            Custom icon
          </anypoint-chip>
        </div>
      </section>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint chip (pill)</h2>
      ${this._demoTemplate()} ${introTemplate} ${this._usageTemplate()}

      <paper-toast id="brightnessAction" text="Turing lights on"></paper-toast>
      <paper-toast id="alarmAction" text="Setting the alarm"></paper-toast>
      <paper-toast id="clearAction" text="Clearing all actions"></paper-toast>
    `;
  }
}
