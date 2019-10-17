import { html, fixture, assert } from '@open-wc/testing';
import '../page-item.js';

describe('PageItem', () => {
  async function basicFixture() {
    return fixture(
      html`
        <page-item></page-item>
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
