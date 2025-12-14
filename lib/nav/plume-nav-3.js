class PlumeNav3 extends HTMLElement {
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
          background: #1a1a1a;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          color: #ccc;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: white;
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

customElements.define('plume-nav-3', PlumeNav3);
