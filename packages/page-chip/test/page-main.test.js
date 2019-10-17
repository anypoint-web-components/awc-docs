import { html, fixture, assert } from '@open-wc/testing';
import '../page-chip.js';

describe('PageChip', () => {
  async function basicFixture() {
    return fixture(
      html`
        <page-chip></page-chip>
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
