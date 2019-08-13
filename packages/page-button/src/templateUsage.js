import { html } from 'lit-html';

export default html`
<section class="documentation-section">
  <h2>Usage</h2>
  <p>Anypoint button comes with 4 predefied styles:</p>
  <ul>
    <li><b>Text</b> (normal) - For low emphasis actions</li>
    <li><b>Outlined</b> - For medium emphasis actions</li>
    <li><b>Filled</b> - For primary actions</li>
    <li>
      <b>Legacy</b> - To provide compatibility with legacy Anypoint design
    </li>
  </ul>

  <p>
    See
    <a href="https://material.io/design/components/buttons.html"
      >Buttons</a
    >
    documentation in Material Defign documentation for principles and
    anatomy of dropdown menus.
  </p>

  <h3>Installation</h3>

  <code>
  npm install --save @anypoint-web-components/anypoint-button
  </code>

  <details>
    <summary>In a HTML document</summary>
    <code>
      <pre>
        ${`
<script type="module" src="node_modules/@anypoint-web-components/anypoint-button/anypoint-button.js"></script>
<script type="module" src="node_modules/@anypoint-web-components/anypoint-button/anypoint-icon-button.js"></script>

<anypoint-button emphasis="low">Low emphasis</anypoint-button>
<anypoint-button emphasis="medium">Medium emphasis</anypoint-button>
<anypoint-button emphasis="high">High emphasis</anypoint-button>
<anypoint-button toggles>Button that toggles</anypoint-button>
<anypoint-button disabled>You can't click me</anypoint-button>

<anypoint-icon-button emphasis="low" title="Add alarm">
  <iron-icon icon="alarm-add"></iron-icon>
</anypoint-icon-button>`}
      </pre>
    </code>
  </details>

  <details>
    <summary>In a LitElement template</summary>
    <code>
      <pre>
      ${`
import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';

class SimpleElement extends LitElement {
  render() {
    return html\`
    <anypoint-button emphasis="low">Low emphasis</anypoint-button>
    <anypoint-button emphasis="medium">Medium emphasis</anypoint-button>
    <anypoint-button emphasis="high">High emphasis</anypoint-button>
    <anypoint-button toggles>Button that toggles</anypoint-button>
    <anypoint-button disabled>You can't click me</anypoint-button>

    <anypoint-icon-button emphasis="low">
      <button title="Add alarm">
        <iron-icon icon="alarm-add"></iron-icon>
      </button>
    </anypoint-icon-button>
    \`;
  }
}
window.customElements.define('simple-element', SimpleElement);`}
      </pre>
    </code>
  </details>

  <h3>Types cheat list</h3>
  <p>Follow this rules to apply the right button type to situation.</p>

  <h4>Text buttons</h4>
  <p>Use text buttons for less-pronounced actions, including:</p>
  <ul>
    <li>Dialog actions</li>
    <li>Card actions</li>
  </ul>

  <h4>Outlined buttons</h4>
  <p>Use outlined buttons for more important but not primary actions</p>

  <h4>Filled buttons</h4>
  <p>
    Use filled button for the primary action.
    There should not be more than 1 primary action per screen.
    If you need more primary actions than probably you actually need outlined
    button or change in the information architecture.
  </p>

  <h4>Legacy buttons</h4>
  <p>
    Do not use legacy buttons in your UI. These are to ensure compatibility
    with Anypoint applications.
  </p>

  <h3>Icons in buttons</h3>
  <p>
    Usually not required but placing a leading icon can clarify the action and
    focus attention on the button.
  </p>

  <div class="centered vertical">
    <anypoint-button emphasis="low" class="icons">
      <iron-icon icon="card-giftcard"></iron-icon>
      Send gift card
    </anypoint-button>

    <anypoint-button emphasis="medium" class="icons">
      <iron-icon icon="open-in-new"></iron-icon>
      More details
    </anypoint-button>

    <anypoint-button emphasis="high" class="icons">
      <iron-icon icon="add-shopping-cart"></iron-icon>
      Add to cart
    </anypoint-button>
  </div>
</section>
`;
