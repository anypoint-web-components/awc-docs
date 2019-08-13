import { html } from 'lit-html';
import './minimum-maximum-length.js';
import './number-required.js';
import './uppercase-required.js';

export default html`
<section class="documentation-section">
  <h3>Validation</h3>

  <h3>Built-in validators</h3>
  <p>
    Preffered way of dealing with validation is to use native input's validation
    properties like <code>required</code>, <code>minLength</code>, <code>maxLength</code>, and so on.
    The element preffers native validation over custom logic as it is more performant.
  </p>

  <p>
    Use this attributes with cobination with <code>autovalidate</code> attribute which
    validates the state on user input
  </p>

  <anypoint-input
    title="This input is required"
    type="text"
    autovalidate
    required
    invalidmessage="The value is required"
  >
    <label slot="label">Required input</label>
  </anypoint-input>

  <anypoint-input
    title="Min and max length"
    type="text"
    autovalidate
    minlength="5"
    maxlength="10"
    invalidmessage="Use 5 to 10 characters"
  >
    <label slot="label">Min and max length</label>
  </anypoint-input>

  <anypoint-input
    title="Min and max number"
    type="number"
    autovalidate
    min="10"
    max="20"
    invalidmessage="Only number in range 10 - 20"
  >
    <label slot="label">Min and max number</label>
  </anypoint-input>

  <anypoint-input
    title="Letters only via pattern"
    type="text"
    autovalidate
    pattern="[a-zA-Z]*"
    invalidmessage="Only letters are allowed"
  >
    <label slot="label">Pattern</label>
  </anypoint-input>

  <anypoint-input
    title="Letters only via pattern"
    type="text"
    allowedpattern="[a-zA-Z]"
    preventinvalidinput
    infomessage="Prevents non-letter characters"
  >
    <label slot="label">Prevent invalid input</label>
  </anypoint-input>

  <h3>Custom validators</h3>
  <p>
    Anypoint web components offers <code>ValidatorMixin</code> that allows to define
    a custom element that validates an input field. This allows to reuse validation
    logic accross different parts of the application.
  </p>

  <minimum-maximum-length></minimum-maximum-length>
  <number-required></number-required>
  <uppercase-required></uppercase-required>

  <anypoint-input
    title="Custom validation is enabled"
    type="text"
    autovalidate
    validator="minimum-maximum-length number-required uppercase-required"
    infomessage="Try to create a password"
  >
    <label slot="label">Custom validation</label>
  </anypoint-input>
</section>
`;
