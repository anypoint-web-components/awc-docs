import { html, fixture, assert } from '@open-wc/testing';
import '../page-chip-input.js';

describe('PageChipInput', () => {
  async function basicFixture() {
    return fixture(
      html`
        <page-chip-input></page-chip-input>
      `,
    );
  }

  describe('cosntructor()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets demoStates', () => {
      assert.deepEqual(element.demoStates, ['Material Design', 'Anypoint']);
    });
  });
});
