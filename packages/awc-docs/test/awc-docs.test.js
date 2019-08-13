import { html, fixture, expect, nextFrame } from '@open-wc/testing';

import '../awc-docs.js';

describe('AwcDocs', () => {
  async function basicFixture() {
    return fixture(html`<awc-docs></awc-docs>`);
  }

  describe('Route rendering', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('renders introduction page for home route', async () => {
      element.page = 'intro';
      await nextFrame();
      expect(element.shadowRoot.querySelector('main')).lightDom.to.equal(`
        <page-main></page-main>
      `);
    });

    it('renders anypoint-button page', async () => {
      element.page = 'button';
      await nextFrame();
      expect(element.shadowRoot.querySelector('main')).lightDom.to.equal(`
        <page-button></page-button>
      `);
    });

    it('renders anypoint-input page', async () => {
      element.page = 'input';
      await nextFrame();
      expect(element.shadowRoot.querySelector('main')).lightDom.to.equal(`
        <page-input></page-input>
      `);
    });

    it('renders anypoint-listbox page', async () => {
      element.page = 'listbox';
      await nextFrame();
      expect(element.shadowRoot.querySelector('main')).lightDom.to.equal(`
        <page-listbox></page-listbox>
      `);
    });

    it('renders anypoint-item page', async () => {
      element.page = 'item';
      await nextFrame();
      expect(element.shadowRoot.querySelector('main')).lightDom.to.equal(`
        <page-item></page-item>
      `);
    });

    it('renders anypoint-dropdown-menu page', async () => {
      element.page = 'dropdown-menu';
      await nextFrame();
      expect(element.shadowRoot.querySelector('main')).lightDom.to.equal(`
        <page-dropdown-menu></page-dropdown-menu>
      `);
    });
  });
});
