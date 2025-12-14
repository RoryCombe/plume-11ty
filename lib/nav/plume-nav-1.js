class PlumeNav1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['brand', 'links'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }

  render() {
    const brand = this.getAttribute('brand') || 'Brand';
    const links = this.getAttribute('links') || '[]';
    let parsedLinks = [];
    try {
      parsedLinks = JSON.parse(links);
    } catch (e) {
      // If parsing fails, use empty array
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        nav {
          background: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          color: #666;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: #1a1a1a;
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            gap: 1rem;
          }
          .nav-links {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      </style>
      <nav>
        <a href="/" class="brand">${this.escapeHtml(brand)}</a>
        <ul class="nav-links">
          ${parsedLinks
            .map(
              (link) => `
            <li><a href="${this.escapeHtml(link.url)}">${this.escapeHtml(link.label)}</a></li>
          `
            )
            .join('')}
        </ul>
      </nav>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

customElements.define('plume-nav-1', PlumeNav1);
