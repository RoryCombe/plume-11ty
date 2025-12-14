class PlumeHero1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Default Title';
    const subtitle = this.getAttribute('subtitle') || '';
    const ctaText = this.getAttribute('cta-text') || '';
    const ctaLink = this.getAttribute('cta-link') || '#';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 6rem 2rem;
          text-align: center;
        }
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }
        .subtitle {
          font-size: 1.5rem;
          margin: 0 0 2rem 0;
          opacity: 0.9;
        }
        .cta-button {
          display: inline-block;
          padding: 1rem 2rem;
          background: white;
          color: #667eea;
          text-decoration: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1.1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 768px) {
          .hero {
            padding: 4rem 1.5rem;
          }
          h1 {
            font-size: 2.5rem;
          }
          .subtitle {
            font-size: 1.25rem;
          }
        }
      </style>
      <section class="hero">
        <div class="hero-content">
          <h1>${this.escapeHtml(title)}</h1>
          ${subtitle ? `<p class="subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
          ${ctaText ? `<a href="${this.escapeHtml(ctaLink)}" class="cta-button">${this.escapeHtml(ctaText)}</a>` : ''}
        </div>
      </section>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

customElements.define('plume-hero-1', PlumeHero1);
