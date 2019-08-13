import { html, fixture, assert } from '@open-wc/testing';
import '../page-listbox.js';

describe('PageListbox', () => {
  async function basicFixture() {
    return fixture(html`<page-listbox></page-listbox>`);
  }

  describe('cosntructor()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets demoStates', () => {
      assert.deepEqual(element.demoStates, ['Normal', 'Legacy']);
    });

    it('sets fruits', () => {
      assert.typeOf(element.fruits, 'array');
    });
  });
});
