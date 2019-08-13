import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { routerMixin, routerLinkMixin } from 'lit-element-router';

import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';

import '../../page-main/page-main.js';
import '../../page-button/page-button.js';
import '../../page-input/page-input.js';
import '../../page-dropdown-menu/page-dropdown-menu.js';
import '../../page-listbox/page-listbox.js';
import '../../page-item/page-item.js';

const defaultTitle = 'Anypoint Web Components';

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
      ['/button', 'button', 'Anypoint button', 'Activate for Anypoint Text Field documentation'],
      ['/input', 'input', 'Anypoint Text Filed', 'Activate for Anypoint Text Field documentation'],
      ['/item', 'item', 'Anypoint Item', 'Activate for Anypoint Item documentation'],
      ['/listbox', 'listbox', 'Anypoint Listbox', 'Activate for Anypoint Listbox documentation'],
      [
        '/dropdown-menu',
        'dropdown-menu',
        'Anypoint Dropdown Menu',
        'Activate for Anypoint Dropdown Menu documentation',
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
