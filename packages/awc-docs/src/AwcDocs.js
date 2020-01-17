import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { routerMixin, routerLinkMixin } from 'lit-element-router/router-mixin/router-mixin.js';

import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';

import '../../page-main/page-main.js';
import '../../page-button/page-button.js';
import '../../page-input/page-input.js';
import '../../page-dropdown-menu/page-dropdown-menu.js';
import '../../page-listbox/page-listbox.js';
import '../../page-item/page-item.js';
import '../../page-radio-button/page-radio-button.js';
import '../../page-checkbox/page-checkbox.js';
import '../../page-autocomplete/page-autocomplete.js';
import '../../page-chip/page-chip.js';
import '../../page-chip-input/page-chip-input.js';
import '../../page-signin/page-signin.js';

const defaultTitle = 'Anypoint Web Components';
const gaId = 'UA-145656779-1';

/* global gtag */

export class AwcDocs extends routerLinkMixin(routerMixin(LitElement)) {
  static get routes() {
    return [
      {
        name: 'intro',
        pattern: '/(intro)?',
        data: { title: defaultTitle },
      },
      {
        name: 'intro',
        pattern: '',
        data: { title: defaultTitle },
      },
      {
        name: 'button',
        pattern: 'button',
        data: { title: 'Anypoint Button' },
      },
      {
        name: 'input',
        pattern: 'input',
        data: { title: 'Anypoint Text Field' },
      },
      {
        name: 'dropdown-menu',
        pattern: 'dropdown-menu',
        data: { title: 'Anypoint Dropdown Menu' },
      },
      {
        name: 'listbox',
        pattern: 'listbox',
        data: { title: 'Anypoint Listbox' },
      },
      {
        name: 'item',
        pattern: 'item',
        data: { title: 'Anypoint Item' },
      },
      {
        name: 'radio-button',
        pattern: 'radio-button',
        data: { title: 'Anypoint Radio Button' },
      },
      {
        name: 'checkbox',
        pattern: 'checkbox',
        data: { title: 'Anypoint Checkbox' },
      },
      {
        name: 'autocomplete',
        pattern: 'autocomplete',
        data: { title: 'Anypoint Autocomplete' },
      },
      {
        name: 'chip',
        pattern: 'chip',
        data: { title: 'Anypoint Chip' },
      },
      {
        name: 'chip-input',
        pattern: 'chip-input',
        data: { title: 'Anypoint Chip Input' },
      },
      {
        name: 'signin',
        pattern: 'signin',
        data: { title: 'Anypoint Sing In' },
      },
      {
        name: 'not-found',
        pattern: '*',
      },
    ];
  }

  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  onRoute(route, params, query, data) {
    const routeData = data || {};
    const title = routeData.title || defaultTitle;
    let finalRoute;
    /* if (route === 'not-found' && !this.page) {
      finalRoute = 'intro';
    } else  */
    if (route === '/') {
      finalRoute = 'intro';
    } else {
      finalRoute = route;
    }
    this.title = title;
    this.page = finalRoute;
    document.head.querySelector('title').innerText = title;
    if (!this.__gaRouteInitialized) {
      // prohibits sending pageview when initializing
      this.__gaRouteInitialized = true;
      return;
    }
    gtag('config', gaId, { page_path: `/${route}` });
  }

  _renderPage() {
    switch (this.page) {
      case 'intro':
        return html`
          <page-main></page-main>
        `;
      case 'button':
        return html`
          <page-button></page-button>
        `;
      case 'input':
        return html`
          <page-input></page-input>
        `;
      case 'dropdown-menu':
        return html`
          <page-dropdown-menu></page-dropdown-menu>
        `;
      case 'listbox':
        return html`
          <page-listbox></page-listbox>
        `;
      case 'item':
        return html`
          <page-item></page-item>
        `;
      case 'radio-button':
        return html`
          <page-radio-button></page-radio-button>
        `;
      case 'checkbox':
        return html`
          <page-checkbox></page-checkbox>
        `;
      case 'autocomplete':
        return html`
          <page-autocomplete></page-autocomplete>
        `;
      case 'chip':
        return html`
          <page-chip></page-chip>
        `;
      case 'chip-input':
        return html`
          <page-chip-input></page-chip-input>
        `;
      case 'signin':
        return html`
          <page-signin></page-signin>
        `;
      default:
        return html`
          <p>Page not found try going to <a href="/intro">main page</a></p>
        `;
    }
  }

  __clickPageLink(ev) {
    ev.preventDefault();
    let { target } = ev;
    if (target.localName === 'anypoint-item') {
      [target] = target.children;
    }
    if (!target.href) {
      return;
    }
    this.navigate(target.href);
  }

  __addActiveIf(page) {
    return classMap({ active: this.page === page });
  }

  _navTemplate() {
    const states = [
      ['/intro', 'intro', 'Introduction', 'Activate for introduction page'],
      ['/button', 'button', 'Anypoint Button', 'Activate for Anypoint Text Field documentation'],
      [
        '/checkbox',
        'checkbox',
        'Anypoint Checkbox',
        'Activate for Anypoint Checkbox documentation',
      ],
      ['/chip', 'chip', 'Anypoint Chip', 'Activate for Anypoint Chip documentation'],
      [
        '/chip-input',
        'chip-input',
        'Anypoint Chip Text Field',
        'Activate for Anypoint Chip Input documentation',
      ],
      [
        '/dropdown-menu',
        'dropdown-menu',
        'Anypoint Dropdown Menu',
        'Activate for Anypoint Dropdown Menu documentation',
      ],
      ['/input', 'input', 'Anypoint Text Field', 'Activate for Anypoint Text Field documentation'],
      [
        '/autocomplete',
        'autocomplete',
        'Anypoint Text Autocomplete',
        'Activate for Anypoint Autocomplete documentation',
      ],
      ['/item', 'item', 'Anypoint Item', 'Activate for Anypoint Item documentation'],
      ['/listbox', 'listbox', 'Anypoint Listbox', 'Activate for Anypoint Listbox documentation'],
      [
        '/radio-button',
        'radio-button',
        'Anypoint Radio Button',
        'Activate for Anypoint Radio Button documentation',
      ],
      [
        '/signin',
        'signin',
        'Anypoint Sing In',
        'Activate for Anypoint Sing In documentation',
      ],
    ];

    return states.map(
        ([href, route, label, ariaLabel]) => html`
        <anypoint-item role="none" tabindex="-1" @click="${this.__clickPageLink}" route="${route}">
          <a href="${href}" tabindex="-1" role="menuitem" aria-label="${ariaLabel}">
            ${label}
          </a>
        </anypoint-item>
      `,
    );
  }

  render() {
    return html`
      <header>
        <h1>${this.title}</h1>
      </header>

      <div class="content">
        <nav>
          <anypoint-listbox role="menu" .selected="${this.page}" attrforselected="route">
            ${this._navTemplate()}
          </anypoint-listbox>
        </nav>
        <main>
          ${this._renderPage()}
        </main>
      </div>
    `;
  }

  static get styles() {
    return [
      css`
        :host {
          min-height: 100vh;
          --dark-divider-opacity: 0.12;
          display: flex;
          flex-direction: column;
        }

        a {
          text-decoration: none;
          color: inherit;
          outline: none;
        }

        a[role='menuitem'] {
          font-size: 0.85rem;
        }

        header {
          padding: 12px 24px;
          background-color: #2196f3;
          color: #000;
          display: flex;
          align-items: center;
        }

        header h1 {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: -0.012em;
          line-height: 32px;
        }

        .content {
          display: flex;
          align-items: stretch;
          flex-direction: row;
          flex: 1;
        }

        anypoint-listbox[role='menu'] {
          width: 256px;
          margin-right: 12px;
          height: 100%;
        }

        anypoint-listbox[role='menu'] anypoint-item {
          min-height: 32px;
        }

        main {
          max-width: 1440px;
          background-color: #fff;
          padding: 0 40px;
        }
      `,
    ];
  }
}
