class PlumeNav2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['brand', 'links', 'cta-text', 'cta-link'];
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
    const ctaText = this.getAttribute('cta-text') || '';
    const ctaLink = this.getAttribute('cta-link') || '#';
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        .nav-content {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .nav-links a:hover {
          opacity: 1;
        }
        .cta-button {
          padding: 0.5rem 1.5rem;
          background: white;
          color: #667eea;
          text-decoration: none;
          border-radius: 0.25rem;
          font-weight: 600;
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            gap: 1rem;
          }
          .nav-content {
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
        <div class="nav-content">
          <ul class="nav-links">
            ${parsedLinks
              .map(
                (link) => `
              <li><a href="${this.escapeHtml(link.url)}">${this.escapeHtml(link.label)}</a></li>
            `
              )
              .join('')}
          </ul>
          ${ctaText ? `<a href="${this.escapeHtml(ctaLink)}" class="cta-button">${this.escapeHtml(ctaText)}</a>` : ''}
        </div>
      </nav>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

customElements.define('plume-nav-2', PlumeNav2);
