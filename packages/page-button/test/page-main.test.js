import { html, fixture, assert } from '@open-wc/testing';
import '../page-button.js';

describe('PageButton', () => {
  async function basicFixture() {
    return fixture(
      html`
        <page-button></page-button>
      `,
    );
  }

  describe('cosntructor()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets buttonStates', () => {
      assert.deepEqual(element.buttonStates, ['Text', 'Outlined', 'Contained']);
    });

    it('sets demoButtonEmphasis', () => {
      assert.deepEqual(element.demoButtonEmphasis, 'low');
    });

    it('sets iconButtonEmphasis', () => {
      assert.deepEqual(element.iconButtonEmphasis, 'low');
    });
  });
});
