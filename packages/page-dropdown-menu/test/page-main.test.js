import { html, fixture, assert } from '@open-wc/testing';
import '../page-dropdown-menu.js';

describe('PageDropdownMenu', () => {
  async function basicFixture() {
    return fixture(
      html`
        <page-dropdown-menu></page-dropdown-menu>
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

    it('items', () => {
      assert.typeOf(element.items, 'array');
    });
  });
});
