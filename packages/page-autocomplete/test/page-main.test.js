import { html, fixture, assert } from '@open-wc/testing';
import '../page-autocomplete.js';

describe('PageAutocomplete', () => {
  async function basicFixture() {
    return fixture(
      html`
        <page-autocomplete></page-autocomplete>
      `,
    );
  }

  describe('cosntructor()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets demoStates', () => {
      assert.deepEqual(element.demoStates, ['Filled', 'Outlined', 'Anypoint']);
    });
  });
});
