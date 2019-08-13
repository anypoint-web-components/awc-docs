import { html } from 'lit-html';

export default html`
<section class="documentation-section">
  <h2>Usage</h2>
  <p>Anypoint text field comes with 3 predefied styles:</p>
  <ul>
    <li><b>Filled</b> (normal) - For low emphasis inputs</li>
    <li><b>Outlined</b> - For high emphasis inputs</li>
    <li>
      <b>Legacy</b> - To provide compatibility with legacy Anypoint design
    </li>
  </ul>

  <p>
    See
    <a href="https://material.io/design/components/text-fields.html"
      >text fields</a
    >
    documentation in Material Defign documentation for principles and
    anatomy of text fields.
  </p>

  <h3>Installation</h3>

  <code>
  npm install --save @anypoint-web-components/anypoint-input
  </code>

  <details>
    <summary>In a HTML document</summary>
    <code>
      <pre>
        ${`
<html>
  <head>
    <script type="module">
      import '@anypoint-web-components/anypoint-input/anypoint-input.js';
    </script>
  </head>
  <body>
    <anypoint-input value="My awesome API">
      <label slot="label">API title</label>
    </anypoint-input>
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
import { LitElement, html } from 'lit-element';
import '@anypoint-web-components/anypoint-button/anypoint-input.js';

class SimpleElement extends LitElement {
  render() {
    return html\`
    <anypoint-input value="My awesome API" @input=\${this._inputHandler}>
      <label slot="label">API title</label>
    </anypoint-input>
    \`;
  }

  _inputHandler(e) {
    this.value = e.target.value;
  }
}
window.customElements.define('simple-element', SimpleElement);`}
      </pre>
    </code>
  </details>

  <h3>Choosing the right text field</h3>
  <p>
    Filled and outlined text fields provide the same functionality, so the
    type of text field you use can depend on style alone.
  </p>
  <p>
    Choose the right type that works well with application visual style,
    makes the imputs distinctive from other components like buttons and
    surrounding content, and best acommodates the goals of the UI. Note,
    that outlined buttons have higher emphasis than filled buttons.
    However, do not mix the two types in a single UI region.
  </p>

  <p>
    The legacy text filed style is for Anyponit native applications for
    easy integration. Every component including this element should expose
    the <code>legacy</code> property and propagate it to the text filed.
    An application importing the component can simply set this value to
    adjust styling to the general UI.
  </p>

  <h3>Prefixes and suffixes</h3>

  <p>
    Prefix is a widget rendered before the input field. Suffix is a widget
    rendered after the text field.
  </p>

  <p>
    When it make sense a prefix or suffix can be used to suggest right
    input. Fox example in cash amount field input a prefix could be
    <code>$</code> sign which suggest the value is interpreted in US
    dollars.
  </p>

  <anypoint-input name="ex1">
    <label slot="label">Amount to transfer</label>
    <span slot="prefix" aria-label="Value in US dollars">$</span>
  </anypoint-input>

  <p>
    Similarly suffix can provide additional information about the format
    of input. For the same cach amount input suffix could render
    <code>.00</code> to suggest that the input is an integer.
  </p>

  <anypoint-input name="ex2">
    <label slot="label">Amount to transfer</label>
    <span slot="suffix" aria-label="Use integers">.00</span>
  </anypoint-input>

  <p>
    Suffixes can also be active widget. It can be an icon button that
    toggles visibility of the password. Just remember that adding
    interactive suffixes is not a common design pattern and your suffix
    has to have clear meaning to the user.
  </p>

  <anypoint-input type="password" name="ex3">
    <label slot="label">Password</label>
    <anypoint-button slot="suffix"
      aria-label="Actibate the button to show the password"
      onclick="this.parentNode.type='text'"
      >Show</anypoint-button
    >
  </anypoint-input>

  <anypoint-input type="email" name="ex4">
    <label slot="label">Email</label>
    <div slot="suffix">@mulesoft.com</div>
  </anypoint-input>

  <h3>Assistive text</h3>

  <p>
    Assistive text allows the user to better understand what kind of input is
    required. It can be an info message or invalid message when invalid
    input has been detected.
  </p>

  <h4>Info message</h4>
  <p>
    Info message provides the user with additional description for the
    field. It should be used when the label can be confusing or to ensure
    the user about the reason of collecting the input.
  </p>

  <anypoint-input infomessage="Used to confirm your order." type="email" name="ex5">
    <label slot="label">Email</label>
  </anypoint-input>

  <p>
    Do not try to put too detailed information. The user should be able to
    scan the message in a fraction of a second. Treat it as an additional
    text for the label.
  </p>

  <h4>Invalid message</h4>
  <p>
    Error message should help the user recover from the error state. Use
    clear message with simple instructions of how to fix the problem, for
    example <code>Only letters are allowed.</code>
  </p>

  <anypoint-input
    invalidmessage="Only letters are allowed"
    type="text"
    name="ex6"
    invalid
  >
    <label slot="label">Username</label>
  </anypoint-input>

  <p>
    Note, consider using <code>preventInvalidInput</code> and
    <code>allowedPattern</code>
    in situations like the one above. However, don't be too restrictive
    when using this properties.
  </p>

  <h3>Positioning</h3>
  <p>Each input element has 12 pixels top and bottom margin and 8 pixels left and right margin.</p>
  <p>
    The spacing allows to put multiple controls inside a form without styling it for
    visibility. This can be changed via CSS styling, but please, consider inpact of this action
    to other elements which are positioned in the same way.
  </p>
</section>
`;
