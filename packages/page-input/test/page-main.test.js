import { html, fixture, assert } from '@open-wc/testing';
import '../page-input.js';

describe('PageInput', () => {
  async function basicFixture() {
    return fixture(
      html`
        <page-input></page-input>
      `,
    );
  }

  describe('cosntructor()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets demoStates', () => {
      assert.deepEqual(element.textFieldStates, ['Filled', 'Outlined', 'Anypoint']);
    });

    it('sets textFieldLegacy', () => {
      assert.isFalse(element.textFieldOutlined);
    });

    it('sets textFieldOutlined', () => {
      assert.isFalse(element.textFieldOutlined);
    });

    it('sets typeSelector', () => {
      assert.equal(element.typeSelector, 'text');
    });
  });
});
