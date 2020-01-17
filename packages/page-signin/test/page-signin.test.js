import { html, fixture, assert } from '@open-wc/testing';
import '../page-signin.js';

describe('PageSignin', () => {
  async function basicFixture() {
    return fixture(
        html`
        <page-signin></page-signin>
      `,
    );
  }

  describe('cosntructor()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets demoStates', () => {
      assert.deepEqual(element.demoStates, ['Anypoint']);
    });
  });
});
