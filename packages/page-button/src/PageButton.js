import { html, css } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-icons/editor-icons.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import { DemoPage } from '../../demo-page/demo-page.js';
import { demoContentStyles, headersStyles } from '../../awc-docs/src/common-styles.js';
import templateIntroduction from './templateIntroduction.js';
import templateUsage from './templateUsage.js';

/* eslint no-param-reassign: ["error", { "props": false }] */

export class PageButton extends DemoPage {
  static get styles() {
    return [
      demoContentStyles,
      headersStyles,
      css`
        .centered anypoint-button {
          margin: 12px 8px;
        }

        anypoint-icon-button img {
          width: 24px;
          height: 24px;
        }

        .content-control {
          border: 1px #bdbdbd solid;
          padding: 4px;
          margin: -2px;
          --anypoint-icon-button-emphasis-low-active-background-color: transparent;
        }

        .content-control[active] {
          background-color: #eeeeee;
        }

        .space {
          display: inline-block;
          width: 8px;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.initObservableProperties([
      'demoButtonEmphasis',
      'demoButtonLegacy',
      'demoToggles',
      'demoLeadingIcon',
      'demoNoink',
      'demoDisabed',
      'iconButtonLegacy',
      'iconButtonEmphasis',
      'iconNoink',
      'iconDisabed',
      'iconToggles',
    ]);

    this.buttonStates = ['Text', 'Outlined', 'Contained', 'Legacy'];
    this.demoButtonEmphasis = 'low';
    this.iconButtonEmphasis = 'low';
  }

  _demoEmphasisHandler(e) {
    const state = e.detail.value;
    let value;
    switch (state) {
      case 0:
        value = 'low';
        break;
      case 1:
        value = 'medium';
        break;
      case 2:
        value = 'high';
        break;
      default:
        value = '';
        break;
    }
    if (value) {
      this.demoButtonEmphasis = value;
      this.demoButtonLegacy = false;
    } else {
      this.demoButtonLegacy = true;
    }
    this.notifyStateChange(value || 'default', 'main-demo-change');
  }

  _iconsEmphasisHandler(e) {
    const state = e.detail.value;
    let value;
    switch (state) {
      case 0:
        value = 'low';
        break;
      case 1:
        value = 'medium';
        break;
      case 2:
        value = 'high';
        break;
      default:
        value = '';
        break;
    }
    if (value) {
      this.iconButtonEmphasis = value;
      this.iconButtonLegacy = false;
    } else {
      this.iconButtonLegacy = true;
    }
    this.notifyStateChange(value || 'default', 'icon-demo-change');
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _contentControlClick(e) {
    const nodes = this.shadowRoot.querySelectorAll('.content-control.group');
    const prop = 'active';
    Array.from(nodes).forEach(node => {
      if (node === e.currentTarget) {
        return;
      }
      node[prop] = false;
    });
  }

  _demoTemplate() {
    const {
      buttonStates,
      demoButtonEmphasis,
      demoButtonLegacy,
      demoNoink,
      demoToggles,
      demoLeadingIcon,
      demoDisabed,
      darkThemeActive,
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the button element with various configuration options.
        </p>
        <arc-interactive-demo
          .states="${buttonStates}"
          @state-chanegd="${this._demoEmphasisHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-button
            slot="content"
            emphasis="${demoButtonEmphasis}"
            title="Low emphasis button"
            ?legacy="${demoButtonLegacy}"
            ?noink="${demoNoink}"
            ?toggles="${demoToggles}"
            ?disabled="${demoDisabed}"
          >
            ${demoLeadingIcon
              ? html`
                  <iron-icon icon="add-shopping-cart"></iron-icon>
                `
              : undefined}
            Label
          </anypoint-button>

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
            name="demoToggles"
            @change="${this._toggleMainOption}"
            >Toggles</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoNoink"
            @change="${this._toggleMainOption}"
            >No riplles</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="mainOptionsLabel"
            slot="options"
            name="demoDisabed"
            @change="${this._toggleMainOption}"
            >Disabled</anypoint-checkbox
          >
        </arc-interactive-demo>
      </section>
    `;
  }

  _iconButtonsTemplate() {
    const {
      buttonStates,
      iconButtonEmphasis,
      iconButtonLegacy,
      iconNoink,
      iconToggles,
      iconDisabed,
      darkThemeActive,
    } = this;
    return html`
      <section class="documentation-section">
        <h2>Icon buttons</h2>
        <p>
          Icon buttons can be used to present an action as a symbol rather than a label.
        </p>
        <p>
          If possible prefer to use labeled buttons. The user may not understand the symbol even if
          target audience is expected to know it. Less experienced users can be confused when
          launching the application for the first time.
        </p>
        <p>
          Always provide alternative text description via <code>title</code> and
          <code>aria-label</code> attributes.
        </p>

        <arc-interactive-demo
          .states="${buttonStates}"
          @state-chanegd="${this._iconsEmphasisHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-icon-button
            slot="content"
            emphasis="${iconButtonEmphasis}"
            title="Icon button"
            ?legacy="${iconButtonLegacy}"
            ?noink="${iconNoink}"
            ?toggles="${iconToggles}"
            ?disabled="${iconDisabed}"
            title="Star this project"
            aria-label="Activate to see the demo."
          >
            <iron-icon icon="star-border"></iron-icon>
          </anypoint-icon-button>

          <label slot="options" id="iconOptionsLabel">Options</label>
          <anypoint-checkbox
            aria-describedby="iconOptionsLabel"
            slot="options"
            name="iconToggles"
            @change="${this._toggleMainOption}"
            >Toggles</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="iconOptionsLabel"
            slot="options"
            name="iconNoink"
            @change="${this._toggleMainOption}"
            >No riplles</anypoint-checkbox
          >
          <anypoint-checkbox
            aria-describedby="iconOptionsLabel"
            slot="options"
            name="iconDisabed"
            @change="${this._toggleMainOption}"
            >Disabled</anypoint-checkbox
          >
        </arc-interactive-demo>

        <h3>More examples</h3>

        <h4>Low emphasis</h4>
        <div class="centered">
          <anypoint-icon-button
            emphasis="low"
            title="Add alarm"
            aria-label="Activate to set an alarm"
          >
            <iron-icon icon="alarm-add"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="low"
            toggles
            title="Star this project"
            aria-label="Activate to star this project"
          >
            <iron-icon icon="star-border"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="low"
            title="I am an image"
            aria-label="This button uses an image element"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
              alt="octocat"
            />
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="low"
            disabled
            title="Reply"
            aria-label="This button is disabled"
          >
            <iron-icon icon="reply"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="low"
            noink
            title="Cancel action"
            aria-label="Activate to see no ripple effect"
          >
            <iron-icon icon="cancel"></iron-icon>
          </anypoint-icon-button>
        </div>

        <h4>Medium emphasis</h4>
        <div class="centered">
          <anypoint-icon-button
            emphasis="medium"
            title="Add alarm"
            aria-label="Activate to set an alarm"
          >
            <iron-icon icon="alarm-add"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="medium"
            toggles
            title="Star this project"
            aria-label="Activate to star this project"
          >
            <iron-icon icon="star-border"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="medium"
            title="I am an image"
            aria-label="This button uses an image element"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
              alt="octocat"
            />
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="medium"
            disabled
            title="Reply"
            aria-label="This button is disabled"
          >
            <iron-icon icon="reply"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="medium"
            noink
            title="Cancel action"
            aria-label="Activate to see no ripple effect"
          >
            <iron-icon icon="cancel"></iron-icon>
          </anypoint-icon-button>
        </div>

        <h4>High emphasis</h4>
        <div class="centered">
          <anypoint-icon-button
            emphasis="high"
            title="Add alarm"
            aria-label="Activate to set an alarm"
          >
            <iron-icon icon="alarm-add"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="high"
            toggles
            title="Star this project"
            aria-label="Activate to star this project"
          >
            <iron-icon icon="star-border"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="high"
            title="I am an image"
            aria-label="This button uses an image element"
          >
            <img
              src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
              alt="octocat"
            />
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="high"
            disabled
            title="Reply"
            aria-label="This button is disabled"
          >
            <iron-icon icon="reply"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            emphasis="high"
            noink
            title="Cancel action"
            aria-label="Activate to see no ripple effect"
          >
            <iron-icon icon="cancel"></iron-icon>
          </anypoint-icon-button>
        </div>
      </section>
    `;
  }

  _toggleButtonsTemplate() {
    return html`
      <section class="documentation-section">
        <h2>Toggle buttons</h2>
        <p>
          Toggle buttons can be used to group related options (menu bars) or to bundle selection and
          action in one UI element (for example add to favourites).
        </p>

        <div class="centered">
          <anypoint-icon-button
            title="Italic"
            aria-label="Toggle italic text"
            class="content-control"
            toggles
            @click=${this._contentControlClick}
          >
            <iron-icon icon="editor:format-italic"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            title="Bold"
            aria-label="Toggle bold text"
            class="content-control"
            toggles
            @click=${this._contentControlClick}
          >
            <iron-icon icon="editor:format-bold"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            title="Underline"
            aria-label="Toggle underline text"
            class="content-control"
            toggles
            @click=${this._contentControlClick}
          >
            <iron-icon icon="editor:format-underlined"></iron-icon>
          </anypoint-icon-button>

          <anypoint-icon-button
            title="Text color"
            aria-label="Toggle text color"
            class="content-control"
            toggles
            @click=${this._contentControlClick}
          >
            <iron-icon icon="editor:format-color-text"></iron-icon>
          </anypoint-icon-button>

          <span class="space"></span>

          <anypoint-icon-button
            title="Align text left"
            aria-label="Toggle align text left"
            class="content-control group"
            toggles
            @click=${this._contentControlClick}
          >
            <iron-icon icon="editor:format-align-left"></iron-icon>
          </anypoint-icon-button>
          <anypoint-icon-button
            title="Align text center"
            aria-label="Toggle align text center"
            class="content-control group"
            toggles
            @click=${this._contentControlClick}
          >
            <iron-icon icon="editor:format-align-center"></iron-icon>
          </anypoint-icon-button>
          <anypoint-icon-button
            title="Align text right"
            aria-label="Toggle align text rigth"
            class="content-control group"
            toggles
            @click=${this._contentControlClick}
          >
            <iron-icon icon="editor:format-align-right"></iron-icon>
          </anypoint-icon-button>
        </div>
      </section>
    `;
  }

  contentTemplate() {
    return html`
      <h2>Anypoint button</h2>
      ${this._demoTemplate()} ${templateIntroduction} ${templateUsage}
      ${this._iconButtonsTemplate()} ${this._toggleButtonsTemplate()}
    `;
  }
}
